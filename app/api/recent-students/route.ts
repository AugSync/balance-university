import { NextResponse } from "next/server";
import { getRecentStudents } from "@/lib/db/recent-students";

export async function GET() {
  try {
    const response = await getRecentStudents();
    return NextResponse.json(response);
  } catch (error) {
    console.error("Error in recent students endpoint:", error);
    return NextResponse.json(
      { error: "Failed to fetch recent students" },
      { status: 500 }
    );
  }
} 