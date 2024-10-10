import * as z from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(6, "Password must be at least 6 characters"),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(6, { message: "Minimum 6 characters required" }),
});

export const ResetSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email(),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(6, { message: "Minimum 6 characters required" }),
});

export const SettingsSchema = z.object({
  name: z.optional(
    z.string().min(3, { message: "Minimum 3 characters are required." })
  ),
  isTwoFactorEnabled: z.optional(z.boolean()),
  role: z.enum(["ADMIN", "USER"]),
  email: z.optional(z.string()),
  password: z.optional(
    z.string().min(6, { message: "Minimum 6 characters are required." })
  ),
  newPassword: z.optional(
    z.string().min(6, { message: "Minimum 6 characters are required." })
  ),
});

export type _TLoginFormInput = z.infer<typeof LoginSchema> & {
  [key: string]: string | undefined;
};

// Zod schema for teams form validation
export const TeamsSchema = z.object({
  teamName: z.string().min(1, "Team Name is required"),
  creationDate: z.string().min(1, "Creation Date is required"),
  department: z.string().optional(),
  members: z.string().optional(),
});

// Corresponding TypeScript type inferred from the schema
export type TeamsFormInput = z.infer<typeof TeamsSchema>;

// Define the schema for project form input
export const ProjectsFormInputSchema = z.object({
  projectName: z.string().min(1, "Project name is required"), // Require a non-empty string
  startDate: z.string().nonempty("Start date is required"), // Require a non-empty date string
  endDate: z.string().nonempty("End date is required"), // Require a non-empty date string
  teamAssigned: z.string().optional(), // Optional field for team members
  status: z.enum(["not_started", "in_progress", "completed"], {
    errorMap: () => ({ message: "Status is required" }), // Custom error message
  }), // Enforce allowed status values
});

// Type inference from the schema
export type ProjectsFormInput = z.infer<typeof ProjectsFormInputSchema>;
