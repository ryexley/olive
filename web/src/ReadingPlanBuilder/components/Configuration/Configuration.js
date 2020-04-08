import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import { makeStyles } from "@material-ui/core/styles"
import { useState } from "react"
import BibleBookOptions from "src/ReadingPlanBuilder/components/BibleBookOptions"
import DaysOfTheWeekOptions from "src/ReadingPlanBuilder/components/DaysOfTheWeekOptions"
import FormatOptions from "src/ReadingPlanBuilder/components/FormatOptions"
import OtherOptions from "src/ReadingPlanBuilder/components/OtherOptions"
import TimeFrameOptions from "src/ReadingPlanBuilder/components/TimeFrameOptions"

const useStyles = makeStyles(() => ({
  container: {
    margin: "1.75rem auto"
  },

  grid: {
    flexGrow: 1
  }
}))

export default function Configuration({ readingPlanConfiguration }) {
  const styles = useStyles()
  const [configuration, setConfiguration] = useState(readingPlanConfiguration)

  const container = {
    maxWidth: "md",
    className: styles.container
  }

  const grid = {
    container: true,
    alignContent: "space-between",
    spacing: 3,
    className: styles.grid
  }

  const gridItem = {
    item: true,
    xs: 12,
    sm: 6,
    md: 4
  }

  return (
    <Container { ...container }>
      <Grid { ...grid }>
        <Grid { ...gridItem }><TimeFrameOptions /></Grid>
        <Grid { ...gridItem }><FormatOptions /></Grid>
        <Grid { ...gridItem }><BibleBookOptions /></Grid>
        <Grid { ...gridItem }><DaysOfTheWeekOptions /></Grid>
        <Grid { ...gridItem }><OtherOptions /></Grid>
      </Grid>
    </Container>
  )
}
