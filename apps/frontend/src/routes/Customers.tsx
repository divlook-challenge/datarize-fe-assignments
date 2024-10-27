import { Box, Drawer, TextField } from '@mui/material'
import { DataGrid, GridColDef, GridRow, GridSortModel } from '@mui/x-data-grid'
import { useQuery } from '@tanstack/react-query'
import { useContext, useEffect, useMemo, useState } from 'react'
import { Link, Outlet, useMatch, useNavigate } from 'react-router-dom'

import { getCustomers } from '@/apis/customers'
import { GetCustomersPayloadSchema } from '@/apis/customers/schema'
import BasicLayout from '@/components/layouts/Basic'
import { ToastContext } from '@/contexts/ToastContext'
import { useDebounce } from '@/hooks/useDebounce'
import { cn } from '@/utils/tailwind'

/** 데이터 그리드의 컬럼 정의 */
const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    sortable: false,
    filterable: false,
    hideable: false,
    disableColumnMenu: true,
  },
  {
    field: 'name',
    headerName: '이름',
    hideable: false,
    disableColumnMenu: true,
  },
  {
    field: 'count',
    headerName: '총 구매 횟수',
    sortable: false,
    filterable: false,
    hideable: false,
    disableColumnMenu: true,
  },
  {
    field: 'totalAmount',
    headerName: '총 구매 금액',
    sortable: false,
    filterable: false,
    hideable: false,
    disableColumnMenu: true,
  },
]

function CustomersPage() {
  const navigate = useNavigate()

  const customerPurchasesRoute = useMatch('/customers/:id/purchases')

  /** 검색 이름 상태 */
  const [searchName, setSearchName] = useState('')
  /** 정렬 기준 상태 */
  const [sortBy, setSortBy] =
    useState<GetCustomersPayloadSchema['sortBy']>(undefined)

  const toast = useContext(ToastContext)

  const customerId = useMemo(
    () => Number(customerPurchasesRoute?.params.id) || null,
    [customerPurchasesRoute?.params.id],
  )

  /** 디바운스된 검색 이름 */
  const debouncedSearchName = useDebounce(searchName, 300)

  /** 고객 데이터를 가져오는 쿼리 */
  const customersQuery = useQuery({
    queryFn: async () => {
      const { data } = await getCustomers({
        name: debouncedSearchName || undefined,
        sortBy,
      })

      return data
    },
    queryKey: ['getCustomers', debouncedSearchName, sortBy],
  })

  /** 정렬 모델 생성 */
  const sortModel = useMemo(() => {
    const model: GridSortModel = []

    if (sortBy) {
      model.push({
        field: 'name',
        sort: sortBy,
      })
    }

    return model
  }, [sortBy])

  /** 행 데이터 생성 */
  const rows = useMemo(() => {
    return (
      customersQuery.data?.map((row) => {
        return row
      }) || []
    )
  }, [customersQuery.data])

  useEffect(() => {
    if (customersQuery.error?.message) {
      toast.setMessage(customersQuery.error.message)
    }
  }, [customersQuery.error?.message])

  return (
    <>
      <BasicLayout title="고객 목록">
        <Box
          className={cn('mb-2')}
          component="form"
          noValidate
          autoComplete="off"
        >
          <TextField
            label="이름을 입력해주세요."
            variant="standard"
            defaultValue={searchName}
            onChange={({ target }) => {
              setSearchName(target.value)
            }}
          />
        </Box>

        <DataGrid
          slots={{
            row: (props) => (
              <Link
                to={{
                  pathname: `/customers/${props.row.id}/purchases`,
                }}
              >
                <GridRow
                  {...props}
                  className={cn(props.className, {
                    'bg-blue-200': props.row.id === customerId,
                  })}
                />
              </Link>
            ),
          }}
          columns={columns}
          rows={rows}
          sortModel={sortModel}
          loading={customersQuery.isLoading}
          pageSizeOptions={[]}
          disableRowSelectionOnClick
          disableColumnFilter
          hideFooterPagination
          onSortModelChange={(next) => {
            if (!next.length) {
              setSortBy(undefined)
              return
            }

            next.find(({ field, sort }) => {
              if (field === 'name') {
                setSortBy(sort || undefined)
                return true
              }
              return false
            })
          }}
        />
      </BasicLayout>

      <Drawer
        open={!!customerId}
        anchor="right"
        onClose={() => navigate(-1)}
      >
        <Outlet />
      </Drawer>
    </>
  )
}

export default CustomersPage
