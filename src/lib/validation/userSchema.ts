import { z } from "zod";

export const userRegistrationSchema = z.object({
  username: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  year: z.number({ message: "Year is required" }).min(1, "Year is required").max(6, "Invalid year"),
  mobileno: z.string().min(10, "Mobile number must be at least 10 digits").max(15, "Mobile number is too long"),
  idno: z.string().min(3, "ID Number is required"),
  github: z
    .string()
    .url("Github must be a valid URL")
    .optional()
    .or(z.literal("")),
  department: z.string().min(1, "Department is required"),
});

export type UserRegistrationInput = z.infer<typeof userRegistrationSchema>;
