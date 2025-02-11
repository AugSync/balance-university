import { NextRequest, NextResponse } from "next/server";
import { getMonthlyStudentCounts } from "@/lib/db/overview";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const career = searchParams.get("career");

  if (!career) {
    return NextResponse.json(
      { error: "Career parameter is required" },
      { status: 400 }
    );
  }

  try {
    const data = await getMonthlyStudentCounts(career);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in overview route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 