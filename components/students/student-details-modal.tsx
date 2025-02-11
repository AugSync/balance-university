"use client"

import { useTranslations } from "next-intl"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { format, parseISO } from "date-fns"
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

  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), 'dd/MM/yyyy')
    } catch (error) {
      console.error('Error formatting date:', error)
      return dateString // Fallback to original string if parsing fails
    }
  }

  const getStudyBranchLabel = (branch: string) => {
    switch (branch) {
      case 'mathematics':
        return t('studyBranches.mathematics')
      case 'social_sciences':
        return t('studyBranches.social_sciences')
      case 'engineering':
        return t('studyBranches.engineering')
      case 'fashion':
        return t('studyBranches.fashion')
      case 'audiovisual_arts':
        return t('studyBranches.audiovisual_arts')
      default:
        return branch
    }
  }

  const getModalityLabel = (modality: string) => {
    switch (modality) {
      case 'online':
        return t('modalities.online')
      case 'in_person':
        return t('modalities.inPerson')
      default:
        return modality
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return t('statuses.active')
      case 'inactive':
        return t('statuses.inactive')
      default:
        return status
    }
  }

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
                  <p>{student.first_name} {student.last_name}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">{t("details.identification")}:</span>
                  <p>{student.identification_number}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">{t("details.gender")}:</span>
                  <p>{student.gender === 'male' ? t("gender.male") : t("gender.female")}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">{t("details.birthDate")}:</span>
                  <p>{formatDate(student.birth_date)}</p>
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
                  <p>{student.mobile_number}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">{t("details.email")}:</span>
                  <p className="break-all">{student.email}</p>
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="font-medium mb-2">{t("details.academicInfo")}</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-muted-foreground">{t("studyBranch")}:</span>
                  <p>{getStudyBranchLabel(student.study_branch)}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">{t("modality")}:</span>
                  <p>{getModalityLabel(student.modality)}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">{t("status")}:</span>
                  <p>{getStatusLabel(student.status)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 