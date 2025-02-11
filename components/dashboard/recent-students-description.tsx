'use client'

import { useRecentStudents } from "@/hooks/use-recent-students"
import { useTranslations } from "next-intl"

export function RecentStudentsDescription() {
  const { data } = useRecentStudents()
  const t = useTranslations("Dashboard")

  return (
    <span>
      {t("recentStudents.description", {
        total: data?.total ?? 0
      })}
    </span>
  )
} 