import { Provider } from "react-redux"
import { storeFactory } from "src/state/store"

// TODO: integrate the netlify-identity-widget for authentication
// Example: https://github.com/redwoodjs/example-blog/blob/5e8fe73365c957f2ff6aab0c47808fd4e4eed916/web/src/layouts/AdminLayout/AdminLayout.js
// Documentation: https://docs.netlify.com/visitor-access/identity/
const AppLayout = ({ children }) => {
  const store = storeFactory()

  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}

export default AppLayout
