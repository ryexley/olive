import netlifyIdentity from "netlify-identity-widget"
import { useSelector, useDispatch } from "react-redux"
import Button from "@material-ui/core/Button"
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
    <Button
      variant="contained"
      color="primary"
      onClick={() => logout(dispatch)}>
      Logout
    </Button>
  )
}

const NotLoggedIn = ({ dispatch }) => {
  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => login(dispatch)}>
        Login
      </Button>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => register()}>
        Register
      </Button>
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
