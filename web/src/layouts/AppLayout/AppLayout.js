import netlifyIdentity from "netlify-identity-widget"
import { Provider } from "react-redux"
import { storeFactory } from "src/state/store"
import { withWindow } from "src/util/withWindow"

const AppLayout = ({ children }) => {
  const store = storeFactory()

  withWindow(window => {
    window.netlifyIdentity = netlifyIdentity
    netlifyIdentity.init()
  })

  return (
    <Provider store={store}>
      { children }
    </Provider>
  )
}

export default AppLayout
