import { z } from 'zod'

export const GetCustomersPayloadSchema = z.object({
  sortBy: z.enum(['asc', 'desc']).optional(),
  name: z.string().optional(),
})
export type GetCustomersPayloadSchema = z.infer<
  typeof GetCustomersPayloadSchema
>

export const CustomerSchema = z.object({
  id: z.number(),
  name: z.string(),
  count: z.number(),
  totalAmount: z.number(),
})
export type CustomerSchema = z.infer<typeof CustomerSchema>
