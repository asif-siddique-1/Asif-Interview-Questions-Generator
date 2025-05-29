import { z } from 'zod';

export const generateQuestionsSchema = z.object({
  jobDescription: z
    .string()
    .min(30, 'Job description must be at least 30 characters long'),
  experienceLevel: z.enum([
    'junior',
    'mid-level',
    'senior',
    'lead',
    'principal',
  ]),
  numQuestions: z
    .number()
    .min(1, 'Number of questions must be at least 1')
    .max(15, 'Number of questions must be at most 15'),
  questionTypes: z
    .array(z.enum(['theoretical', 'coding', 'system desigm']))
    .optional()
    .default(['theoretical', 'coding']),
});
