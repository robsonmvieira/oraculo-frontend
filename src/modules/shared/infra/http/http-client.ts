import ky, { type KyInstance, type Options } from 'ky'

export interface HttpClient {
  get<T>(url: string, options?: Options): Promise<T>
  post<T>(url: string, body?: unknown, options?: Options): Promise<T>
  put<T>(url: string, body?: unknown, options?: Options): Promise<T>
  patch<T>(url: string, body?: unknown, options?: Options): Promise<T>
  delete<T>(url: string, options?: Options): Promise<T>
}

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

let isRefreshing = false
let pendingRequests: Array<{
  resolve: (token: string) => void
  reject: (error: unknown) => void
}> = []

function processPendingRequests(token: string | null, error: unknown = null) {
  pendingRequests.forEach(({ resolve, reject }) => {
    if (token) {
      resolve(token)
    } else {
      reject(error)
    }
  })
  pendingRequests = []
}

async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = localStorage.getItem('refresh_token')
  if (!refreshToken) return null

  try {
    const response = await ky.post('auth/refresh', {
      prefixUrl: API_BASE_URL,
      json: { refresh_token: refreshToken },
    }).json<{ access_token: string; refresh_token: string; token_type: string }>()

    localStorage.setItem('access_token', response.access_token)
    localStorage.setItem('refresh_token', response.refresh_token)
    return response.access_token
  } catch {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    return null
  }
}

export class KyHttpClient implements HttpClient {
  private readonly client: KyInstance

  constructor() {
    this.client = ky.create({
      prefixUrl: API_BASE_URL,
      timeout: 30000,
      retry: {
        limit: 2,
        methods: ['get', 'put', 'head', 'delete', 'options', 'trace'],
        statusCodes: [408, 413, 429, 500, 502, 503, 504],
      },
      hooks: {
        beforeRequest: [
          (request) => {
            const token = localStorage.getItem('access_token')
            if (token) {
              request.headers.set('Authorization', `Bearer ${token}`)
            }
          },
        ],
        afterResponse: [
          async (request, options, response) => {
            if (response.status !== 401) return response

            const url = new URL(request.url)
            if (url.pathname.includes('/auth/')) return response

            if (isRefreshing) {
              return new Promise<Response>((resolve, reject) => {
                pendingRequests.push({
                  resolve: (token: string) => {
                    request.headers.set('Authorization', `Bearer ${token}`)
                    resolve(ky(request, options))
                  },
                  reject,
                })
              })
            }

            isRefreshing = true

            const newToken = await refreshAccessToken()

            if (newToken) {
              processPendingRequests(newToken)
              isRefreshing = false

              request.headers.set('Authorization', `Bearer ${newToken}`)
              return ky(request, options)
            }

            processPendingRequests(null, new Error('Refresh token expired'))
            isRefreshing = false
            window.location.href = '/login'
            return response
          },
        ],
      },
    })
  }

  async get<T>(url: string, options?: Options): Promise<T> {
    return this.client.get(url, options).json<T>()
  }

  async post<T>(url: string, body?: unknown, options?: Options): Promise<T> {
    return this.client.post(url, { json: body, ...options }).json<T>()
  }

  async put<T>(url: string, body?: unknown, options?: Options): Promise<T> {
    return this.client.put(url, { json: body, ...options }).json<T>()
  }

  async patch<T>(url: string, body?: unknown, options?: Options): Promise<T> {
    return this.client.patch(url, { json: body, ...options }).json<T>()
  }

  async delete<T>(url: string, options?: Options): Promise<T> {
    return this.client.delete(url, options).json<T>()
  }
}
