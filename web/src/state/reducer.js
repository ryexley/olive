export function createReducer({ defaultState, handlers }) {
  return function actionHandlerMap(state = defaultState, action) {
    const { type } = action
    const handler = handlers[type]

    if (handler && typeof handler === "function") {
      // remove the `type` property from `action`...
      // returning `args` as `action` without `type`
      const { type, ...args } = action // eslint-disable-line no-unused-vars

      return handler(state, args)
    }

    return state
  }
}
