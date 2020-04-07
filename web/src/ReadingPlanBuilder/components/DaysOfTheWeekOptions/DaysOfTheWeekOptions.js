import CalendarDayIcon from "@material-ui/icons/Event"
import OptionsCard from "src/ReadingPlanBuilder/components/OptionsCard"

export default function DaysOfTheWeekOptions() {
  return (
    <OptionsCard title="Days of the Week" icon={<CalendarDayIcon />}>
      Options for Days of the Week
    </OptionsCard>
  )
}
