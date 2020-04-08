import Header from "src/components/Header"
import AppLayout from "src/layouts/AppLayout"
import ReadingPlanConfiguration from "src/ReadingPlanBuilder/components/Configuration"

const HomePage = () => {
  return (
    <AppLayout>
      <Header />
      <ReadingPlanConfiguration />
    </AppLayout>
  )
}

export default HomePage
