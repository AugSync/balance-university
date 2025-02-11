import { Student } from "@/types/student";
import { supabase } from "../supabase";
import { TABLE_NAME } from "./students";

export interface RecentStudentsResponse {
  students: Pick<Student, "id" | "first_name" | "last_name" | "email" | "status">[];
  total: number;
}

export async function getRecentStudents(limit: number = 7): Promise<RecentStudentsResponse> {
  const [{ data, error }, { count, error: countError }] = await Promise.all([
    supabase
      .from(TABLE_NAME)
      .select("id, first_name, last_name, email, status")
      .order("created_at", { ascending: false })
      .limit(limit),
    supabase
      .from(TABLE_NAME)
      .select("*", { count: 'exact', head: true })
  ]);

  if (error || countError) {
    console.error("Error fetching recent students:", error || countError);
    throw error || countError;
  }

  return {
    students: data as Pick<Student, "id" | "first_name" | "last_name" | "email" | "status">[],
    total: count || 0
  };
} 