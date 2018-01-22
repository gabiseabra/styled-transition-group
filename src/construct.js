import styled from "styled-components"
import parse from "./css"

const CONSTRUCTOR_METHODS = [ "withConfig", "attrs" ]

const delegate = animated => fun => (...css) => animated(fun(...parse(...css)))


export const extend = (animated, target) => {
  const delegateThis = delegate(animated)
  const result = delegateThis(target)
  CONSTRUCTOR_METHODS.forEach((method) => {
    result[method] = (...args) => delegateThis(target[method](...args))
  })
  return result
}

export default (animated, Tag, config) => {
  let target = styled(Tag)
  if(config) target = target.withConfig(config)
  return extend(animated, target)
}
