import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FetchStudentsParams, StudentsResponse } from "@/lib/api/students";
import { Student } from "@/types/student";
import { useState } from "react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export function useStudents(params: FetchStudentsParams = {}) {
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

  return useQuery<StudentsResponse>({
    queryKey: ["students", params],
    queryFn: async () => {
      const response = await fetch(`/api/students?${searchParams.toString()}`);
      if (!response.ok) {
        throw new Error("Failed to fetch students");
      }
      return response.json();
    },
  });
}

export function useStudentActions() {
  const t = useTranslations("students");
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const deleteStudent = async (id: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/students?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete student");
      }

      await queryClient.invalidateQueries({ queryKey: ["students"] });
      toast.success(t("notifications.deleteSuccess"));
      return true;
    } catch (error) {
      console.error("Error deleting student:", error);
      toast.error(t("notifications.deleteError"));
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteManyStudents = async (ids: string[]) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/students?ids=${JSON.stringify(ids)}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete students");
      }

      await queryClient.invalidateQueries({ queryKey: ["students"] });
      toast.success(t("notifications.bulkDeleteSuccess", { count: ids.length }));
      return true;
    } catch (error) {
      console.error("Error deleting students:", error);
      toast.error(t("notifications.bulkDeleteError"));
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    deleteStudent,
    deleteManyStudents,
  };
} 