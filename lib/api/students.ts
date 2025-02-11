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
  sortOrder?: "asc" | "desc";
  search?: string;
  filters?: {
    study_branch?: string[];
    modality?: string[];
    status?: string[];
  };
};

export async function fetchStudents(params: FetchStudentsParams = {}): Promise<StudentsResponse> {
  const searchParams = new URLSearchParams();
  
  // Add params to query string if they exist
  if (params.page) searchParams.set('page', params.page.toString());
  if (params.limit) searchParams.set('limit', params.limit.toString());
  if (params.sortBy) searchParams.set('sortBy', params.sortBy);
  if (params.sortOrder) searchParams.set('sortOrder', params.sortOrder);
  if (params.search) searchParams.set('search', params.search);

  // Handle array filters
  if (params.filters?.study_branch?.length) {
    searchParams.set("study_branch", JSON.stringify(params.filters.study_branch));
  }
  if (params.filters?.modality?.length) {
    searchParams.set("modality", JSON.stringify(params.filters.modality));
  }
  if (params.filters?.status?.length) {
    searchParams.set("status", JSON.stringify(params.filters.status));
  }

  const response = await fetch(`/api/students?${searchParams.toString()}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch students');
  }

  return response.json();
} 