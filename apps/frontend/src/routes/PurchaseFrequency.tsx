import { CircularProgress, Stack } from '@mui/material'
import { BarChart, BarChartProps } from '@mui/x-charts/BarChart'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { useContext, useEffect, useMemo, useState } from 'react'

import { getPurchaseFrequency } from '@/apis/purchase-frequency'
import BasicLayout from '@/components/layouts/Basic'
import CustomDatePicker from '@/components/ui/DatePicker'
import { ToastContext } from '@/contexts/ToastContext'
import { cn } from '@/utils/tailwind'

function PurchaseFrequencyPage() {
  /** 시작 날짜와 종료 날짜 상태를 설정 */
  const [startAt, setStartAt] = useState(dayjs().startOf('month').month(6))
  const [endAt, setEndAt] = useState(startAt.endOf('month'))

  const toast = useContext(ToastContext)

  /** 구매 빈도 데이터를 가져오는 쿼리 */
  const purchaseFrequencyQuery = useQuery({
    queryFn: async () => {
      const { data } = await getPurchaseFrequency({
        from: startAt.startOf('date').toISOString(),
        to: endAt.endOf('date').toISOString(),
      })

      return data
    },
    queryKey: ['getPurchaseFrequency', startAt, endAt],
  })

  /** 바 차트에 사용할 데이터를 메모이제이션 */
  const dataForBarChart = useMemo(() => {
    const xAxis: BarChartProps['xAxis'] = [
      {
        data: [],
        scaleType: 'band',
      },
    ]

    const series: BarChartProps['series'] = [
      {
        data: [],
        type: 'bar',
      },
    ]

    purchaseFrequencyQuery.data?.forEach((row) => {
      xAxis[0].data?.push(row.range)
      series[0].data?.push(row.count)
    })

    return {
      series,
      xAxis,
    }
  }, [purchaseFrequencyQuery.data])

  useEffect(() => {
    if (purchaseFrequencyQuery.error?.message) {
      toast.setMessage(purchaseFrequencyQuery.error.message)
    }
  }, [purchaseFrequencyQuery.error?.message])

  return (
    <>
      <BasicLayout title="가격대별 구매 빈도 차트">
        <div className={cn('mb-2 flex')}>
          <CustomDatePicker
            className={cn('mr-2')}
            label="시작일"
            value={startAt}
            shouldDisableDate={(value) => value.isAfter(endAt)}
            onChange={(value) => setStartAt(value || dayjs())}
          />

          <CustomDatePicker
            label="종료일"
            value={endAt}
            shouldDisableDate={(value) => value.isBefore(startAt)}
            onChange={(value) => setEndAt(value || dayjs())}
          />
        </div>

        <div>
          {/* 로딩 중일 때 로딩 스피너 표시 */}
          {(purchaseFrequencyQuery.isLoading && (
            <Stack
              alignItems="center"
              justifyContent="center"
              height={400}
            >
              <CircularProgress size={100} />
            </Stack>
          )) || (
            // 로딩이 끝나면 바 차트 표시
            <BarChart
              height={500}
              series={dataForBarChart.series}
              xAxis={dataForBarChart.xAxis}
            />
          )}
        </div>
      </BasicLayout>
    </>
  )
}

export default PurchaseFrequencyPage
