import styled from "styled-components/lib/constructors/styled"
import { createStyledComponent, construct } from "./styled"
import { animated } from "./AnimatedComponent"

export default styled(
  createStyledComponent,
  (_, tag, __) => construct(_, animated(tag), __)
)
