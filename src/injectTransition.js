import animated from "./AnimatedComponent"

export default fun => (target, options, rules) => {
  const Component = fun(target, options, rules)
  const { componentId } = Component.componentStyle
  Component.classNames = {
    appear: `${componentId}-appear`,
    appearActive: `${componentId}-appear-active`,
    enter: `${componentId}-enter`,
    enterActive: `${componentId}-enter-active`,
    exit: `${componentId}-exit`,
    exitActive: `${componentId}-exit-active`
  }
  Component.transition = options.transition
  Component.componentStyle.isStatic = false
  return animated(Component)
}
