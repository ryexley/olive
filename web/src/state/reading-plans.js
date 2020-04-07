import { createReducer } from "./reducer"

const defaultReadingPlanState = {
  options: {
    startDate: null
  }
}

const defaultState = {
  readingPlans: []
}

export const readingPlanReducers = createReducer({
  defaultState,

  handlers: {}
})
