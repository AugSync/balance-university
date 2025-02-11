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
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

export interface StudentDeleteModalProps {
  student: Student | undefined
  open: boolean
  onClose: () => void
  onConfirm: () => void
  isLoading?: boolean
}

export function StudentDeleteModal({
  student,
  open,
  onClose,
  onConfirm,
  isLoading = false,
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
          <AlertDialogCancel disabled={isLoading}>{t("delete.cancelButton")}</AlertDialogCancel>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {t("delete.confirmButton")}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
} 