export const isString = (target) => typeof target === "string"
export const isObject = (target) =>
  !Array.isArray(target) && target === Object(target)

export const isEmpty = target => {
  if (Array.isArray(target)) {
    return target.length === 0
  }

  if (typeof target === "string") {
    return target === ""
  }

  if (isObject(target)) {
    return JSON.stringify(target) === "{}"
  }

  if (typeof target === "undefined") {
    return true
  }

  if (target === null) {
    return true
  }

  return false
}

export const isNotEmpty = target => (!isEmpty(target))
