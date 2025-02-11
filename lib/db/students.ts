import { Student } from "@/types/student";
import { supabase } from "../supabase";

export const TABLE_NAME = "students";

export async function getStudents() {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as Student[];
}

export async function getStudentById(id: string) {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data as Student;
}

export async function createStudent(
  student: Omit<Student, "id" | "createdAt" | "updatedAt">
) {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .insert([
      {
        ...student,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data as Student;
}

export async function updateStudent(id: string, student: Partial<Student>) {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .update({
      ...student,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data as Student;
}

export async function deleteStudent(id: string) {
  const { error } = await supabase.from(TABLE_NAME).delete().eq("id", id);

  if (error) throw error;
  return true;
}
