export class FetchError extends Error {
  constructor(...args) {
    super(...args)
    this.name = "FetchError"

    if (
      Error.captureStackTrace &&
      typeof Error.captureStackTrace === "function"
    ) {
      Error.captureStackTrace(this, FetchError)
    }
  }
}
