export const isEmpty = target => {
  if (Array.isArray(target)) {
    return target.length === 0
  }

  return typeof target === "undefined" ||
    target === null ||
    (typeof target === "string" && target.trim() === "")
}

export const isNotEmpty = target => (!isEmpty(target))
