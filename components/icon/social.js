import PropTypes from "prop-types"

export const Social = ({ className, icon, color, ...rest }) => {
  return (
    <img
      {...rest}
      className={className}
      src={`//s.svgbox.net/social.svg?fill=${color}#${icon}`} />
  )
}

Social.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string.isRequired,
  color: PropTypes.string
}
