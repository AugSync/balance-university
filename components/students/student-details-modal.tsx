"use client"

import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { format } from "date-fns"
import { Student } from "@/types/student"
import { Separator } from "../ui/separator"

interface StudentDetailsModalProps {
  student: Student | undefined
  open: boolean
  onClose: () => void
}

export function StudentDetailsModal({
  student,
  open,
  onClose,
}: StudentDetailsModalProps) {
  const t = useTranslations("students")
  
  if (!student) return null

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{t("details.title")}</DialogTitle>
          <DialogDescription>
            {t("details.description")}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">{t("details.basicInfo")}</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-muted-foreground">{t("details.name")}:</span>
                  <p>{student.firstName} {student.lastName}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">{t("details.identification")}:</span>
                  <p>{student.identificationNumber}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">{t("details.gender")}:</span>
                  <p>{student.gender === 'male' ? t("gender.male") : t("gender.female")}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">{t("details.birthDate")}:</span>
                  <p>{format(student.birthDate, 'dd/MM/yyyy')}</p>
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="font-medium mb-2">{t("details.contactLocation")}</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-muted-foreground">{t("details.city")}:</span>
                  <p>{student.city}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">{t("details.address")}:</span>
                  <p>{student.address}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">{t("details.phone")}:</span>
                  <p>{student.mobileNumber}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">{t("details.email")}:</span>
                  <p>{student.email}</p>
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="font-medium mb-2">{t("details.academicInfo")}</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-muted-foreground">{t("studyBranch")}:</span>
                  <p>{student.studyBranch}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">{t("modality")}:</span>
                  <p>{student.modality}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">{t("status")}:</span>
                  <p>{student.status}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 