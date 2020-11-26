import PropTypes from "prop-types"
import Head from "next/head"
import { isNotEmpty } from "../../util"

export default function Layout({ title, children }) {
  const appDisplayTitle = process.env.NEXT_PUBLIC_APP_DISPLAY_TITLE
  const pageTitle = isNotEmpty(title) ? `${title} - ${appDisplayTitle}` : appDisplayTitle

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <main>
        {children}
      </main>
    </>
  )
}

Layout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
    PropTypes.object
  ])
}
