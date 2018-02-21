import isEmpty from "lodash.isempty"
import styled from "styled-components"
import groupProps from "../AnimatedComponent/props"
import css from "./css"

const delegate = animated => fun => (...props) => animated(fun`${css(...props)}`)

const groupConfig = ({ attrs, ...config }) => {
  const groups = { transition: {}, styled: { ...config } }
  if(attrs) {
    const { transition, props } = groupProps(attrs)
    groups.transition.attrs = transition
    if(!isEmpty(props)) groups.styled.attrs = props
  }
  return groups
}

export const extend = (animated, target, config = {}) => {
  const { transition, styled: styledConfig } = groupConfig(config)
  const delegateThis = cfg => delegate(animated({ ...transition, ...cfg }))
  if(!isEmpty(styledConfig)) {
    return extend(animated, target.withConfig(styledConfig), transition)
  }
  const result = delegateThis({})(target)
  result.withConfig = (options) => {
    const cfg = groupConfig(options)
    return delegateThis(cfg.transition)(target.withConfig(cfg.styled))
  }
  result.attrs = (attrs) => {
    const cfg = groupConfig({ attrs })
    return delegateThis(cfg.transition)(target.attrs(cfg.styled.attrs))
  }
  return result
}

export default (animated, Tag, config) => extend(animated, styled(Tag), config)
