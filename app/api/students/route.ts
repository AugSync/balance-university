import { NextRequest, NextResponse } from "next/server";
import { getPaginatedStudents, createStudent, updateStudent, deleteStudent, deleteManyStudents } from "@/lib/db/students";
import { z } from "zod";
import { studentSchema } from "@/types/student";

const querySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  sortBy: z.enum([
    'id',
    'first_name',
    'last_name',
    'identification_number',
    'gender',
    'birth_date',
    'city',
    'address',
    'mobile_number',
    'email',
    'study_branch',
    'modality',
    'status',
    'created_at',
    'updated_at'
  ] as const).default("created_at"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
  search: z.string().default(""),
  filters: z.object({
    study_branch: z.array(z.string()).optional(),
    modality: z.array(z.string()).optional(),
    status: z.array(z.string()).optional(),
  }).optional(),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Helper function to parse array parameters
    const parseArrayParam = (param: string | null): string[] | undefined => {
      if (!param) return undefined;
      try {
        return JSON.parse(param);
      } catch {
        return undefined;
      }
    };

    const filters = {
      study_branch: parseArrayParam(searchParams.get("study_branch")),
      modality: parseArrayParam(searchParams.get("modality")),
      status: parseArrayParam(searchParams.get("status")),
    };
    
    const validatedParams = querySchema.parse({
      page: searchParams.get("page") || undefined,
      limit: searchParams.get("limit") || undefined,
      sortBy: searchParams.get("sortBy") || undefined,
      sortOrder: searchParams.get("sortOrder") || undefined,
      search: searchParams.get("search") || undefined,
      filters: Object.keys(filters).length > 0 ? filters : undefined,
    });

    console.log("Validated params:", validatedParams);

    const result = await getPaginatedStudents(validatedParams);

    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Validation error:", error.errors);
      return NextResponse.json(
        { error: "Invalid request parameters", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Error fetching students:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = studentSchema.omit({ id: true, created_at: true, updated_at: true }).parse(body);
    const result = await createStudent(validatedData);
    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid student data", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Error creating student:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Student ID is required" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const validatedData = studentSchema.omit({ id: true, created_at: true, updated_at: true }).partial().parse(body);

    const result = await updateStudent(id, validatedData);
    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid student data", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Error updating student:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const ids = searchParams.get("ids");

    if (ids) {
      // Bulk delete
      const idsArray = JSON.parse(ids) as string[];
      await deleteManyStudents(idsArray);
      return NextResponse.json({ success: true });
    } else if (id) {
      // Single delete
      await deleteStudent(id);
      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { error: "Student ID or IDs are required" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error deleting student(s):", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 