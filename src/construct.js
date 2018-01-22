import styled from "styled-components"

const CONSTRUCTOR_METHODS = [ "withConfig", "attrs" ]

export default (animated, Tag, config) => {
  let target = styled(Tag)
  if(config) target = target.withConfig(config)
  const template = (...props) => animated(target(...props))
  CONSTRUCTOR_METHODS.forEach((method) => {
    template[method] = (...args) => (...interpolations) => animated(target[method](...args)(...interpolations))
  })
  return template
}
