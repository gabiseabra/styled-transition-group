import invert from "lodash.invert"
import { css } from "styled-components"
import { isAnimatedComponent } from "../AnimatedComponent"
import STATES from "../states"

const STATES_BY_NAME = invert(STATES)

const PATTERN = new RegExp(`([^\\s;}]+|^):(${Object.keys(STATES).map(key => STATES[key]).join("|")})(?=[\\s\\+~,{])`, "g")

const getClassName = state => props => `&.${props.transitionClassNames[state]}`

// Replace &:state with a class name selector
const walkChunk = ({ strings, interpolations }) => (_, chunk) => {
  let match
  let lastIndex = 0
  // eslint-disable-next-line no-cond-assign
  while(match = PATTERN.exec(chunk)) {
    const [ target, element ] = match.slice(1)
    const state = STATES_BY_NAME[element]
    const len = match[0].length
    if(target === "&") {
      strings.push(chunk.substring(lastIndex, match.index))
      interpolations.splice(strings.length - 1, 0, getClassName(state))
    } else if(target === "") {
      const targetIndex = strings.length - 1
      const Target = interpolations[targetIndex]
      if(!isAnimatedComponent(Target)) {
        const name = Target && Target.constructor ? Target.constructor.name : Target
        throw new Error(`Invalid transition target "${name}". Target must be an AnimatedComponent.`)
      }
      interpolations.splice(targetIndex, 1, `.${Target.classNames[state]}`)
    } else {
      throw new Error(`Invalid transition target "${target}".`)
    }
    lastIndex = match.index + len
  }
  strings.push(chunk.substring(lastIndex, chunk.length))
}

export default function parseCss(strings, ...interpolations) {
  const next = {
    strings: [],
    interpolations: [ ...interpolations ]
  }
  strings.reduce(walkChunk(next), null)
  return css(next.strings, ...next.interpolations)
}
