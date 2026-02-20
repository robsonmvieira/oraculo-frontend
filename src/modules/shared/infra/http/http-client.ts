import ky, { type KyInstance, type Options } from 'ky'

export interface HttpClient {
  get<T>(url: string, options?: Options): Promise<T>
  post<T>(url: string, body?: unknown, options?: Options): Promise<T>
  put<T>(url: string, body?: unknown, options?: Options): Promise<T>
  patch<T>(url: string, body?: unknown, options?: Options): Promise<T>
  delete<T>(url: string, options?: Options): Promise<T>
}

export class KyHttpClient implements HttpClient {
  private readonly client: KyInstance

  constructor() {
    this.client = ky.create({
      prefixUrl: import.meta.env.VITE_API_URL || 'http://localhost:8000',
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
          async (_request, _options, response) => {
            if (response.status === 401) {
              localStorage.removeItem('access_token')
              window.location.href = '/'
            }
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
