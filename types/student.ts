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

export const studentSchema = z.object({
  id: z.string(),
  // Basic Data
  first_name: z.string().min(2, "First name must be at least 2 characters"),
  last_name: z.string().min(2, "Last name must be at least 2 characters"),
  identification_number: z
    .string()
    .min(5, "Identification number must be at least 5 characters"),
  gender: z.enum(["male", "female"]),
  birth_date: z.string(),

  // Location and Contact
  city: z.string().min(2, "City must be at least 2 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  mobile_number: z
    .string()
    .min(10, "Mobile number must be at least 10 characters"),
  email: z.string().email("Invalid email address"),

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
