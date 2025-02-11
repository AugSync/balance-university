"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Student } from "@/types/student";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { format } from "date-fns";

interface ColumnsProps {
  onView: (student: Student) => void;
  onEdit: (student: Student) => void;
  onDelete: (student: Student) => void;
}

export const columns = ({
  onView,
  onEdit,
  onDelete,
}: ColumnsProps): ColumnDef<Student>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "firstName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nombre" />
    ),
    cell: ({ row }) => {
      return (
        <div 
          className="flex items-center cursor-pointer hover:text-primary"
          onClick={(e) => {
            e.stopPropagation()
            onView(row.original)
          }}
        >
          {row.getValue("firstName")}
        </div>
      )
    }
  },
  {
    accessorKey: "lastName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Apellido" />
    ),
    cell: ({ row }) => {
      return (
        <div 
          className="flex items-center cursor-pointer hover:text-primary"
          onClick={(e) => {
            e.stopPropagation()
            onView(row.original)
          }}
        >
          {row.getValue("lastName")}
        </div>
      )
    }
  },
  {
    accessorKey: "identificationNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Identificación" />
    ),
    cell: ({ row }) => {
      return (
        <div 
          className="flex items-center cursor-pointer hover:text-primary"
          onClick={(e) => {
            e.stopPropagation()
            onView(row.original)
          }}
        >
          {row.getValue("identificationNumber")}
        </div>
      )
    }
  },
  {
    accessorKey: "gender",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Género" />
    ),
    cell: ({ row }) => {
      const gender = row.getValue("gender") as string;
      return (
        <div 
          className="capitalize cursor-pointer hover:text-primary"
          onClick={(e) => {
            e.stopPropagation()
            onView(row.original)
          }}
        >
          {gender === 'male' ? 'Masculino' : 'Femenino'}
        </div>
      );
    },
  },
  {
    accessorKey: "birthDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fecha de Nacimiento" />
    ),
    cell: ({ row }) => {
      const date = row.getValue("birthDate") as Date;
      return (
        <div 
          className="cursor-pointer hover:text-primary"
          onClick={(e) => {
            e.stopPropagation()
            onView(row.original)
          }}
        >
          {format(date, "PPP")}
        </div>
      );
    },
  },
  {
    accessorKey: "city",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ciudad" />
    ),
    cell: ({ row }) => {
      return (
        <div 
          className="cursor-pointer hover:text-primary"
          onClick={(e) => {
            e.stopPropagation()
            onView(row.original)
          }}
        >
          {row.getValue("city")}
        </div>
      );
    }
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => {
      return (
        <div 
          className="cursor-pointer hover:text-primary"
          onClick={(e) => {
            e.stopPropagation()
            onView(row.original)
          }}
        >
          {row.getValue("email")}
        </div>
      );
    }
  },
  {
    accessorKey: "mobileNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Teléfono" />
    ),
    cell: ({ row }) => {
      return (
        <div 
          className="cursor-pointer hover:text-primary"
          onClick={(e) => {
            e.stopPropagation()
            onView(row.original)
          }}
        >
          {row.getValue("mobileNumber")}
        </div>
      );
    }
  },
  {
    accessorKey: "studyBranch",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Rama de Estudio" />
    ),
    cell: ({ row }) => {
      const branch = row.getValue("studyBranch") as string;
      const branchMap: Record<string, string> = {
        mathematics: "Matemáticas",
        social_sciences: "Ciencias Sociales",
        engineering: "Ingeniería",
        fashion: "Moda",
        audiovisual_arts: "Artes Audiovisuales",
      };
      return (
        <div 
          className="capitalize cursor-pointer hover:text-primary"
          onClick={(e) => {
            e.stopPropagation()
            onView(row.original)
          }}
        >
          {branchMap[branch] || branch}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "modality",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Modalidad" />
    ),
    cell: ({ row }) => {
      const modality = row.getValue("modality") as string;
      return (
        <div 
          className="cursor-pointer"
          onClick={(e) => {
            e.stopPropagation()
            onView(row.original)
          }}
        >
          <Badge variant="outline" className="capitalize">
            {modality === 'online' ? 'En línea' : 'Presencial'}
          </Badge>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Estado" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <div 
          className="cursor-pointer"
          onClick={(e) => {
            e.stopPropagation()
            onView(row.original)
          }}
        >
          <Badge
            className="capitalize"
            variant={status === "active" ? "default" : "secondary"}
          >
            {status === 'active' ? 'Activo' : 'Inactivo'}
          </Badge>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DataTableRowActions 
        row={row} 
        onView={onView}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    ),
  },
]; 