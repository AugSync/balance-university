"use client"

import { columns } from "@/components/students/columns";
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

export default function StudentsPage() {
  const [selectedStudent, setSelectedStudent] = useState<Student | undefined>(undefined);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleCreateStudent = (data: Student) => {
    console.log('Crear estudiante:', data);
    toast.success('Estudiante creado exitosamente');
  };

  const handleUpdateStudent = (data: Student) => {
    console.log('Actualizar estudiante:', data);
    toast.success('Estudiante actualizado exitosamente');
  };

  const handleDeleteStudent = () => {
    if (!selectedStudent) return;
    console.log('Eliminar estudiante:', selectedStudent.id);
    toast.success('Estudiante eliminado exitosamente');
  };

  const handleBulkDeleteStudents = (selectedStudents: Student[]) => {
    console.log('Eliminar estudiantes:', selectedStudents.map(s => s.id));
    toast.success(`${selectedStudents.length} estudiante(s) eliminado(s) exitosamente`);
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

  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Estudiantes</h2>
            <p className="text-muted-foreground">
              Aquí está la lista de todos tus estudiantes
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button onClick={() => {
              setSelectedStudent(undefined);
              setIsFormModalOpen(true);
            }}>
              <Plus className="mr-2 h-4 w-4" />
              Agregar Estudiante
            </Button>
          </div>
        </div>
        <DataTable 
          data={students} 
          columns={columns({
            onView: openDetailsModal,
            onEdit: openEditModal,
            onDelete: openDeleteModal,
          })} 
          onBulkDelete={handleBulkDeleteStudents}
        />
      </div>

      {/* Modales */}
      <StudentDetailsModal
        student={selectedStudent}
        isOpen={isDetailsModalOpen}
        onClose={() => {
          setIsDetailsModalOpen(false);
          setSelectedStudent(undefined);
        }}
      />

      <StudentFormModal
        student={selectedStudent}
        isOpen={isFormModalOpen}
        onClose={() => {
          setIsFormModalOpen(false);
          setSelectedStudent(undefined);
        }}
        onSubmit={(data) => {
          if (selectedStudent) {
            handleUpdateStudent(data as Student);
          } else {
            handleCreateStudent(data as Student);
          }
          setIsFormModalOpen(false);
          setSelectedStudent(undefined);
        }}
      />

      <StudentDeleteModal
        student={selectedStudent}
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedStudent(undefined);
        }}
        onConfirm={() => {
          handleDeleteStudent();
          setIsDeleteModalOpen(false);
          setSelectedStudent(undefined);
        }}
      />
    </>
  );
} 