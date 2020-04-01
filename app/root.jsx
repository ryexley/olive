import { Outlet, useLoaderData } from "react-router"
import { Olive } from "~/layouts"
export { ErrorBoundary } from "~/layouts"
export { loader } from "~/modules/home/server"

const resolveLayout = ({}) => {
  return Olive
}

export const links = () => [...Olive.links()]

export default function App() {
  const { bibleDataCachedScripts } = useLoaderData()
  const Layout = resolveLayout({})

  return (
    <Layout {...{ bibleDataCachedScripts }}>
      <Outlet />
    </Layout>
  )
}
