import * as z from "zod";

export const userSchema = z.object({

  username: z
    .string()
    .min(2, "Username must be at least 2 characters")
    .max(30, "Username cannot exceed 30 characters"),

  email: z
    .string()
    .email("Invalid email address"),

  year: z
    .number()
    .min(1, "Year must be at least 1")
    .max(5, "Year cannot exceed 5"),

  mobileno: z
    .string()
    .regex(/^[0-9]{10}$/, "Mobile number must be 10 digits"),

  idno: z
    .string()
    .min(3, "ID number is required"),

  github: z
    .string()
    .url("Github must be a valid URL")
    .optional(),

  department: z
    .string()
    .min(2, "Department is required")

});


export type UserSchema = z.infer<typeof userSchema>;