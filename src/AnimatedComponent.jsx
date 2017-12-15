import React from "react"
import PropTypes from "prop-types"
import CSSTransition from "react-transition-group/CSSTransition"

const transitionPropTypes = { ...CSSTransition.propTypes }
delete transitionPropTypes.children

const groupProps = (props) => {
  const groups = [ [], [] ]
  Object.entries(props).forEach(([ val, key ]) => {
    if((key in transitionPropTypes)) {
      groups[0].push(val)
    } else {
      groups[1].push(val)
    }
  })
  return groups
}
const AnimatedComponent = ({ tag: Tag, ...props }) => {
  const [ transition, rest ] = groupProps(props)
  return (
    <CSSTransition {...transition}>
      <Tag {...rest} />
    </CSSTransition>
  )
}

AnimatedComponent.propTypes = {
  tag: PropTypes.oneOfType([ PropTypes.func, PropTypes.string ]).isRequired
}

export default AnimatedComponent

export const animated = Component => props => <AnimatedComponent tag={Component} {...props} />
