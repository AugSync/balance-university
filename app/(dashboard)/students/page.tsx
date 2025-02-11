import { Metadata } from "next";
import { columns } from "@/components/students/columns";
import { DataTable } from "@/components/students/data-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { students } from "@/mocks/students";

export const metadata: Metadata = {
  title: "Students",
  description: "Manage your students",
};

export default function StudentsPage() {
  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Students</h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of all your students
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Student
          </Button>
        </div>
      </div>
      <DataTable data={students} columns={columns} />
    </div>
  );
} 