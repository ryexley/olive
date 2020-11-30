import PropTypes from "prop-types"

export const HeroOutline = ({ className, icon, color, ...rest }) => {
  return (
    <img
      {...rest}
      className={className}
      src={`//s.svgbox.net/hero-outline.svg?fill=${color}#${icon}`} />
  )
}

HeroOutline.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string.isRequired,
  color: PropTypes.string
}
