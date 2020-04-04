import netlifyIdentity from "netlify-identity-widget"
import { useSelector, useDispatch } from "react-redux"
import { setCurrentUser } from "src/state/app"
import { isEmpty } from "src/util"

const register = () => {
  netlifyIdentity.open("signup")
}

const login = dispatch => {
  netlifyIdentity.open("login")
  netlifyIdentity.on("login", user => {
    dispatch(setCurrentUser(user))
    netlifyIdentity.close()
  })
}

const logout = dispatch => {
  netlifyIdentity.logout()
  netlifyIdentity.on("logout", () => {
    dispatch(setCurrentUser(null))
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
  const currentUser = useSelector(({ app }) => app.currentUser)

  if (isEmpty(currentUser)) {
    return <NotLoggedIn dispatch={ dispatch } />
  }

  return <LoggedIn dispatch={ dispatch } />
}

export default Auth
