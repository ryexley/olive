import { RedwoodProvider, FatalErrorBoundary } from "@redwoodjs/web"
import ReactDOM from "react-dom"
import FatalErrorPage from "src/pages/FatalErrorPage"
import Routes from "src/Routes"

import "./index.css"

ReactDOM.render(
  <FatalErrorBoundary page={FatalErrorPage}>
    <RedwoodProvider>
      <Routes />
    </RedwoodProvider>
  </FatalErrorBoundary>,
  document.getElementById("redwood-app")
)
