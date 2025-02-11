"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { useQuery } from "@tanstack/react-query"
import { MonthlyStudentCount } from "@/lib/db/overview"
import { Skeleton } from "@/components/ui/skeleton"

interface OverviewProps {
  career: string;
}

async function fetchOverviewData(career: string): Promise<MonthlyStudentCount[]> {
  const response = await fetch(`/api/overview?career=${career}`);
  if (!response.ok) {
    throw new Error("Failed to fetch overview data");
  }
  return response.json();
}

export function Overview({ career }: OverviewProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["overview", career],
    queryFn: () => fetchOverviewData(career),
    refetchInterval: 30000, // Refetch every 30 seconds
    staleTime: 20000, // Consider data stale after 20 seconds
  });

  if (error) {
    return (
      <div className="h-[350px] flex items-center justify-center">
        <p className="text-destructive">Error loading overview data</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-[350px]">
        <div className="w-full h-[350px]">
          <Skeleton className="w-full h-full rounded-lg ml-2" />
        </div>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={390}>
      <BarChart data={data}>
        <XAxis
          dataKey="month"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Bar
          dataKey="count"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  )
} 