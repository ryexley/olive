import { createReducer } from "./reducer"

const defaultState = {
  currentUser: null
}

export const appReducers = createReducer({
  defaultState,

  handlers: {}
})
