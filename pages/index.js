import { Icon } from "../components/icon"
import Layout from "../components/layout"

export default function Home() {
  return (
    <Layout title="Home">
      <main>
        <Icon iconSet="materialui" iconName="menu_book" color="pink-700" />
        Bible Reading Plan
      </main>
    </Layout>
  )
}
