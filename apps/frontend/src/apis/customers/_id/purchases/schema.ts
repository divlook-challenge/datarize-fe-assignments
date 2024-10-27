import { z } from 'zod'

export const CustomerPurchase = z.object({
  date: z.string().date(),
  quantity: z.number(),
  product: z.string(),
  price: z.number(),
  imgSrc: z.string().url(),
})
export type CustomerPurchase = z.infer<typeof CustomerPurchase>
