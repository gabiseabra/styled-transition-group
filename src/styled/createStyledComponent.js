import StyledComponent from "styled-components/lib/models/StyledComponent"
import construct from "./construct"
import ComponentStyle from "./ComponentStyle"
import animated from "../AnimatedComponent"

const createStyledComponent = StyledComponent(ComponentStyle, construct)

export default (...args) => {
  const Component = createStyledComponent(...args)
  const { componentId } = Component.componentStyle
  Component.classNames = {
    appear: `${componentId}-appear`,
    appearActive: `${componentId}-appear-active`,
    enter: `${componentId}-enter`,
    enterActive: `${componentId}-enter-active`,
    exit: `${componentId}-exit`,
    exitActive: `${componentId}-exit-active`
  }
  Component.componentStyle.isStatic = false
  return animated(Component)
}
