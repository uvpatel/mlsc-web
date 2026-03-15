import { z } from "zod";

export const userSchema = z.object({
  username: z
    .string()
    .min(2, "Username must be at least 2 characters")
    .max(30, "Username cannot exceed 30 characters")
    .trim(),

  email: z
    .string()
    .email("Invalid email address")
    .toLowerCase()
    .trim(),

  year: z
    .number({ message: "Year must be a number" })
    .int("Year must be an integer")
    .min(1, "Year must be at least 1")
    .max(6, "Year cannot exceed 6"),

  mobileno: z
    .string()
    .regex(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits")
    .trim(),

  idno: z
    .string()
    .min(3, "ID number is required")
    .max(20, "ID number too long")
    .trim()
    .toUpperCase(),

  github: z
    .string()
    .url("Github must be a valid URL")
    .regex(
      /^https?:\/\/(www\.)?github\.com\/[a-zA-Z0-9_-]+\/?$/,
      "Must be a valid GitHub profile URL"
    )
    .optional()
    .or(z.literal("")),

  department: z
    .string()
    .min(2, "Department is required")
    .max(100, "Department name too long")
    .trim(),
});

export type UserRegistrationInput = z.infer<typeof userSchema>;

// ✅ ADDED: Separate schema for updates (all fields optional)
export const userUpdateSchema = userSchema.partial();

export type UserUpdateInput = z.infer<typeof userUpdateSchema>;