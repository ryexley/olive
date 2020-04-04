import { createReducer } from "./reducer"

const defaultState = {
  isAuthenticated: false,
  currentUser: null
}

export const appReducers = createReducer({
  defaultState,

  handlers: {
    "app:loggedIn"(state, { user }) {
      return {
        ...state,
        currentUser: user,
        isAuthenticated: true
      }
    },

    "app:loggedOut"(state) {
      return {
        ...state,
        currentUser: null,
        isAuthenticated: false
      }
    }
  }
})

export function loggedIn(user) {
  return {
    type: "app:loggedIn",
    user
  }
}

export function loggedOut() {
  return {
    type: "app:loggedOut"
  }
}
