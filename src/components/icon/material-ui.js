import PropTypes from "prop-types"

export const MaterialUi = ({ className, icon, color, ...rest }) => {
  return (
    <img
      {...rest}
      className={className}
      src={`//s.svgbox.net/materialui.svg?fill=${color}#${icon}`} />
  )
}

MaterialUi.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string.isRequired,
  color: PropTypes.string
}
