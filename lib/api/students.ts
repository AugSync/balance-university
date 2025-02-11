import { Student } from "@/types/student";

export type StudentsResponse = {
  data: Student[];
  metadata: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

export type FetchStudentsParams = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
};

export async function fetchStudents(params: FetchStudentsParams = {}): Promise<StudentsResponse> {
  const searchParams = new URLSearchParams();
  
  // Add params to query string if they exist
  if (params.page) searchParams.set('page', params.page.toString());
  if (params.limit) searchParams.set('limit', params.limit.toString());
  if (params.sortBy) searchParams.set('sortBy', params.sortBy);
  if (params.sortOrder) searchParams.set('sortOrder', params.sortOrder);
  if (params.search) searchParams.set('search', params.search);

  const response = await fetch(`/api/students?${searchParams.toString()}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch students');
  }

  return response.json();
} 