import invert from "lodash.invert"
import { css } from "styled-components"
import STATES from "../states"

const STATES_BY_NAME = invert(STATES)

const PATTERN = new RegExp(`([^\\s;}]+|^):(${Object.values(STATES).join("|")})(?=\\s*[{,])`, "g")

const getClassName = (pseudoElement) => {
  const key = STATES_BY_NAME[pseudoElement]
  return ({ transitionClassNames }) => `&.${transitionClassNames[key]}`
}

// Replace &:state with a class name selector
const walkChunk = (result, chunk) => {
  let match
  let index = 0
  const push = end => result.push(chunk.substring(index, end))
  const replace = (start, len, value) => {
    if(start > index) push(start)
    result.push(value)
    index = start + len
  }
  // eslint-disable-next-line no-cond-assign
  while(match = PATTERN.exec(chunk)) {
    const [ target, state ] = match.slice(1)
    const len = match[0].length
    if(target === "&") {
      replace(match.index, len, getClassName(state))
    // } else if(target === "") {
    //   console.log(".", result[result.length - 1])
    } else {
      throw new Error(`Invalid transition target ${target}`)
    }
  }
  push(chunk.length)
  return result
}

export default function parseCss(strings, ...interpolations) {
  return css(strings, ...interpolations).reduce((result, chunk) => {
    if(typeof chunk !== "string") result.push(chunk)
    else walkChunk(result, chunk)
    return result
  }, [])
}
