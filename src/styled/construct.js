import css from "styled-components/lib/constructors/css"
import constructWithOptions from "styled-components/lib/constructors/constructWithOptions"
import inject from "../injectTransition"

const construct = constructWithOptions(css)

export default (createStyledComponent, ...args) => construct(
  inject(createStyledComponent),
  ...args
)
