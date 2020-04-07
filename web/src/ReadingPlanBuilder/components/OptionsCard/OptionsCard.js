import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardHeader from "@material-ui/core/CardHeader"
import { makeStyles } from "@material-ui/core/styles"
import { isNotEmpty } from "src/util"

const useStyles = makeStyles(() => ({
  card: {
    margin: "0 2rem 2rem 0",
    minWidth: "20rem"
  },
  header: {
    backgroundColor: "#f7f7f7"
  },
  content: {
    display: "flex",
    flexDirection: "column",

    "& > div": {
      marginBottom: "2rem"
    }
  }
}))

export default function OptionsCard({ title, icon, children }) {
  const styles = useStyles()

  return (
    <Card className={styles.card}>
      <CardHeader
        avatar={ isNotEmpty(icon) ? icon : null }
        title={ title }
        titleTypographyProps={{ variant: "h6" }}
        className={styles.header} />
      <CardContent className={ styles.content }>
        { children }
      </CardContent>
    </Card>
  )
}
