import { z } from "zod";

export type Gender = "male" | "female";
export type StudyBranch = "mathematics" | "social_sciences" | "engineering" | "fashion" | "audiovisual_arts";
export type Modality = "online" | "in_person";
export type StudentStatus = "active" | "inactive";

export const studentSchema = z.object({
  id: z.string(),
  // Basic Data
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  identificationNumber: z.string().min(5, "Identification number must be at least 5 characters"),
  gender: z.enum(["male", "female"]),
  birthDate: z.date(),
  
  // Location and Contact
  city: z.string().min(2, "City must be at least 2 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  mobileNumber: z.string().min(10, "Mobile number must be at least 10 characters"),
  email: z.string().email("Invalid email address"),
  
  // Academic Info
  studyBranch: z.enum(["mathematics", "social_sciences", "engineering", "fashion", "audiovisual_arts"]),
  modality: z.enum(["online", "in_person"]),
  status: z.enum(["active", "inactive"]),
  
  // Metadata
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Student = z.infer<typeof studentSchema>;

export const defaultStudent: Partial<Student> = {
  gender: "male",
  studyBranch: "mathematics",
  modality: "online",
  status: "active",
};

export const columns = [
  { id: "firstName", name: "First Name" },
  { id: "lastName", name: "Last Name" },
  { id: "identificationNumber", name: "ID Number" },
  { id: "gender", name: "Gender" },
  { id: "birthDate", name: "Birth Date" },
  { id: "city", name: "City" },
  { id: "email", name: "Email" },
  { id: "mobileNumber", name: "Mobile" },
  { id: "studyBranch", name: "Study Branch" },
  { id: "modality", name: "Modality" },
  { id: "status", name: "Status" },
] as const; 