import PropTypes from "prop-types"

export const Loader = ({ className, icon, color, ...rest }) => {
  return (
    <img
      {...rest}
      className={className}
      src={`//s.svgbox.net/loaders.svg?fill=${color}#${icon}`} />
  )
}

Loader.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string.isRequired,
  color: PropTypes.string
}
