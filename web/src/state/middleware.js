import { isNotEmpty } from "src/util"
import { getData, setData } from "src/util/localStorage"

const STORAGE_KEY = process.env.STORAGE_DATA_KEY

export const persistState = /* store */ () => next => action => {
  const actionHandlerMap = {
    "app:loggedIn": action => {
      const { user } = action

      if (isNotEmpty(user)) {
        const {
          id: userId,
          email,
          user_metadata: {
            full_name: fullName
          }
        } = user

        setData(STORAGE_KEY, {
          userId,
          email,
          fullName
        })
      }

      next(action)
    },

    "app:loggedOut": action => {
      const { fullName } = getData(STORAGE_KEY)
      setData(STORAGE_KEY, { fullName })

      next(action)
    }
  }

  const { type } = action
  const handler = actionHandlerMap[type] || next

  handler(action)
}
