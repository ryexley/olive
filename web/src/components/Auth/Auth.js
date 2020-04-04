import netlifyIdentity from "netlify-identity-widget"
import { useSelector } from "react-redux"
import { isEmpty } from "src/util"

const login = () => {
  netlifyIdentity.open()
  netlifyIdentity.on("login", user => {
    console.log({ user })
  })
}

const LoggedIn = () => {
  return (
    <h2>Logged In</h2>
  )
}

const NotLoggedIn = () => {
  return (
    <button onClick={login}>Login</button>
  )
}

const Auth = () => {
  const currentUser = useSelector(({ app }) => app.currentUser)

  if (isEmpty(currentUser)) {
    return <NotLoggedIn />
  }

  return <LoggedIn />
}

export default Auth
