import PropTypes from "prop-types"
import clsx from "clsx"
import styles from "./styles.module.scss"

export { Pattern } from "./pattern"
export { Social } from "./social"
export { MaterialUi } from "./material-ui"
export { HeroOutline } from "./hero-outline"
export { HeroSolid } from "./hero-solid"
export { Loader } from "./loader"
export { Flag } from "./flag"

/**
 * Wraps the react-svgbox component, which abstracts the SVGBox
 * API for web icons. See https://svgbox.net/ for available
 * icon sets and icons.
 */
export function Icon({
  className,
  color,
  iconSet,
  iconName,
  ...rest
}) {
  return (
    <img
      {...rest}
      className={clsx([styles.icon, className])}
      src={`//s.svgbox.net/${iconSet}.svg?fill=${color}#${iconName}`} />
  )
}

Icon.propTypes = {
  className: PropTypes.string,
  /**
   * This can be any standard HTML/CSS color code format, including hex, RGB,
   * HSL, or any HTML5 common color (i.e. "violet"). If you're using Tailwind
   * CSS, it can also be one of the Tailwind color constants as well (i.e.
   * "pink-700").
   */
  color: PropTypes.string,
  /**
   * The SVGBox API iconset to use. Current options are "social", "materialui",
   * "hero-solid", "hero-outline", and "loaders".
   */
  iconSet: PropTypes.oneOf([
    "social",
    "materialui",
    "hero-solid",
    "hero-outline",
    "loaders"
  ]).isRequired,
  /**
   * The SVGBox API icon name to render, i.e. "account_circle" or "discourse"
   */
  iconName: PropTypes.string.isRequired
}
