"use client"

import { Columns } from "@/components/students/columns";
import { DataTable } from "@/components/students/data-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { students } from "@/mocks/students";
import { useState } from "react";
import { Student } from "@/types/student";
import { StudentDetailsModal } from "@/components/students/student-details-modal";
import { StudentFormModal } from "@/components/students/student-form-modal";
import { StudentDeleteModal } from "@/components/students/student-delete-modal";
import { useTranslations } from "next-intl";
import { useStudentActions } from "@/hooks/use-students";

export default function StudentsPage() {
  const t = useTranslations("students");
  const { deleteStudent, deleteManyStudents, isLoading } = useStudentActions();
  const [selectedStudent, setSelectedStudent] = useState<Student | undefined>(undefined);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDeleteStudent = async () => {
    if (!selectedStudent) return;
    const success = await deleteStudent(selectedStudent.id);
    if (success) {
      setIsDeleteModalOpen(false);
      setSelectedStudent(undefined);
    }
  };

  const handleBulkDeleteStudents = async (selectedStudents: Student[]) => {
    const ids = selectedStudents.map(s => s.id);
    await deleteManyStudents(ids);
  };

  const openDetailsModal = (student: Student) => {
    setSelectedStudent(student);
    setIsDetailsModalOpen(true);
  };

  const openEditModal = (student: Student) => {
    setSelectedStudent(student);
    setIsFormModalOpen(true);
  };

  const openDeleteModal = (student: Student) => {
    setSelectedStudent(student);
    setIsDeleteModalOpen(true);
  };

  const columns = Columns({
    onDetails: openDetailsModal,
    onEdit: openEditModal,
    onDelete: openDeleteModal,
  });

  return (
    <div className="flex-1 flex flex-col min-h-[calc(100vh-2rem)] p-4 md:p-8 pt-6 w-full">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{t("title")}</h2>
          <p className="text-muted-foreground">
            {t("subtitle")}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button onClick={() => setIsFormModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> {t("addStudent")}
          </Button>
        </div>
      </div>
      <DataTable
        columns={columns}
        data={students}
        onBulkDelete={handleBulkDeleteStudents}
      />

      <StudentDetailsModal
        student={selectedStudent}
        open={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
      />

      <StudentFormModal
        student={selectedStudent}
        open={isFormModalOpen}
        onClose={() => {
          setIsFormModalOpen(false);
          setSelectedStudent(undefined);
        }}
      />

      <StudentDeleteModal
        student={selectedStudent}
        open={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedStudent(undefined);
        }}
        onConfirm={handleDeleteStudent}
        isLoading={isLoading}
      />
    </div>
  );
} 