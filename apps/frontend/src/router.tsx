import { createBrowserRouter } from 'react-router-dom'

import CustomerPurchasesPage from '@/routes/CustomerPurchases'
import CustomersPage from '@/routes/Customers'
import ErrorPage from '@/routes/Error'
import PurchaseFrequencyPage from '@/routes/PurchaseFrequency'
import RootPage from '@/routes/Root'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <PurchaseFrequencyPage />,
      },
      {
        path: 'customers',
        element: <CustomersPage />,
        children: [
          {
            path: ':id/purchases',
            element: <CustomerPurchasesPage />,
          },
        ],
      },
    ],
  },
])
