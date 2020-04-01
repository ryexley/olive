import { FetchClient } from "~/lib/fetch-client"
import { api } from "~/urls"

export class API {
  constructor({ baseUrl, api }) {
    this.api = api
    this.http = new FetchClient({ baseUrl: `${baseUrl}/${api.root}` })
  }

  async loadBibleData() {
    await this.http.get(api.bibleData)
  }
}
