import Header from "src/components/Header"
import AppLayout from "src/layouts/AppLayout"
import BibleBookOptions from "src/ReadingPlanBuilder/components/BibleBookOptions"
import DaysOfTheWeekOptions from "src/ReadingPlanBuilder/components/DaysOfTheWeekOptions"
import FormatOptions from "src/ReadingPlanBuilder/components/FormatOptions"
import OtherOptions from "src/ReadingPlanBuilder/components/OtherOptions"
import TimeFrameOptions from "src/ReadingPlanBuilder/components/TimeFrameOptions"

const HomePage = () => {
  return (
    <AppLayout>
      <Header />
      <section style={{
        display: "flex",
        flexWrap: "wrap",
        margin: "2rem"
      }}>
        <TimeFrameOptions />
        <FormatOptions />
        <BibleBookOptions />
        <DaysOfTheWeekOptions />
        <OtherOptions />
      </section>
    </AppLayout>
  )
}

export default HomePage
