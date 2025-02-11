'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useRecentStudents } from "@/hooks/use-recent-students"
import { Skeleton } from "@/components/ui/skeleton"
import { useTranslations } from "next-intl"

export function RecentStudents() {
  const { data, isLoading, error } = useRecentStudents()
  const t = useTranslations()

  if (isLoading) {
    return (
      <div className="space-y-4 sm:space-y-8">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center w-full justify-between">
            <div className="flex items-center flex-1 min-w-0">
              <Skeleton className="h-8 w-8 sm:h-9 sm:w-9 rounded-full flex-shrink-0" />
              <div className="ml-2 sm:ml-4 space-y-1 flex-1 min-w-0">
                <Skeleton className="h-3 sm:h-4 w-full max-w-[200px] sm:max-w-[250px]" />
                <Skeleton className="h-3 sm:h-4 w-full max-w-[150px] sm:max-w-[200px]" />
              </div>
            </div>
            <Skeleton className="h-5 sm:h-6 w-14 sm:w-16 ml-2 sm:ml-4 flex-shrink-0" />
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-xs sm:text-sm text-destructive">
        Error loading recent students
      </div>
    )
  }

  if (!data?.students?.length) {
    return (
      <div className="text-xs sm:text-sm text-muted-foreground">
        No recent students found
      </div>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-8">
      {data.students.map((student) => (
        <div key={student.id} className="flex items-center min-w-0">
          <Avatar className="h-8 w-8 sm:h-9 sm:w-9 flex-shrink-0">
            <AvatarImage src={`/avatars/${student.id}.png`} alt="Avatar" />
            <AvatarFallback>
              {`${student.first_name[0]}${student.last_name[0]}`}
            </AvatarFallback>
          </Avatar>
          <div className="ml-2 sm:ml-4 space-y-0.5 sm:space-y-1 flex-1 min-w-0">
            <p className="text-xs sm:text-sm font-medium leading-none truncate">
              {`${student.first_name} ${student.last_name}`}
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground truncate">{student.email}</p>
          </div>
          <div className="ml-2 sm:ml-4 flex-shrink-0">
            <Badge 
              variant={student.status === "active" ? "default" : "secondary"}
              className="capitalize text-xs whitespace-nowrap"
            >
              {student.status}
            </Badge>
          </div>
        </div>
      ))}
    </div>
  )
} 