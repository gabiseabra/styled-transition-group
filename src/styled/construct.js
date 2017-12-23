import css from "styled-components/lib/constructors/css"
import constructWithOptions from "styled-components/lib/constructors/constructWithOptions"
import { groupProps } from "../transitionProps"
import inject from "../injectTransition"

const construct = constructWithOptions(css)

export default (_, tag, options = {}) => {
  const createStyledComponent = inject(_)
  const styled = construct(createStyledComponent, tag, options)
  styled.attrs = (props) => {
    const [ transition, attrs ] = groupProps(props)
    return construct(createStyledComponent, tag, {
      ...options,
      transition: { ...(options.transition || {}), ...transition },
      attrs: { ...(options.attrs || {}), ...attrs }
    })
  }
  return styled
}
