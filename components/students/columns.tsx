"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Student } from "@/types/student";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { format } from "date-fns";

export const columns: ColumnDef<Student>[] = [
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
      <DataTableColumnHeader column={column} title="First Name" />
    ),
  },
  {
    accessorKey: "lastName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Name" />
    ),
  },
  {
    accessorKey: "identificationNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID Number" />
    ),
  },
  {
    accessorKey: "gender",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Gender" />
    ),
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("gender")}</div>
    ),
  },
  {
    accessorKey: "birthDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Birth Date" />
    ),
    cell: ({ row }) => {
      const date = row.getValue("birthDate") as Date;
      return <div>{format(date, "PPP")}</div>;
    },
  },
  {
    accessorKey: "city",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="City" />
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: "mobileNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mobile" />
    ),
  },
  {
    accessorKey: "studyBranch",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Study Branch" />
    ),
    cell: ({ row }) => {
      const branch = row.getValue("studyBranch") as string;
      return <div className="capitalize">{branch.replace("_", " ")}</div>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "modality",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Modality" />
    ),
    cell: ({ row }) => {
      const modality = row.getValue("modality") as string;
      return (
        <Badge variant="outline" className="capitalize">
          {modality.replace("_", " ")}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge
          className="capitalize"
          variant={status === "active" ? "default" : "secondary"}
        >
          {status}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]; 