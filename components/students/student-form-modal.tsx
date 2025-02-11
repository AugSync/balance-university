"use client";

import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Student, studentSchema, createStudentSchema } from "@/types/student";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import * as React from "react";
import { Spinner } from "@/components/ui/spinner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { es } from "date-fns/locale";
import { useInvalidateDashboard } from "@/hooks/use-invalidate-dashboard";

interface StudentFormModalProps {
  student?: Student;
  open: boolean;
  onClose: () => void;
}

export function StudentFormModal({
  student,
  open,
  onClose,
}: StudentFormModalProps) {
  const t = useTranslations("students");
  const { invalidateAll } = useInvalidateDashboard();

  const defaultValues = React.useMemo(() => ({
    first_name: "",
    last_name: "",
    identification_number: "",
    gender: "male" as const,
    birth_date: new Date("1999-01-01").toISOString(),
    email: "",
    mobile_number: "",
    city: "",
    address: "",
    study_branch: "mathematics" as const,
    modality: "online" as const,
    status: "active" as const,
  }), []);

  const form = useForm<z.infer<typeof studentSchema>>({
    resolver: zodResolver(
      createStudentSchema(t).omit({ id: true, created_at: true, updated_at: true })
    ),
    defaultValues,
  });

  // Reset form when student prop changes or modal closes
  React.useEffect(() => {
    if (open) {
      if (student) {
        const studentData = {
          first_name: student.first_name,
          last_name: student.last_name,
          identification_number: student.identification_number,
          gender: student.gender,
          birth_date: student.birth_date,
          email: student.email,
          mobile_number: student.mobile_number,
          city: student.city,
          address: student.address,
          study_branch: student.study_branch,
          modality: student.modality,
          status: student.status,
        };
        form.reset(studentData);
      } else {
        form.reset(defaultValues);
      }
    }
  }, [student, open, form, defaultValues]);

  const createMutation = useMutation({
    mutationFn: async (data: z.infer<typeof studentSchema>) => {
      const response = await fetch("/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to create student");
      }
      return response.json();
    },
    onSuccess: async (data) => {
      await invalidateAll(data.study_branch);
      toast.success(t("notifications.createSuccess"));
      form.reset(defaultValues);
      onClose();
    },
    onError: (error) => {
      toast.error(error.message || t("notifications.createError"));
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: z.infer<typeof studentSchema>) => {
      const response = await fetch(`/api/students?id=${student?.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to update student");
      }
      return response.json();
    },
    onSuccess: async (data) => {
      await invalidateAll(data.study_branch);
      toast.success(t("notifications.updateSuccess"));
      form.reset(defaultValues);
      onClose();
    },
    onError: (error) => {
      toast.error(error.message || t("notifications.updateError"));
    },
  });

  const handleSubmit = (data: z.infer<typeof studentSchema>) => {
    if (student) {
      updateMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
  };

  // Handle modal close
  const handleClose = () => {
    form.reset(defaultValues);
    createMutation.reset();
    updateMutation.reset();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {student ? t("form.editTitle") : t("form.createTitle")}
          </DialogTitle>
          <DialogDescription>
            {student ? t("form.editDescription") : t("form.createDescription")}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("details.name")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("form.placeholders.firstName")}
                        maxLength={50}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("details.lastName")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("form.placeholders.lastName")}
                        maxLength={50}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="identification_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("details.identification")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("form.placeholders.identification")}
                        maxLength={20}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("details.gender")}</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue
                            placeholder={t("form.placeholders.gender")}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">
                            {t("gender.male")}
                          </SelectItem>
                          <SelectItem value="female">
                            {t("gender.female")}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="birth_date"
                render={({ field }) => (
                  <FormItem className="flex flex-col mt-2">
                    <FormLabel>{t("details.birthDate")}</FormLabel>
                    <FormControl>
                      <div className="relative w-full">
                        <DatePicker
                          selected={field.value ? new Date(field.value) : null}
                          onChange={(date: Date) => field.onChange(date?.toISOString())}
                          dateFormat="PPP"
                          locale={es}
                          showMonthDropdown
                          showYearDropdown
                          dropdownMode="select"
                          yearDropdownItemNumber={100}
                          scrollableYearDropdown
                          minDate={new Date("1900-01-01")}
                          maxDate={new Date()}
                          placeholderText={t("form.placeholders.birthDate")}
                          className={cn(
                            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                            !field.value && "text-muted-foreground"
                          )}
                        />
                        <CalendarIcon className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 opacity-50" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("details.email")}</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder={t("form.placeholders.email")}
                        maxLength={100}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mobile_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("details.phone")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("form.placeholders.phone")}
                        maxLength={15}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("details.city")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("form.placeholders.city")}
                        maxLength={50}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("details.address")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("form.placeholders.address")}
                        maxLength={200}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="study_branch"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("studyBranch")}</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue
                            placeholder={t("form.placeholders.studyBranch")}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mathematics">
                            {t("studyBranches.mathematics")}
                          </SelectItem>
                          <SelectItem value="social_sciences">
                            {t("studyBranches.social_sciences")}
                          </SelectItem>
                          <SelectItem value="engineering">
                            {t("studyBranches.engineering")}
                          </SelectItem>
                          <SelectItem value="fashion">
                            {t("studyBranches.fashion")}
                          </SelectItem>
                          <SelectItem value="audiovisual_arts">
                            {t("studyBranches.audiovisual_arts")}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="modality"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("modality")}</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue
                            placeholder={t("form.placeholders.modality")}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="online">
                            {t("modalities.online")}
                          </SelectItem>
                          <SelectItem value="in_person">
                            {t("modalities.inPerson")}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("status")}</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue
                            placeholder={t("form.placeholders.status")}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">
                            {t("statuses.active")}
                          </SelectItem>
                          <SelectItem value="inactive">
                            {t("statuses.inactive")}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button
                type="submit"
                disabled={createMutation.isPending || updateMutation.isPending}
                className="gap-2"
              >
                {(createMutation.isPending || updateMutation.isPending) && (
                  <Spinner size={16} className="text-white" />
                )}
                {createMutation.isPending || updateMutation.isPending
                  ? student
                    ? t("form.saving")
                    : t("form.creating")
                  : student
                  ? t("form.saveChanges")
                  : t("form.create")}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
