const STATES = {
  appear: "appear",
  appearActive: "appear-active",
  enter: "enter",
  enterActive: "enter-active",
  exit: "exit",
  exitActive: "exit-active"
}

export const classNames = id => Object.keys(STATES).reduce((result, type) => {
  result[type] = `${id}-${STATES[type]}`
  return result
}, {})

export default STATES
