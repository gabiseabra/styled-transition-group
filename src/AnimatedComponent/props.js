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

const bothProps = [
  // Pass timeout through to use in css templates
  "timeout"
]

/**
 * Select which props to pass to transition and child component.
 * @param {Object} props               All props
 * @returns {Object} groups
 * @returns {Object} groups.transition Transition props
 * @returns {Object} groups.props      Child component props
 */
export default function partition(props) {
  const groups = { transition: {}, props: {} }
  Object.entries(props).forEach(([ key, value ]) => {
    if(bothProps.includes(key)) {
      groups.transition[key] = value
      groups.props[key] = value
    } else if(transitionProps.includes(key)) {
      groups.transition[key] = value
    } else {
      groups.props[key] = value
    }
  })
  return groups
}
