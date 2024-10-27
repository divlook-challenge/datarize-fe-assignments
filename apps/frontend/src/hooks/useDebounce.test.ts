import { act, renderHook } from '@testing-library/react-hooks'
import { afterEach, expect, test, vi } from 'vitest'

import { useDebounce } from '@/hooks/useDebounce'

afterEach(() => {
  vi.useRealTimers()
  vi.clearAllTimers()
})

// 테스트 설명: 초기 값이 즉시 반환되는지 테스트합니다.
test('초기 값이 즉시 반환되는지 테스트', () => {
  vi.useFakeTimers()
  const { result } = renderHook(() => useDebounce('initial', 500))
  expect(result.current).toBe('initial')
})

// 테스트 설명: 지정된 지연 시간 후에 값이 업데이트되는지 테스트합니다.
test('지정된 지연 시간 후에 값이 업데이트되는지 테스트', async () => {
  vi.useFakeTimers()
  const { result, rerender } = renderHook(
    ({ value, delay }) => useDebounce(value, delay),
    {
      initialProps: { value: 'initial', delay: 500 },
    },
  )

  // 값이 즉시 변경되지 않음을 확인합니다.
  expect(result.current).toBe('initial')

  // 값을 변경하고 지연 시간을 기다립니다.
  rerender({ value: 'updated', delay: 500 })
  act(() => {
    vi.advanceTimersByTime(500)
  })

  // 값이 업데이트되었는지 확인합니다.
  expect(result.current).toBe('updated')
})

// 테스트 설명: 컴포넌트가 언마운트될 때 타임아웃이 정리되는지 테스트합니다.
test('컴포넌트가 언마운트될 때 타임아웃이 정리되는지 테스트', () => {
  vi.useFakeTimers()
  const { unmount } = renderHook(() => useDebounce('initial', 500))
  expect(vi.getTimerCount()).toBe(1)

  // 컴포넌트를 언마운트합니다.
  unmount()
  expect(vi.getTimerCount()).toBe(0)
})
