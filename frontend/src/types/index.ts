import { z } from "zod";

//AUTH USERS
export const authSchema = z.object({
  name: z.string(),
  email: z.string(),
  current_password: z.string(),
  password: z.string(),
  password_confirmation: z.string(),
  token: z.string(),
});
export type Auth = z.infer<typeof authSchema>;
export type UserLoginForm = Pick<Auth, "email" | "password">;
export type UserRegistrationForm = Pick<
  Auth,
  "email" | "password" | "password_confirmation" | "name"
>;
export type ConfirmToken = Pick<Auth, "token">;
export type RequestConfirmationCodeForm = Pick<Auth, "email">;
export type ForgotPasswordForm = Pick<Auth, "email">;
export type NewPasswordForm = Pick<Auth, "password" | "password_confirmation">;
export type UpdateCurrentPassword = Pick<
  Auth,
  "password" | "password_confirmation" | "current_password"
>;

/// USERS
export const userSchema = authSchema
  .pick({
    name: true,
    email: true,
  })
  .extend({
    _id: z.string(),
  });
export type User = z.infer<typeof userSchema>;
export type UserProfileForm = Pick<User, "name" | "email">;

// Notes
export const noteSchema = z.object({
  _id: z.string(),
  content: z.string(),
  createdBy: userSchema,
  task: z.string(),
  createdAt: z.string(),
});
export type Note = z.infer<typeof noteSchema>;
export type NoteFormData = Pick<Note, "content">;

/// TASK
const taskStatusSchema = z.enum([
  "pending",
  "onHold",
  "inProgress",
  "inReview",
  "completed",
]);
export type TaskStatus = z.infer<typeof taskStatusSchema>;
export const taskSchema = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
  project: z.string(),
  status: taskStatusSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
  updatedBy: z.nullable(userSchema),
  notes: z.array(noteSchema),
});
export type Task = z.infer<typeof taskSchema>;
export type TaskFormData = Pick<Task, "name" | "description">;

/** Projects */
export const projectSchema = z.object({
  _id: z.string(),
  projectName: z.string(),
  clientName: z.string(),
  description: z.string(),
  tasks: z.array(taskSchema.omit({ notes: true, updatedBy: true })),
  manager: z.string(userSchema.pick({ _id: true })),
});

export type Project = z.infer<typeof projectSchema>;

export type ProjectFormData = Pick<
  Project,
  "projectName" | "clientName" | "description"
>;
export const dashboardProjectSchema = z.array(
  projectSchema.pick({
    _id: true,
    projectName: true,
    clientName: true,
    description: true,
    manager: true,
  })
);

/// TEAM
export const teamMemberSchema = userSchema.pick({
  name: true,
  email: true,
  _id: true,
});
export const teamMembersSchema = z.array(teamMemberSchema);
export type TeamMember = z.infer<typeof teamMemberSchema>;

export type TeamMemberForm = Pick<TeamMember, "email">;
