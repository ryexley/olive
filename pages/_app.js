import PropTypes from "prop-types"
import "../styles/globals.scss"

export default function Olive({ Component, pageProps }) {
  return (
    <Component {...pageProps} />
  )
}

Olive.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object
}
