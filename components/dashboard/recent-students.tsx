import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Student {
  id: string
  name: string
  email: string
  amount: number
}

const recentStudents: Student[] = [
  {
    id: "1",
    name: "Olivia Martín",
    email: "olivia.martin@email.com",
    amount: 1999.00,
  },
  {
    id: "2",
    name: "Jackson Lee",
    email: "jackson.lee@email.com",
    amount: 39.00,
  },
  {
    id: "3",
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    amount: 299.00,
  },
  {
    id: "4",
    name: "William Kim",
    email: "will@email.com",
    amount: 99.00,
  },
  {
    id: "5",
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
    amount: 39.00,
  },
]

export function RecentStudents() {
  return (
    <div className="space-y-8">
      {recentStudents.map((student) => (
        <div key={student.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={`/avatars/${student.id}.png`} alt="Avatar" />
            <AvatarFallback>
              {student.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{student.name}</p>
            <p className="text-sm text-muted-foreground">{student.email}</p>
          </div>
          <div className="ml-auto font-medium">
            +${student.amount.toFixed(2)}
          </div>
        </div>
      ))}
    </div>
  )
} 