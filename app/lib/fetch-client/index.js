import "isomorphic-fetch"
import normalizeUrl from "normalize-url" // IMPORTANT: only use v4.5.1
import { isNotEmpty, HttpStatus } from "~/util"
import { FetchError } from "./fetch-error"

const HTTP = {
  HEAD: "HEAD",
  OPTION: "OPTION",
  GET: "GET",
  POST: "POST",
  PATCH: "PATCH",
  DELETE: "DELETE",
}

const defaultHeaders = {
  "Content-Type": "application/json",
}

const request = async ({
  url,
  method = HTTP.GET,
  headers,
  data,
  accessToken = null,
}) => {
  try {
    const includeBodyOption =
      ![HTTP.HEAD, HTTP.OPTION, HTTP.GET, HTTP.DELETE].includes(
        method.toUpperCase(),
      ) && isNotEmpty(data)
    const authHeader =
      accessToken && !headers?.Authorization
        ? { Authorization: `Bearer ${accessToken}` }
        : {}
    const options = {
      method,
      headers: {
        ...defaultHeaders,
        ...headers,
        ...authHeader,
      },
      redirect: "follow",
      credentials: "include",
      ...(includeBodyOption ? { body: JSON.stringify(data) } : {}),
    }

    const response = await fetch(url, options)

    let responseData = {}
    try {
      responseData = await response.json()
    } catch /*(err)*/ {
      // ignore errors, we're just trying to capture any content
      // in the body of the response if there is any, and if there
      // is not, we don't care
    }

    if (!HttpStatus.isSuccessStatus(response?.status)) {
      const errorMessageData = [
        `(${response.status})`,
        `${response.statusText}`,
      ]

      Object.keys(responseData).forEach(key => {
        errorMessageData.push(`[${key}: ${responseData[key]}]`)
      })

      const err = new Error(errorMessageData.join(" "))

      err.metadata = {
        status: response.status,
        statusText: response.statusText,
        data: responseData,
      }

      throw err
    }

    return {
      status: response.status,
      data: responseData,
    }
  } catch (err) {
    const metadata = err.metadata ?? {
      status: HttpStatus.SERVER_ERROR,
      statusText: "Server Error",
    }
    throw new FetchError(metadata, err)
  }
}

export class FetchClient {
  constructor({ baseUrl, accessToken }) {
    this.baseUrl = baseUrl
    this.accessToken = accessToken
  }

  buildUrl({ path, query }) {
    let url = normalizeUrl(`${this.baseUrl}/${path}/`)
    // force a trailing slash
    // const last = url.substr(-1)

    // url = (last !== "/") ? `${url}/` : url

    if (isNotEmpty(query)) {
      url = `${url}?${query}`
    }

    return url
  }

  buildAuth({ accessToken = null, ...options } = {}) {
    return {
      ...options,
      accessToken: accessToken ?? this.accessToken,
    }
  }

  async get(path, query, options = {}) {
    const url = this.buildUrl({ path, query })
    return request(this.buildAuth({ url, ...options }))
  }

  async delete(path, query, options = {}) {
    const url = this.buildUrl({ path, query })
    return request(
      this.buildAuth({
        url,
        method: HTTP.DELETE,
        ...options,
      }),
    )
  }

  async post(path, body, options = {}) {
    const url = this.buildUrl({ path })
    return request(
      this.buildAuth({
        url,
        method: HTTP.POST,
        data: body,
        ...options,
      }),
    )
  }

  async patch(path, body, options = {}) {
    const url = this.buildUrl({ path })
    return request(
      this.buildAuth({
        url,
        method: HTTP.PATCH,
        data: body,
        ...options,
      }),
    )
  }
}
