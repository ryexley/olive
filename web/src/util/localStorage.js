import { withWindow } from "./withWindow"

export function getData(key) {
  let data = {}

  withWindow(window => {
    const storedData = window.localStorage.getItem(key)
    data = JSON.parse(storedData)
  })

  return data
}

export function setData(key, data) {
  withWindow(window => {
    window.localStorage.setItem(key, JSON.stringify(data))
  })
}

export function clear(key) {
  withWindow(window => window.localStorage.removeItem(key))
}
