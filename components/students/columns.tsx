"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Student } from "@/types/student";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { format } from "date-fns";
import { useTranslations } from "next-intl";

interface ColumnsProps {
  onDetails: (student: Student) => void;
  onEdit: (student: Student) => void;
  onDelete: (student: Student) => void;
}

export const Columns = ({
  onDetails,
  onEdit,
  onDelete,
}: ColumnsProps) => {
  const t = useTranslations("students");

  const columns: ColumnDef<Student>[] = [
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
        <DataTableColumnHeader column={column} title={t("details.name")} />
      ),
      cell: ({ row }) => {
        const firstName = row.getValue("firstName") as string;
        const lastName = row.getValue("lastName") as string;
        return <div>{`${firstName} ${lastName}`}</div>;
      },
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
              onDetails(row.original)
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
              onDetails(row.original)
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
              onDetails(row.original)
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
              onDetails(row.original)
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
              onDetails(row.original)
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
              onDetails(row.original)
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
              onDetails(row.original)
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
        <DataTableColumnHeader column={column} title={t("studyBranch")} />
      ),
      cell: ({ row }) => {
        const studyBranch = row.getValue("studyBranch") as string;
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
              onDetails(row.original)
            }}
          >
            {branchMap[studyBranch] || studyBranch}
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
        <DataTableColumnHeader column={column} title={t("modality")} />
      ),
      cell: ({ row }) => {
        const modality = row.getValue("modality") as string;
        return (
          <div 
            className="cursor-pointer"
            onClick={(e) => {
              e.stopPropagation()
              onDetails(row.original)
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
        <DataTableColumnHeader column={column} title={t("status")} />
      ),
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return (
          <div 
            className="cursor-pointer"
            onClick={(e) => {
              e.stopPropagation()
              onDetails(row.original)
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
          onView={onDetails}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ),
    },
  ];

  return columns;
}; 