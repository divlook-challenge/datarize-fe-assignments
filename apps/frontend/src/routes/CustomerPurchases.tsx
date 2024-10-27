import {
  AppBar,
  Avatar,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useContext, useEffect, useMemo } from 'react'
import { useMatch, useNavigate } from 'react-router-dom'

import { getCustomerPurchases } from '@/apis/customers/_id/purchases'
import { ToastContext } from '@/contexts/ToastContext'

function CustomerPurchasesPage() {
  const customerPurchasesRoute = useMatch('/customers/:id/purchases')

  const navigate = useNavigate()

  const toast = useContext(ToastContext)

  const customerId = useMemo(
    () => Number(customerPurchasesRoute?.params.id) || null,
    [customerPurchasesRoute?.params.id],
  )

  const customerPurchasesQuery = useQuery({
    queryKey: ['getCustomerPurchases', customerId],
    queryFn: async () => {
      if (!customerId) {
        return []
      }

      const { data } = await getCustomerPurchases(customerId)

      return data
    },
  })

  useEffect(() => {
    if (customerPurchasesQuery.error?.message) {
      toast.setMessage(customerPurchasesQuery.error.message)

      navigate(
        {
          pathname: '/customers',
        },
        {
          replace: true,
        },
      )
    }
  }, [customerPurchasesQuery.error?.message])

  return (
    <>
      <AppBar position="sticky">
        <Toolbar variant="dense">
          <Typography
            variant="h6"
            color="inherit"
            component="div"
          >
            구매 내역
          </Typography>
        </Toolbar>
      </AppBar>

      <List sx={{ width: '100%', minWidth: 360, bgcolor: 'background.paper' }}>
        {customerPurchasesQuery.isLoading ? (
          <Stack
            alignItems="center"
            justifyContent="center"
            height={400}
          >
            <CircularProgress size={100} />
          </Stack>
        ) : (
          customerPurchasesQuery.data?.map((row, key) => (
            <>
              <ListItem
                alignItems="flex-start"
                key={key}
              >
                <ListItemAvatar>
                  <Avatar
                    alt={row.product}
                    src={row.imgSrc}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={`${row.product} - ${row.quantity}`}
                  secondary={
                    <>
                      <Typography
                        component="span"
                        variant="body2"
                        sx={{ color: 'text.primary', display: 'inline' }}
                      >
                        {row.price}원
                      </Typography>
                      {` — ${row.date}`}
                    </>
                  }
                />
              </ListItem>
              <Divider
                key={key}
                variant="inset"
                component="li"
              />
            </>
          ))
        )}
      </List>
    </>
  )
}

export default CustomerPurchasesPage
