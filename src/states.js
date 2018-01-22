import mapValues from "lodash.mapvalues"

const STATES = {
  appear: "appear",
  appearActive: "appear-active",
  enter: "enter",
  enterActive: "enter-active",
  exit: "exit",
  exitActive: "exit-active"
}

export const classNames = id => mapValues(STATES, type => `${id}-${type}`)

export default STATES
