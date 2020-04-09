import CheckboxControl from "@material-ui/core/Checkbox"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import CalendarDayIcon from "@material-ui/icons/Event"
import { useState } from "react"
import OptionsCard from "src/ReadingPlanBuilder/components/OptionsCard"
import { daysOfTheWeek } from "src/ReadingPlanBuilder"

export default function DaysOfTheWeekOptions() {
  const dayOfWeekToggled = ({ name, value, checked }) => {
    console.log({ name, value, checked })
  }

  function Checkbox({ name, value, label }) {
    const [toggled, setToggled] = useState(true)

    const onCheckChanged = ({ target: { name, checked } }) => {
      setToggled(checked)
      dayOfWeekToggled(({ name, value, checked }))
    }

    return (
      <FormControlLabel
        checked={ toggled }
        label={ label }
        control={
          <CheckboxControl
            name={ name }
            onChange={ onCheckChanged } />
        } />
    )
  }

  return (
    <OptionsCard title="Days of the Week" icon={<CalendarDayIcon />}>
      { daysOfTheWeek.map(day => <Checkbox { ...day } key={ day.name } />) }
    </OptionsCard>
  )
}
