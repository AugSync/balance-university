"use client"

import { useTranslations } from "next-intl"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Student } from "@/types/student"

interface StudentDeleteModalProps {
  student: Student | undefined
  open: boolean
  onClose: () => void
  onConfirm: () => void
}

export function StudentDeleteModal({
  student,
  open,
  onClose,
  onConfirm,
}: StudentDeleteModalProps) {
  const t = useTranslations("students")
  
  if (!student) return null

  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("delete.title")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t("delete.description")}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t("delete.cancelButton")}</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>
            {t("delete.confirmButton")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
} 