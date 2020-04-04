import netlifyIdentity from "netlify-identity-widget"
import { Helmet } from "react-helmet"
import { Provider } from "react-redux"
import { storeFactory } from "src/state/store"
import { withWindow } from "src/util/withWindow"
import "typeface-roboto"

const AppLayout = ({ children }) => {
  const store = storeFactory()

  withWindow(window => {
    window.netlifyIdentity = netlifyIdentity
    netlifyIdentity.init()
  })

  return (
    <>
      <Helmet>
        <title>Bible Reading Plan Generator</title>
      </Helmet>
      <Provider store={store}>
        { children }
      </Provider>
    </>
  )
}

export default AppLayout
