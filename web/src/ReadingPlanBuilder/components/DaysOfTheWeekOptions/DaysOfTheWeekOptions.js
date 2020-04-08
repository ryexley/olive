import CheckboxControl from "@material-ui/core/Checkbox"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import CalendarDayIcon from "@material-ui/icons/Event"
import OptionsCard from "src/ReadingPlanBuilder/components/OptionsCard"

export default function DaysOfTheWeekOptions() {
  const onCheckChange = ({ target: { name, checked } }) => {
    console.log({ name, checked })
  }

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ]

  function Checkbox({ day }) {
    return (
      <FormControlLabel
        label={ day }
        control={
          <CheckboxControl
            name={ day.toLowerCase() }
            onChange={ onCheckChange } />
        } />
    )
  }

  return (
    <OptionsCard title="Days of the Week" icon={<CalendarDayIcon />}>
      { days.map(day => <Checkbox day={ day } key={ day.toLowerCase() } />) }
    </OptionsCard>
  )
}
