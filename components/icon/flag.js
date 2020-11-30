import PropTypes from "prop-types"

export const Flag = ({ className, flag, quality, ...rest }) => {
  const definition = quality === "high" ? "hd" : "ld"

  return (
    <img
      {...rest}
      className={className}
      src={`//s.svgbox.net/flags-${definition}.svg?#${flag}`} />
  )
}

Flag.propTypes = {
  className: PropTypes.string,
  flag: PropTypes.string.isRequired,
  quality: PropTypes.oneOf(["high", "low"])
}

Flag.defaultProps = {
  quality: "high"
}
