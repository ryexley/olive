import DateFnsUtils from "@date-io/date-fns"
import FormControl from "@material-ui/core/FormControl"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import Select from "@material-ui/core/Select"
import { makeStyles } from "@material-ui/core/styles"
import CalendarIcon from "@material-ui/icons/DateRange"
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers"
import OptionsCard from "src/ReadingPlanBuilder/components/OptionsCard"

const dateFns = new DateFnsUtils()
const useStyles = makeStyles(() => ({
  startDate: {
    "& button": {
      marginRight: "-0.875rem"
    }
  }
}))

export default function TimeFrameOptions() {
  const styles = useStyles()
  const onDateSelected = date => {
    console.log({ date })
  }

  const onDurationSelected = ({ target: { value } }) => {
    console.log({ value })
  }

  return (
    <OptionsCard title="Time Frame" icon={<CalendarIcon />}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          autoOk={ true }
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="reading-plan-start-date"
          className={ styles.startDate }
          label="Start Date"
          value={ new Date() }
          onChange={ onDateSelected }
          placeholder={ dateFns.format(new Date(), "MM/dd/yyyy") }
          KeyboardButtonProps={{
            "aria-label": "change date",
          }} />
      </MuiPickersUtilsProvider>
      <FormControl>
        <InputLabel id="duration-select-label">Duration</InputLabel>
        <Select
          id="duration-select"
          labelId="duration-select-label"
          value={365}
          onChange={ onDurationSelected }>
          <MenuItem value={ 30 }>30 Days</MenuItem>
          <MenuItem value={ 45 }>45 Days</MenuItem>
          <MenuItem value={ 60 }>60 Days</MenuItem>
          <MenuItem value={ 90 }>90 Days</MenuItem>
          <MenuItem value={ 180 }>180 Days</MenuItem>
          <MenuItem value={ 365 }>1 Year</MenuItem>
          <MenuItem value={ 730 }>2 Years</MenuItem>
        </Select>
      </FormControl>
    </OptionsCard>
  )
}
