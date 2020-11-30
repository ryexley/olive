import PropTypes from "prop-types"

export const Pattern = ({
  children,
  className,
  pattern,
  color,
  bgColor,
  bgSize,
  ...rest
}) => {
  const styles = {
    backgroundImage: `url(//s.svgbox.net/heropatterns.svg?fill=${color}#${pattern})`,
    backgroundColor: bgColor,
    backgroundSize: bgSize
  }

  return (
    <div className={className} style={styles} {...rest}>
      {children}
    </div>
  )
}

Pattern.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string.isRequired,
  pattern: PropTypes.string.isRequired,
  color: PropTypes.string,
  bgColor: PropTypes.string.isRequired,
  bgSize: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
    PropTypes.object
  ])
}
