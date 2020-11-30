import PropTypes from "prop-types"

export const HeroSolid = ({ className, icon, color, ...rest }) => {
  return (
    <img
      {...rest}
      className={className}
      src={`//s.svgbox.net/hero-solid.svg?fill=${color}#${icon}`} />
  )
}

HeroSolid.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string.isRequired,
  color: PropTypes.string
}
