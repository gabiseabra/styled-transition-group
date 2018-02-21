import styled from "styled-components"
import groupProps from "../AnimatedComponent/props"
import css from "./css"

const delegate = animated => fun => (...props) => animated(fun`${css(...props)}`)

const groupConfig = (config) => {
  const groups = { transition: {}, styled: { ...config } }
  if(config.attrs) {
    const { transition, props } = groupProps(config.attrs)
    groups.transition.attrs = transition
    groups.styled.attrs = props
  }
  return groups
}

export const extend = (animated, target) => {
  const delegateThis = cfg => delegate(animated(cfg))
  const result = delegateThis({})(target)
  result.withConfig = (config) => {
    const cfg = groupConfig(config)
    return delegateThis(cfg.transition)(target.withConfig(cfg.styled))
  }
  result.attrs = (attrs) => {
    const cfg = groupConfig({ attrs })
    return delegateThis(cfg.transition)(target.attrs(cfg.styled.attrs))
  }
  return result
}

export default (animated, Tag, config) => {
  let target = styled(Tag)
  if(config) target = target.withConfig(config)
  return extend(animated, target)
}
