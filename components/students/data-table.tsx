"use client";

import * as React from "react";
import {
  ColumnDef,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { DataTablePagination } from "./data-table-pagination";
import { DataTableToolbar } from "./data-table-toolbar";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { StudentBulkDeleteModal } from "./student-bulk-delete-modal";
import { DataTableViewOptions } from "./data-table-view-options";
import { useStudents } from "@/hooks/use-students";
import { useTranslations } from "next-intl";
import { Student } from "@/types/student";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useDebounce } from "../../hooks/use-debounce";

interface DataTableProps {
  columns: ColumnDef<Student>[];
  data: Student[];
  onBulkDelete?: (selectedRows: Student[]) => void;
}

export function DataTable({ columns, data, onBulkDelete }: DataTableProps) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({
      select: true,
      first_name: true,
      last_name: true,
      identification_number: true,
      study_branch: true,
      status: true,
      actions: true,
      gender: false,
      birth_date: false,
      city: false,
      email: false,
      mobile_number: false,
      modality: false,
    });
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [isBulkDeleteModalOpen, setIsBulkDeleteModalOpen] =
    React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const [filters, setFilters] = React.useState({
    study_branch: [] as string[],
    modality: [] as string[],
    status: [] as string[],
  });
  const t = useTranslations("students");

  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const debouncedSearch = useDebounce(searchValue, 500);

  const {
    data: paginatedData,
    isLoading,
    isFetching,
  } = useStudents({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    sortBy: sorting[0]?.id,
    sortOrder: sorting[0]?.desc ? "desc" : "asc",
    search: debouncedSearch,
    filters,
  });

  const table = useReactTable({
    data: paginatedData?.data || [],
    columns,
    pageCount: paginatedData?.metadata.totalPages,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      pagination,
    },
    onPaginationChange: setPagination,
    enableRowSelection: true,
    manualPagination: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    manualFiltering: true,
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  const selectedRows = table.getFilteredSelectedRowModel().rows;

  const handleBulkDelete = () => {
    if (onBulkDelete) {
      onBulkDelete(selectedRows.map((row) => row.original));
    }
    setIsBulkDeleteModalOpen(false);
    setRowSelection({});
  };

  const handleFiltersChange = (newFilters: {
    study_branch?: string[];
    modality?: string[];
    status?: string[];
  }) => {
    setFilters({
      study_branch: newFilters.study_branch || [],
      modality: newFilters.modality || [],
      status: newFilters.status || [],
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <div className="flex-1">
          <DataTableToolbar 
            table={table} 
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            filters={filters}
            onFiltersChange={handleFiltersChange}
          />
        </div>
        <div className="flex items-center gap-2">
          {selectedRows.length > 0 && (
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setIsBulkDeleteModalOpen(true)}
              className="h-8"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Eliminar ({selectedRows.length})
            </Button>
          )}
          <DataTableViewOptions table={table} />
        </div>
      </div>
      <div className="rounded-md border">
        <div
          className={cn(
            "relative overflow-y-auto",
            (isLoading || isFetching) &&
              "opacity-50 transition-opacity duration-200"
          )}
        >
          <Table>
            <TableHeader className="sticky top-0 bg-background">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: pagination.pageSize }).map((_, index) => (
                  <TableRow key={index}>
                    {Array.from({ length: table.getAllColumns().length }).map(
                      (_, cellIndex) => (
                        <TableCell key={cellIndex}>
                          <Skeleton className="h-6 w-full" />
                        </TableCell>
                      )
                    )}
                  </TableRow>
                ))
              ) : paginatedData?.data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length} className="text-center">
                    {t("no_results")}
                  </TableCell>
                </TableRow>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <DataTablePagination table={table} />

      <StudentBulkDeleteModal
        isOpen={isBulkDeleteModalOpen}
        onClose={() => setIsBulkDeleteModalOpen(false)}
        onConfirm={handleBulkDelete}
        count={selectedRows.length}
      />
    </div>
  );
}
