import { NextRequest, NextResponse } from "next/server";
import { getPaginatedStudents } from "@/lib/db/students";
import { z } from "zod";
import { Student } from "@/types/student";

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
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    console.log("Received query params:", {
      page: searchParams.get("page"),
      limit: searchParams.get("limit"),
      sortBy: searchParams.get("sortBy"),
      sortOrder: searchParams.get("sortOrder"),
      search: searchParams.get("search"),
    });
    
    const validatedParams = querySchema.parse({
      page: searchParams.get("page") || undefined,
      limit: searchParams.get("limit") || undefined,
      sortBy: searchParams.get("sortBy") || undefined,
      sortOrder: searchParams.get("sortOrder") || undefined,
      search: searchParams.get("search") || undefined,
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