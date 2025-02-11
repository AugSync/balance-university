import { useInvalidateDashboard } from "@/hooks/use-invalidate-dashboard";
import { toast } from "sonner";

export function useStudentActions() {
  const { invalidateAll } = useInvalidateDashboard();

  const deleteStudent = async (id: string) => {
    try {
      const response = await fetch(`/api/students?id=${id}`, {
        method: "DELETE",
      });
      
      if (!response.ok) {
        throw new Error("Failed to delete student");
      }
      
      await invalidateAll(); // Invalidate all since we might not know the career
      toast.success("Student deleted successfully");
      return true;
    } catch (error) {
      console.error("Error deleting student:", error);
      toast.error("Error deleting student");
      return false;
    }
  };

  const deleteManyStudents = async (ids: string[]) => {
    try {
      const response = await fetch("/api/students/bulk-delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete students");
      }

      await invalidateAll(); // Invalidate all since we might not know the careers
      toast.success("Students deleted successfully");
      return true;
    } catch (error) {
      console.error("Error deleting students:", error);
      toast.error("Error deleting students");
      return false;
    }
  };

  return {
    deleteStudent,
    deleteManyStudents,
  };
} 