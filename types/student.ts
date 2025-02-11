import { z } from "zod";

export type Gender = "male" | "female";
export type StudyBranch =
  | "mathematics"
  | "social_sciences"
  | "engineering"
  | "fashion"
  | "audiovisual_arts";
export type Modality = "online" | "in_person";
export type StudentStatus = "active" | "inactive";

export const createStudentSchema = (t: any) => z.object({
  id: z.string(),
  // Basic Data
  first_name: z.string().min(2, t("validation.firstName")),
  last_name: z.string().min(2, t("validation.lastName")),
  identification_number: z
    .string()
    .min(5, t("validation.identification")),
  gender: z.enum(["male", "female"]),
  birth_date: z.string(),

  // Location and Contact
  city: z.string().min(2, t("validation.city")),
  address: z.string().min(5, t("validation.address")),
  mobile_number: z
    .string()
    .min(10, t("validation.mobileNumber")),
  email: z.string().email(t("validation.email")),

  // Academic Info
  study_branch: z.enum([
    "mathematics",
    "social_sciences",
    "engineering",
    "fashion",
    "audiovisual_arts",
  ]),
  modality: z.enum(["online", "in_person"]),
  status: z.enum(["active", "inactive"]),

  // Metadata
  created_at: z.string(),
  updated_at: z.string(),
});

// Default schema without translations for API validation
export const studentSchema = z.object({
  id: z.string(),
  first_name: z.string().min(2),
  last_name: z.string().min(2),
  identification_number: z.string().min(5),
  gender: z.enum(["male", "female"]),
  birth_date: z.string(),
  city: z.string().min(2),
  address: z.string().min(5),
  mobile_number: z.string().min(10),
  email: z.string().email(),
  study_branch: z.enum([
    "mathematics",
    "social_sciences",
    "engineering",
    "fashion",
    "audiovisual_arts",
  ]),
  modality: z.enum(["online", "in_person"]),
  status: z.enum(["active", "inactive"]),
  created_at: z.string(),
  updated_at: z.string(),
});

export type Student = z.infer<typeof studentSchema>;

export const defaultStudent: Partial<Student> = {
  gender: "male",
  study_branch: "mathematics",
  modality: "online",
  status: "active",
};

export const columns = [
  { id: "first_name", name: "First Name" },
  { id: "last_name", name: "Last Name" },
  { id: "identification_number", name: "ID Number" },
  { id: "gender", name: "Gender" },
  { id: "birth_date", name: "Birth Date" },
  { id: "city", name: "City" },
  { id: "email", name: "Email" },
  { id: "mobile_number", name: "Mobile" },
  { id: "study_branch", name: "Study Branch" },
  { id: "modality", name: "Modality" },
  { id: "status", name: "Status" },
] as const;
