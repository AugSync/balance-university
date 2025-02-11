import { useQueryClient } from "@tanstack/react-query";

export function useInvalidateDashboard() {
  const queryClient = useQueryClient();

  const invalidateAll = async (career?: string) => {
    await Promise.all([
      // Invalidate stats
      queryClient.invalidateQueries({ queryKey: ["student-stats"] }),
      // Invalidate recent students
      queryClient.invalidateQueries({ queryKey: ["recent-students"] }),
      // Invalidate overview for all careers if no specific career is provided
      queryClient.invalidateQueries({ 
        queryKey: ["overview"],
        exact: false
      }),
      // Invalidate students list
      queryClient.invalidateQueries({ queryKey: ["students"] })
    ]);
  };

  return { invalidateAll };
} 