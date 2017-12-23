const transitionProps = [
  "in",
  "mountOnEnter",
  "unmountOnExit",
  "onEnter",
  "onEntering",
  "onEntered",
  "onExit",
  "onExited",
  "onExiting",
  "onExit",
  "onExited",
  "onExiting",
  "onAppear"
]

export default transitionProps

export const groupProps = (props) => {
  const groups = [ {}, {} ]
  Object.entries(props).forEach(([ key, value ]) => {
    if(transitionProps.includes(key)) {
      groups[0][key] = value
    } else {
      groups[1][key] = value
    }
  })
  return groups
}
