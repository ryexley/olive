import BookIcon from "@material-ui/icons/ImportContacts"
import OptionsCard from "src/ReadingPlanBuilder/components/OptionsCard"

export default function BibleBookOptions() {
  return (
    <OptionsCard title="Books of the Bible" icon={<BookIcon />}>
      Options for Books of the Bible
    </OptionsCard>
  )
}
