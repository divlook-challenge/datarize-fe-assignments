import {
  GetPurchaseFrequencyPayloadInputSchema,
  GetPurchaseFrequencyPayloadSchema,
  PurchaseFrequency,
} from '@/apis/purchase-frequency/schema'
import { http } from '@/utils/http'

export function getPurchaseFrequency(
  payload: GetPurchaseFrequencyPayloadInputSchema = {},
) {
  const params = GetPurchaseFrequencyPayloadSchema.parse(payload)

  return http<PurchaseFrequency[]>({
    url: '/purchase-frequency',
    params,
  })
}
