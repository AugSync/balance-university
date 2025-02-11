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
import { Student, studentSchema } from "@/types/student";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import * as React from "react";

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
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof studentSchema>>({
    resolver: zodResolver(
      studentSchema.omit({ id: true, created_at: true, updated_at: true })
    ),
    defaultValues: {
      first_name: "",
      last_name: "",
      identification_number: "",
      gender: "male",
      birth_date: new Date().toISOString(),
      email: "",
      mobile_number: "",
      city: "",
      address: "",
      study_branch: "mathematics",
      modality: "online",
      status: "active",
    },
  });

  // Reset form when student prop changes
  React.useEffect(() => {
    if (student) {
      form.reset({
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
      });
    }
  }, [student, form]);

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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      toast.success(t("notifications.createSuccess"));
      onClose();
      form.reset();
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      toast.success(t("notifications.updateSuccess"));
      onClose();
      form.reset();
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

  return (
    <Dialog open={open} onOpenChange={onClose}>
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={t("form.placeholders.gender")}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="male">{t("gender.male")}</SelectItem>
                        <SelectItem value="female">
                          {t("gender.female")}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="birth_date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>{t("details.birthDate")}</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(new Date(field.value), "PPP")
                            ) : (
                              <span>{t("form.placeholders.birthDate")}</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={
                            field.value ? new Date(field.value) : undefined
                          }
                          onSelect={(date) =>
                            field.onChange(date?.toISOString())
                          }
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={t("form.placeholders.studyBranch")}
                          />
                        </SelectTrigger>
                      </FormControl>
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={t("form.placeholders.modality")}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="online">
                          {t("modalities.online")}
                        </SelectItem>
                        <SelectItem value="in_person">
                          {t("modalities.inPerson")}
                        </SelectItem>
                      </SelectContent>
                    </Select>
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={t("form.placeholders.status")}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="active">
                          {t("statuses.active")}
                        </SelectItem>
                        <SelectItem value="inactive">
                          {t("statuses.inactive")}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit">
                {student ? t("form.saveChanges") : t("form.create")}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
