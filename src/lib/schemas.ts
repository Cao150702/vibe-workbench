import { z } from 'zod'

// Input schemas for validation
export const IdeaInputSchema = z.object({
  idea: z.string().min(10, '想法至少需要10个字').max(2000, '想法不能超过2000字'),
  step: z.enum(['prd', 'tech-stack', 'tasks']),
})

export const TechStackInputSchema = z.object({
  idea: z.string(), // This is actually the PRD text
})

export const TaskBreakdownInputSchema = z.object({
  idea: z.object({
    prd: z.string(),
    techStack: z.string(),
  }),
})

// Output schemas for AI responses
export const CommitMessageSchema = z.object({
  type: z.enum(['feat', 'fix', 'refactor', 'chore', 'test', 'docs', 'style']),
  scope: z.string().optional(),
  subject: z.string().max(72),
  body: z.string().optional(),
})

// Validate user input
export function validateInput(data: unknown) {
  return IdeaInputSchema.safeParse(data)
}
