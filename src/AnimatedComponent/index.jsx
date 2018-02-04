import React, { Component } from "react"
import CSSTransition from "react-transition-group/CSSTransition"
import { classNames } from "../states"
import { extend } from "../construct"
import groupProps from "./props"

const animated = options => function animatedWithOptions(Target) {
  const { attrs } = options
  return class extends Component {
    static Target = Target

    static displayName = `Animated(${Target.displayName})`

    static styledComponentId = Target.styledComponentId

    static attrs = attrs

    static get classNames() { return classNames(this.styledComponentId) }

    static withComponent(...props) {
      return animatedWithOptions(Target.withComponent(...props))
    }

    static get extend() { return extend(animatedWithOptions, Target.extend) }

    renderTarget(props) {
      return (
        <Target
          transitionClassNames={this.constructor.classNames}
          {...props} />
      )
    }

    renderChildren({ children, ...props }) {
      if(typeof children === "function") {
        return state => this.renderTarget({
          ...props,
          children: children(state)
        })
      }
      return this.renderTarget({ children, ...props })
    }

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
          {this.renderChildren({ ...props, transitionClassNames })}
        </CSSTransition>
      )
    }
  }
}

export default animated

export const isAnimatedComponent = Klass => (
  "styledComponentId" in Klass && "classNames" in Klass
)
