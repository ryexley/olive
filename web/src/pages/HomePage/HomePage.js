import Auth from "src/components/Auth"
import AppLayout from "src/layouts/AppLayout"

const HomePage = () => {
  return (
    <AppLayout>
      <h1>Olive</h1>
      <Auth />
    </AppLayout>
  )
}

export default HomePage
