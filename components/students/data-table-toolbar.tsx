"use client";

import { X } from "lucide-react";
import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { studyBranches, modalities, statuses } from "./data/data";
import { useTranslations } from "next-intl";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  searchValue: string;
  onSearchChange: (value: string) => void;
  filters: {
    study_branch?: string[];
    modality?: string[];
    status?: string[];
  };
  onFiltersChange: (filters: {
    study_branch?: string[];
    modality?: string[];
    status?: string[];
  }) => void;
}

export function DataTableToolbar<TData>({
  searchValue,
  onSearchChange,
  filters,
  onFiltersChange,
}: DataTableToolbarProps<TData>) {
  const t = useTranslations("students");
  const hasFilters = Object.values(filters).some(
    (filter) => filter && filter.length > 0
  );

  const handleFilterChange = (
    key: keyof typeof filters,
    value: string[] | undefined
  ) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  return (
    <div className="flex flex-col space-y-4 mt-4 md:flex-row md:space-y-0 md:space-x-2">
      <div className="flex w-full flex-wrap gap-2 md:w-auto">
        <Input
          placeholder={t("filterStudents")}
          value={searchValue}
          onChange={(event) => onSearchChange(event.target.value)}
          className="h-8 w-full min-w-[150px] md:w-[250px]"
        />
        {(hasFilters || searchValue) && (
          <Button
            variant="ghost"
            onClick={() => {
              onFiltersChange({
                study_branch: [],
                modality: [],
                status: [],
              });
              onSearchChange("");
            }}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        <DataTableFacetedFilter
          value={filters.study_branch}
          onChange={(value) => handleFilterChange("study_branch", value)}
          title={t("studyBranch")}
          options={studyBranches}
        />
        <DataTableFacetedFilter
          value={filters.modality}
          onChange={(value) => handleFilterChange("modality", value)}
          title={t("modality")}
          options={modalities}
        />
        <DataTableFacetedFilter
          value={filters.status}
          onChange={(value) => handleFilterChange("status", value)}
          title={t("status")}
          options={statuses}
        />
      </div>
    </div>
  );
} 