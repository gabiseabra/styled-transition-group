import hyphenate from "fbjs/lib/hyphenateStyleName"
// import isStyledComponent from "styled-components/lib/utils/isStyledComponent"
import flattenFn from "styled-components/lib/utils/flatten"
import stringifyRules from "styled-components/lib/utils/stringifyRules"
import generateAlphabeticName from "styled-components/lib/utils/generateAlphabeticName"
import createComponentStyle from "styled-components/lib/models/ComponentStyle"

const flatten = (_, context) => {
  const { transition: { classNames } } = context
  const states = Object.keys(classNames).reduce(
    (obj, key) => ({ [hyphenate(key)]: key, ...obj }),
    {}
  )
  const pattern = new RegExp(`([^\\s]+|^):(${Object.keys(states).join("|")}(?=\\s*[{,]))`, "g")
  const chunks = _.map((body) => {
    if(typeof body !== "string") return body
    return body.replace(pattern, (__, target, state) => {
      const event = states[state]
      if(target === "&") {
        return `&.${classNames[event]}`
      }
      /* else if(target === "") { Interpolated component } */
      throw new Error(`Invalid css transition target ${target}:${event}`)
    })
  })
  return flattenFn(chunks, context)
}

export default createComponentStyle(generateAlphabeticName, flatten, stringifyRules)
