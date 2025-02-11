import { NextResponse } from "next/server";
import { getStudentStats } from "@/lib/db/stats";

export async function GET() {
  try {
    const stats = await getStudentStats();
    return NextResponse.json(stats);
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { error: "Error fetching statistics" },
      { status: 500 }
    );
  }
} 