const transitionProps = [
  "in",
  // Pass timeout through to use in css templates
  // "timeout",
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

export default function partition(props) {
  const groups = { transition: {}, props: {} }
  Object.entries(props).forEach(([ key, value ]) => {
    if(transitionProps.includes(key)) {
      groups.transition[key] = value
    } else {
      groups.props[key] = value
    }
  })
  return groups
}
