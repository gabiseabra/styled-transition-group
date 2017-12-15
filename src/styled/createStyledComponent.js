import StyledComponent from "styled-components/lib/models/StyledComponent"
import construct from "./construct"
import ComponentStyle from "./ComponentStyle"

const createStyledComponent = StyledComponent(ComponentStyle, construct)

export default (...args) => {
  const Component = createStyledComponent(...args)
  const { componentId } = Component.componentStyle
  Component.attrs = Component.attrs || {}
  const transitions = Object.assign({
    appear: `${componentId}-appear`,
    appearActive: `${componentId}-appear-active`,
    enter: `${componentId}-enter`,
    enterActive: `${componentId}-enter-active`,
    exit: `${componentId}-exit`,
    exitActive: `${componentId}-exit-active`
  }, Component.attrs.classNames || {})
  Component.attrs.classNames = transitions
  Component.classNames = transitions
  return Component
}
