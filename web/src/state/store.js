import { combineReducers, createStore } from "redux"
import { appReducers } from "./app"

const rootReducer = combineReducers({
  app: appReducers
})

const enableDevtools =
  typeof window !== "undefined" &&
  process.env.NODE_ENV === "development" &&
  window.__REDUX_DEVTOOLS_EXTENSION__

export const storeFactory = () => {
  if (enableDevtools) {
    return createStore(rootReducer, {}, window.__REDUX_DEVTOOLS_EXTENSION__())
  }

  return createStore(rootReducer, {})
}
