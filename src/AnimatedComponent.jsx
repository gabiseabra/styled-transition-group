import React from "react"
import PropTypes from "prop-types"
import CSSTransition from "react-transition-group/CSSTransition"

const AnimatedComponent = ({ tag: Tag, transition, in: active, classNames, ...props }) => {
  return (
    <CSSTransition {...transition} classNames={classNames} in={active}>
      <Tag {...props} />
    </CSSTransition>
  )
}

AnimatedComponent.propTypes = {
  tag: PropTypes.oneOfType([ PropTypes.func, PropTypes.string ]).isRequired,
  in: PropTypes.bool.isRequired,
  transition: PropTypes.object.isRequired,
  classNames: PropTypes.objectOf(PropTypes.string).isRequired
}


export default AnimatedComponent

export const animated = Component => props => <AnimatedComponent tag={Component} {...props} />
