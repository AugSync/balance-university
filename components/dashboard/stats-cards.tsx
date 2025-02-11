"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserIcon, UsersIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import type { StudentStats } from "@/lib/db/stats";
import { Skeleton } from "@/components/ui/skeleton";

async function fetchStats(): Promise<StudentStats> {
  const response = await fetch("/api/stats");
  if (!response.ok) {
    throw new Error("Failed to fetch stats");
  }
  return response.json();
}

export function StatsCards() {
  const t = useTranslations("Dashboard");
  const { data: stats, isLoading, error } = useQuery({
    queryKey: ["student-stats"],
    queryFn: fetchStats,
    refetchInterval: 30000, // Refetch every 30 seconds
    staleTime: 20000, // Consider data stale after 20 seconds
  });

  if (error) {
    return (
      <div className="grid gap-4 grid-cols-2">
        <Card className="bg-destructive/10">
          <CardHeader className="h-20">
            <CardTitle className="text-xs text-destructive">
              Error loading statistics
            </CardTitle>
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid gap-4 grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-[60px] mb-1" />
            <Skeleton className="h-3 w-[140px]" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-[60px] mb-1" />
            <Skeleton className="h-3 w-[140px]" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid gap-4 grid-cols-2">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xs md:text-sm font-medium">
            {t("stats.totalStudents")}
          </CardTitle>
          <UserIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-xl md:text-2xl font-bold">
            {(stats?.totalStudents ?? 0).toLocaleString()}
          </div>
          <p className="text-[10px] md:text-xs text-muted-foreground">
            {(stats?.studentGrowth ?? 0) > 0 ? "+" : ""}{stats?.studentGrowth ?? 0}% desde el mes pasado
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xs md:text-sm font-medium">
            {t("stats.activeStudents")}
          </CardTitle>
          <UsersIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-xl md:text-2xl font-bold">
            {(stats?.activeStudents ?? 0).toLocaleString()}
          </div>
          <p className="text-[10px] md:text-xs text-muted-foreground">
            {((stats?.activeStudents ?? 0) / (stats?.totalStudents ?? 1) * 100).toFixed(1)}% del total
          </p>
        </CardContent>
      </Card>
    </div>
  );
} 