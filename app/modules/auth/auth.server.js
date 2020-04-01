import { API } from "~/lib/api"
import { api as apiURLs, authExemptions } from "~/urls"

export async function authLoader({ request }) {
  const requestUrl = new URL(request.url)
  const requestedPath = requestUrl.pathname
  const applicationHost = requestUrl.origin
  const isAuthenticated = false // TODO
  const isAuthExemptPage = authExemptions.includes(requestedPath)

  const api = new API({ baseUrl: applicationHost, api: apiURLs })
  await api.loadBibleData()

  return {
    applicationHost,
    isAuthenticated,
    isAuthExemptPage,
  }
}
