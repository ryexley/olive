import AppBar from "@material-ui/core/AppBar"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import { makeStyles } from "@material-ui/core/styles"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import AccountCircle from "@material-ui/icons/AccountCircle"
import { useSelector, useDispatch } from "react-redux"
import { register, login, logout } from "src/auth"

const useStyles = makeStyles(() => ({
  appBarTitle: {
    flexGrow: 1,
    whiteSpace: "no-wrap"
  },
  authButton: {
    margin: "0 0.5rem"
  }
}))

function LoggedIn({ dispatch, styles }) {
  return (
    <Button
      variant="contained"
      color="primary"
      className={styles.authButton}
      onClick={() => logout(dispatch)}>
      Logout
    </Button>
  )
}

function NotLoggedIn({ dispatch, styles }) {
  return (
    <>
      <Button
        variant="outlined"
        color="primary"
        className={styles.authButton}
        onClick={() => register()}>
        Register
      </Button>
      <Button
        variant="contained"
        color="primary"
        className={styles.authButton}
        onClick={() => login(dispatch)}>
        Login
      </Button>
    </>
  )
}

export default function Header() {
  const styles = useStyles()
  const dispatch = useDispatch()
  const isAuthenticated = useSelector(({ app }) => app.isAuthenticated)

  return (
    <AppBar position="static" color="transparent">
      <Toolbar>
        <Typography variant="h6" edge="start" className={styles.appBarTitle}>
          Bible Reading Plan Generator
        </Typography>
        {
          isAuthenticated ?
            <LoggedIn dispatch={dispatch} styles={styles} /> :
            <NotLoggedIn dispatch={dispatch} styles={styles} />
        }
        <IconButton edge="end">
          <AccountCircle />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}
