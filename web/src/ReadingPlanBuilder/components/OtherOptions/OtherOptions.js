import CheckboxControl from "@material-ui/core/Checkbox"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import SettingsIcon from "@material-ui/icons/Tune"
import OptionsCard from "src/ReadingPlanBuilder/components/OptionsCard"

export default function OtherOptions() {
  const options = [
    { name: "includeCheckbox", label: "Include Checkbox" },
    { name: "sectionColors", label: "Section Colors" },
    { name: "dailyPsalm", label: "Daily Psalm" },
    { name: "dailyProverb", label: "Daily Proverb" },
    { name: "testamentOverlap", label: "OT/NT Overlap" },
    { name: "showStats", label: "Show Stats" }
  ]

  const onCheckChange = ({ target: { name, checked } }) => {
    console.log({ name, checked })
  }

  function Checkbox({ name, label }) {
    return (
      <FormControlLabel
        label={ label }
        control={
          <CheckboxControl
            name={ name }
            onChange={ onCheckChange } />
        } />
    )
  }

  return (
    <OptionsCard title="Options" icon={<SettingsIcon />}>
      { options.map(({ name, label }) => (
        <Checkbox name={ name } label={ label } key={ name } />
      ) )}
    </OptionsCard>
  )
}
