import { combineReducers, createStore, compose, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"
import { appReducers } from "./app"
import { persistState } from "./middleware"
import { readingPlanReducers } from "./reading-plans"
import { isNotEmpty } from "src/util"
import { getData } from "src/util/localStorage"

const rootReducer = combineReducers({
  app: appReducers,
  readingPlans: readingPlanReducers
})

const resources = {}

const enableDevtools = (
  typeof window !== "undefined" &&
  process.env.NODE_ENV === "development" &&
  window.__REDUX_DEVTOOLS_EXTENSION__
)

const getInitialState = () => {
  const {
    userId = null,
    email = null,
    fullName = null
  } = getData(process.env.STORAGE_DATA_KEY) || {}

  return {
    app: {
      isAuthenticated: isNotEmpty(userId),
      currentUser: {
        userId,
        email,
        fullName
      }
    }
  }
}

export const storeFactory = () => {
  if (enableDevtools) {
    const composeEnhancers = composeWithDevTools({})

    return createStore(
      rootReducer, getInitialState(),
      composeEnhancers(
        applyMiddleware(
          thunk.withExtraArgument(resources),
          persistState
        )
      )
    )
  }

  return createStore(
    rootReducer, getInitialState(),
    compose(
      applyMiddleware(
        thunk.withExtraArgument(resources),
        persistState
      )
    )
  )
}
