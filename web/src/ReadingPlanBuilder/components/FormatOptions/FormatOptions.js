import FormControlLabel from "@material-ui/core/FormControlLabel"
import Radio from "@material-ui/core/Radio"
import RadioGroup from "@material-ui/core/RadioGroup"
import FormatIcon from "@material-ui/icons/ViewQuilt"
import OptionsCard from "src/ReadingPlanBuilder/components/OptionsCard"

export default function FormatOptions() {
  const onUiFormatChange = ({ target: { value } }) => {
    console.log({ uiFormat: value })
  }

  return (
    <OptionsCard title="Format" icon={<FormatIcon />}>
      <RadioGroup
        aria-label="output format"
        name="uiFormat"
        value="list"
        onChange={onUiFormatChange}>
        <FormControlLabel value="list" label="List" control={ <Radio /> } />
        <FormControlLabel value="weeks" label="Weeks" control={ <Radio /> } />
        <FormControlLabel value="books" label="Books" control={ <Radio /> } />
        <FormControlLabel value="calendar" label="Calendar" control={ <Radio /> } />
      </RadioGroup>
    </OptionsCard>
  )
}
