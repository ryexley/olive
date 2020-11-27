import PropTypes from "prop-types"
import SvgBoxIcon from "react-svgbox"
import clsx from "clsx"
import styles from "./styles.module.scss"

/**
 * Wraps the react-svgbox component, which abstracts the SVGBox
 * API for web icons. See https://svgbox.net/ for available
 * icon sets and icons.
 */
export function Icon({
  className,
  color,
  iconSet,
  iconName
}) {
  return (
    <SvgBoxIcon
      className={clsx([styles.icon, className])}
      fillColor={color}
      iconSet={iconSet}
      icon={iconName} />
  )
}

Icon.propTypes = {
  className: PropTypes.string,
  /**
   * See https://github.com/GeoffSelby/react-svgbox#specifying-fill-color
   * for available color format options
   */
  color: PropTypes.string,
  iconSet: PropTypes.string.isRequired,
  iconName: PropTypes.string.isRequired
}
