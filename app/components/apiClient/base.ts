export type APIError = {
  id: string
  code: string
  message: string
}

const API_ERROR = Symbol()

export function isAPIError(reason: unknown): reason is APIError {
  return (
    reason !== null &&
    typeof reason === 'object' &&
    Object.hasOwn(reason, API_ERROR)
  )
}

export type FetchLike<R extends any = any> = (
  input: string,
  init?: {
    method?: string
    body?: string
    headers: { [key in string]: string }
  },
) => Promise<{
  status: number
  json(): Promise<R>
}>

export type APIClientOptions = {
  origin: string
  fetch?: FetchLike | null | undefined
}

export class APIClient {
  protected origin: APIClientOptions['origin']
  protected fetch: FetchLike

  constructor(opts: APIClientOptions) {
    this.origin = opts.origin
    this.fetch = opts.fetch ?? ((...args) => fetch(...args))
  }

  protected request<P extends {}, R extends {}>(
    endpoint: string,
    method: string,
    params: P = {} as P,
  ) {
    return new Promise<R>((resolve, reject) => {
      this.fetch(`${this.origin}/api/${endpoint}`, {
        method,
        body: JSON.stringify({
          ...params,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(async (res) => {
          const body = res.status === 204 ? null : await res.json()

          if (res.status === 200) {
            resolve(body)
          } else if (res.status === 204) {
            resolve(body)
          } else {
            reject({
              [API_ERROR]: true,
              ...body.error,
            })
          }
        })
        .catch(reject)
    })
  }

  protected get<R extends {}>(url: string): Promise<R> {
    return this.request<{}, R>(url, 'GET')
  }

  protected post<D extends {}, R extends {}>(
    url: string,
    data?: D,
  ): Promise<R> {
    return this.request<D, R>(url, 'POST', data)
  }

  protected put<D extends {}, R extends {}>(url: string, data?: D): Promise<R> {
    return this.request<D, R>(url, 'PUT', data)
  }

  protected patch<D extends {}, R extends {}>(
    url: string,
    data?: D,
  ): Promise<R> {
    return this.request<D, R>(url, 'PATCH', data)
  }

  protected delete<R extends {}>(url: string): Promise<R> {
    return this.request<{}, R>(url, 'DELETE')
  }

  protected head<R extends {}>(url: string): Promise<R> {
    return this.request<{}, R>(url, 'HEAD')
  }
}
