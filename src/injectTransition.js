import animated from "./AnimatedComponent"

export default fun => (...args) => {
  const Component = fun(...args)
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
