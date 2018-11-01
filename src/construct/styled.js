import domElements from "../utils/domElements"

export default (styledComponent, constructWithOptions) => {
  const styled = tag => constructWithOptions(styledComponent, tag)

  // Shorthands for all valid HTML Elements
  domElements.forEach((domElement) => {
    styled[domElement] = styled(domElement)
  })

  return styled
}
