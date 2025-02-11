import { useQuery } from "@tanstack/react-query";
import { Student } from "@/types/student";
import { RecentStudentsResponse } from "@/lib/db/recent-students";

async function fetchRecentStudents() {
  const response = await fetch("/api/recent-students");
  if (!response.ok) {
    throw new Error("Failed to fetch recent students");
  }
  return response.json() as Promise<RecentStudentsResponse>;
}

export function useRecentStudents() {
  return useQuery({
    queryKey: ["recent-students"],
    queryFn: fetchRecentStudents,
  });
} 