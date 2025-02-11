import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchStudents, type FetchStudentsParams } from "@/lib/api/students";

export function useStudents(params: FetchStudentsParams = {}) {
  const finalParams = {
    page: 1,
    limit: 10,
    sortBy: 'created_at',
    sortOrder: 'desc' as const,
    search: '',
    filters: {
      study_branch: [],
      modality: [],
      status: [],
    },
    ...params,
  };

  return useQuery({
    queryKey: ['students', finalParams],
    queryFn: () => fetchStudents(finalParams),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5, // Keep data fresh for 5 minutes
  });
} 