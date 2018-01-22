import STATES from "./states"

const pseudoElements = Object.values(STATES)

const pattern = new RegExp(`([^\\s;}]+|^):(${pseudoElements.join("|")}(?=\\s*[{,]))`, "g")

export default function parseCss(strings, ...interpolations) {
  const result = strings.map(body => body.replace(pattern, (_, target, state) => {
    if(target === "&") return `&-${state}`
    // TODO
    throw new Error(`Invalid transition target ${target}`)
  }))
  return [ result, ...interpolations ]
}
