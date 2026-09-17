import { z } from "zod";

export const experimentStatusSchema = z.enum(["draft", "running", "completed"]);

export const experimentSchema = z.object({
  id: z.uuid(),
  title: z.string().trim().min(3).max(100),
  description: z.string().trim().max(1000),
  status: experimentStatusSchema,
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime()
});

export const createExperimentSchema = z.object({
  title: z.string().trim().min(3).max(100),
  description: z.string().trim().max(1000).default("")
}).strict();

export const updateExperimentSchema = z.object({
  title: z.string().trim().min(3).max(100).optional(),
  description: z.string().trim().max(1000).optional(),
  status: experimentStatusSchema.optional()
}).strict().refine((value) => Object.keys(value).length > 0, {
  message: "Informe ao menos um campo"
});

export const experimentIdSchema = z.uuid();

export type Experiment = z.infer<typeof experimentSchema>;
export type CreateExperiment = z.infer<typeof createExperimentSchema>;
export type UpdateExperiment = z.infer<typeof updateExperimentSchema>;
