import styled from "styled-components"
import parse from "./css"

const CONSTRUCTOR_METHODS = [ "withConfig", "attrs" ]

const delegate = animated => fun => (...css) => animated(fun(...parse(...css)))

export default (animated, Tag, config) => {
  let target = styled(Tag)
  const delegateThis = delegate(animated)
  if(config) target = target.withConfig(config)
  const result = delegateThis(target)
  CONSTRUCTOR_METHODS.forEach((method) => {
    result[method] = (...args) => delegateThis(target[method](...args))
  })
  return result
}
