import netlifyIdentity from "netlify-identity-widget"
import { loggedIn, loggedOut } from "src/state/app"

export const register = () => {
  netlifyIdentity.open("signup")
}

export const login = dispatch => {
  netlifyIdentity.open("login")
  netlifyIdentity.on("login", user => {
    dispatch(loggedIn(user))
    netlifyIdentity.close()
  })
}

export const logout = dispatch => {
  netlifyIdentity.logout()
  netlifyIdentity.on("logout", () => {
    dispatch(loggedOut())
  })
}
