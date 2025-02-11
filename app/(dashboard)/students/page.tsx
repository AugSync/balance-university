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
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export default function StudentsPage() {
  const t = useTranslations("students");
  const [selectedStudent, setSelectedStudent] = useState<Student | undefined>(undefined);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleCreateStudent = (data: Student) => {
    console.log('Crear estudiante:', data);
    toast.success(t("notifications.createSuccess"));
  };

  const handleUpdateStudent = (data: Student) => {
    console.log('Actualizar estudiante:', data);
    toast.success(t("notifications.updateSuccess"));
  };

  const handleDeleteStudent = () => {
    if (!selectedStudent) return;
    console.log('Eliminar estudiante:', selectedStudent.id);
    toast.success(t("notifications.deleteSuccess"));
  };

  const handleBulkDeleteStudents = (selectedStudents: Student[]) => {
    console.log('Eliminar estudiantes:', selectedStudents.map(s => s.id));
    toast.success(t("notifications.bulkDeleteSuccess", { count: selectedStudents.length }));
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
    <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
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
        onCreate={handleCreateStudent}
        onUpdate={handleUpdateStudent}
      />

      <StudentDeleteModal
        student={selectedStudent}
        open={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedStudent(undefined);
        }}
        onConfirm={handleDeleteStudent}
      />
    </div>
  );
} 