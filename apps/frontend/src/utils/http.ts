import axios, { AxiosError } from 'axios'

export const http = axios.create({
  baseURL: 'http://localhost:4000/api',
})

http.interceptors.response.use(
  (res) => res,
  (error) => {
    const errorMessage = error?.response?.data?.error || error?.message

    if (errorMessage) {
      error.message = errorMessage
    }

    throw error
  },
)
