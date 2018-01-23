import React, { Component } from "react"
import CSSTransition from "react-transition-group/CSSTransition"
import { classNames } from "../states"
import { extend } from "../construct"
import groupProps from "./props"

const animated = ({ attrs }) => Target => (
  class extends Component {
    static Target = Target

    static displayName = `Animated(${Target.displayName})`

    static styledComponentId = Target.styledComponentId

    static attrs = attrs

    static get classNames() { return classNames(this.styledComponentId) }

    static withComponent(...props) {
      return animated(Target.withComponent(...props))
    }

    static get extend() { return extend(animated, Target.extend) }

    render() {
      const { transition, props } = groupProps(this.props)
      const transitionClassNames = this.constructor.classNames

      return (
        <CSSTransition
          {...transition}
          {...props}
          {...(this.constructor.attrs || {})}
          {...(Target.attrs || {})}
          classNames={transitionClassNames}>
          <Target
            transitionClassNames={transitionClassNames}
            {...props} />
        </CSSTransition>
      )
    }
  }
)

export default animated

export const isAnimatedComponent = Klass => (
  "styledComponentId" in Klass && "classNames" in Klass
)
