import { useMemo } from 'react'
import { useRouteError } from 'react-router-dom'

function ErrorPage() {
  const error = useRouteError()

  const errorMessage = useMemo(() => {
    if (typeof error === 'object' && error) {
      if ('statusText' in error && typeof error.statusText === 'string') {
        return error.statusText
      }

      if ('message' in error && typeof error.message === 'string') {
        return error.message
      }
    }

    return '에러가 발생하였습니다.'
  }, [error])

  return (
    <div>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{errorMessage}</i>
      </p>
    </div>
  )
}

export default ErrorPage
