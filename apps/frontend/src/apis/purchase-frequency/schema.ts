import dayjs from 'dayjs'
import { z } from 'zod'

export const GetPurchaseFrequencyPayloadSchema = z.object({
  from: z
    .string()
    .datetime()
    .optional()
    .transform((value) => {
      const at = dayjs(value || null)

      if (at.isValid()) {
        return at.toISOString()
      }

      return undefined
    }),
  to: z
    .string()
    .datetime()
    .optional()
    .transform((value) => {
      const at = dayjs(value || null)

      if (at.isValid()) {
        return at.toISOString()
      }

      return undefined
    }),
})
export type GetPurchaseFrequencyPayloadInputSchema = z.input<
  typeof GetPurchaseFrequencyPayloadSchema
>
export type GetPurchaseFrequencyPayloadSchema = z.output<
  typeof GetPurchaseFrequencyPayloadSchema
>

export const PurchaseFrequency = z.object({
  range: z.string(),
  count: z.number().min(0),
})
export type PurchaseFrequency = z.infer<typeof PurchaseFrequency>
