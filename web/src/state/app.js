import { createReducer } from "./reducer"
import { isNotEmpty } from "src/util"

const defaultState = {
  isAuthenticated: false,
  currentUser: null
}

export const appReducers = createReducer({
  defaultState,

  handlers: {
    "app:setCurrentUser"(state, { user }) {
      return {
        ...state,
        currentUser: user,
        isAuthenticated: isNotEmpty(user)
      }
    }
  }
})

export function setCurrentUser(user) {
  return {
    type: "app:setCurrentUser",
    user
  }
}
