export function withWindow(fn) {
  if (
    window &&
    typeof window !== "undefined" &&
    typeof fn !== "undefined" &&
    typeof fn === "function"
  ) {
    fn(window)
  }
}

export const isEmpty = target => {
  if (Array.isArray(target)) {
    return target.length === 0
  }

  return typeof target === "undefined" ||
    target === null ||
    target === ""
}

export const isNotEmpty = target => (!isEmpty(target))

export async function writeToClipboard(content) {
  return withWindow(async window => {
    if (!navigator.clipboard) {
      return
    }

    await navigator.clipboard.writeText(content)
  })
}
