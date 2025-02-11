"use client";

import { X } from "lucide-react";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { studyBranches, modalities, statuses } from "./data/data";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center space-x-2">
      <Input
        placeholder="Filter students..."
        value={(table.getColumn("firstName")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("firstName")?.setFilterValue(event.target.value)
        }
        className="h-8 w-[150px] lg:w-[250px]"
      />
      {table.getColumn("studyBranch") && (
        <DataTableFacetedFilter
          column={table.getColumn("studyBranch")}
          title="Study Branch"
          options={studyBranches}
        />
      )}
      {table.getColumn("modality") && (
        <DataTableFacetedFilter
          column={table.getColumn("modality")}
          title="Modality"
          options={modalities}
        />
      )}
      {table.getColumn("status") && (
        <DataTableFacetedFilter
          column={table.getColumn("status")}
          title="Status"
          options={statuses}
        />
      )}
      {isFiltered && (
        <Button
          variant="ghost"
          onClick={() => table.resetColumnFilters()}
          className="h-8 px-2 lg:px-3"
        >
          Reset
          <X className="ml-2 h-4 w-4" />
        </Button>
      )}
    </div>
  );
} 