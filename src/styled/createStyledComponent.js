import StyledComponent from "styled-components/lib/models/StyledComponent"
import construct from "./construct"
import ComponentStyle from "./ComponentStyle"

const createStyledComponent = StyledComponent(ComponentStyle, construct)

export default (...args) => {
  const Component = createStyledComponent(...args)
  const { componentId } = Component.componentStyle
  const attrs = Component.attrs || {}
  attrs.classNames = {
    appear: `${componentId}-appear`,
    appearActive: `${componentId}-appear-active`,
    enter: `${componentId}-enter`,
    enterActive: `${componentId}-enter-active`,
    exit: `${componentId}-exit`,
    exitActive: `${componentId}-exit-active`,
    ...(attrs.classNames || {})
  }
  Component.attrs = attrs
  return Component
}
