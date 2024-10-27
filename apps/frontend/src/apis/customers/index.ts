import {
  CustomerSchema,
  GetCustomersPayloadSchema,
} from '@/apis/customers/schema'
import { http } from '@/utils/http'

export function getCustomers(payload?: GetCustomersPayloadSchema) {
  const params = GetCustomersPayloadSchema.parse(payload)

  return http<CustomerSchema[]>({
    url: '/customers',
    params,
  })
}
