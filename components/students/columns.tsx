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
      accessorKey: "first_name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("details.name")} />
      ),
      cell: ({ row }) => {
        const firstName = row.getValue("first_name") as string;
        const lastName = row.getValue("last_name") as string;
        return <div>{`${firstName} ${lastName}`}</div>;
      },
    },
    {
      accessorKey: "last_name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("columns.lastName")} />
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
            {row.getValue("last_name")}
          </div>
        )
      }
    },
    {
      accessorKey: "identification_number",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("columns.identification")} />
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
            {row.getValue("identification_number")}
          </div>
        )
      }
    },
    {
      accessorKey: "gender",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("columns.gender")} />
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
            {t(`gender.${gender}`)}
          </div>
        );
      },
    },
    {
      accessorKey: "birth_date",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("columns.birthDate")} />
      ),
      cell: ({ row }) => {
        const date = row.getValue("birth_date") as string;
        return (
          <div 
            className="cursor-pointer hover:text-primary"
            onClick={(e) => {
              e.stopPropagation()
              onDetails(row.original)
            }}
          >
            {format(new Date(date), "PPP")}
          </div>
        );
      },
    },
    {
      accessorKey: "city",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("columns.city")} />
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
        <DataTableColumnHeader column={column} title={t("columns.email")} />
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
      accessorKey: "mobile_number",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("columns.phone")} />
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
            {row.getValue("mobile_number")}
          </div>
        );
      }
    },
    {
      accessorKey: "study_branch",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("columns.studyBranch")} />
      ),
      cell: ({ row }) => {
        const studyBranch = row.getValue("study_branch") as string;
        return (
          <div 
            className="capitalize cursor-pointer hover:text-primary"
            onClick={(e) => {
              e.stopPropagation()
              onDetails(row.original)
            }}
          >
            {t(`studyBranches.${studyBranch}`)}
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
              {t(`modalities.${modality}`)}
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
        <DataTableColumnHeader column={column} title={t("columns.status")} />
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
              {t(`statuses.${status}`)}
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