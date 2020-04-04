import netlifyIdentity from "netlify-identity-widget"
import { useSelector, useDispatch } from "react-redux"
import { loggedIn, loggedOut } from "src/state/app"

const register = () => {
  netlifyIdentity.open("signup")
}

const login = dispatch => {
  netlifyIdentity.open("login")
  netlifyIdentity.on("login", user => {
    dispatch(loggedIn(user))
    netlifyIdentity.close()
  })
}

const logout = dispatch => {
  netlifyIdentity.logout()
  netlifyIdentity.on("logout", () => {
    dispatch(loggedOut())
  })
}

const LoggedIn = ({ dispatch }) => {
  return (
    <button onClick={() => logout(dispatch)}>Logout</button>
  )
}

const NotLoggedIn = ({ dispatch }) => {
  return (
    <>
      <button onClick={() => login(dispatch)}>Login</button>
      <button onClick={() => register()}>Register</button>
    </>
  )
}

const Auth = () => {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector(({ app }) => app.isAuthenticated)

  if (isAuthenticated) {
    return <LoggedIn dispatch={ dispatch } />
  }

  return <NotLoggedIn dispatch={ dispatch } />
}

export default Auth
