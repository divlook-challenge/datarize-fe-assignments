import { http } from '@/utils/http'
import { CustomerPurchase } from '@/apis/customers/_id/purchases/schema'

export function getCustomerPurchases(id: number) {
  return http<CustomerPurchase[]>({
    url: `/customers/${id}/purchases`,
  })
}
