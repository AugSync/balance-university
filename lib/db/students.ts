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

export type GetStudentsParams = {
  page?: number;
  limit?: number;
  sortBy?: 
    | 'id'
    | 'first_name'
    | 'last_name'
    | 'identification_number'
    | 'gender'
    | 'birth_date'
    | 'city'
    | 'address'
    | 'mobile_number'
    | 'email'
    | 'study_branch'
    | 'modality'
    | 'status'
    | 'created_at'
    | 'updated_at';
  sortOrder?: 'asc' | 'desc';
  search?: string;
  filters?: {
    study_branch?: string[];
    modality?: string[];
    status?: string[];
  };
};

export async function getPaginatedStudents({
  page = 1,
  limit = 10,
  sortBy = 'created_at',
  sortOrder = 'desc',
  search = '',
  filters = {},
}: GetStudentsParams = {}) {
  const offset = (page - 1) * limit;

  console.log("Database query params:", { page, limit, sortBy, sortOrder, search, filters, offset });

  let query = supabase
    .from(TABLE_NAME)
    .select('*', { count: 'exact' });

  // Apply search filter
  if (search) {
    query = query.or(`first_name.ilike.%${search}%,last_name.ilike.%${search}%,email.ilike.%${search}%,identification_number.ilike.%${search}%`);
  }

  // Apply column filters
  if (filters.study_branch?.length) {
    query = query.in('study_branch', filters.study_branch);
  }

  if (filters.modality?.length) {
    query = query.in('modality', filters.modality);
  }

  if (filters.status?.length) {
    query = query.in('status', filters.status);
  }

  const { data, error, count } = await query
    .order(sortBy, { ascending: sortOrder === 'asc' })
    .range(offset, offset + limit - 1);

  if (error) {
    console.error("Database error:", error);
    throw error;
  }

  const result = {
    data: data as Student[],
    metadata: {
      total: count || 0,
      page,
      limit,
      totalPages: count ? Math.ceil(count / limit) : 0,
    },
  };

  console.log("Database result metadata:", result.metadata);

  return result;
}
