import styled from "styled-components"
import groupProps from "../AnimatedComponent/props"
import css from "./css"

const CONSTRUCTOR_METHODS = [ "withConfig", "attrs" ]

const delegate = animated => fun => (...props) => animated(fun`${css(...props)}`)

export const extend = (animated, target) => {
  const delegateThis = delegate(animated)
  const result = delegateThis(target)
  CONSTRUCTOR_METHODS.forEach((method) => {
    result[method] = (...args) => delegateThis(target[method](...args))
  })
  return result
}

export default (animated, Tag, config) => {
  const transitionConfig = { }
  let target = styled(Tag)
  if(config) {
    const styledConfig = { ...config }
    if(config.attrs) {
      const props = groupProps(config.attrs)
      styledConfig.attrs = props.props
      transitionConfig.attrs = props.transition
    }
    target = target.withConfig(config)
  }
  return extend(animated(transitionConfig), target)
}
