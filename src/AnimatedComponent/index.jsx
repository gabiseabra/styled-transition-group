import React, { Component } from "react"
import CSSTransition from "react-transition-group/CSSTransition"
import { classNames } from "../states"
import groupProps from "./props"

const animated = options => function animatedWithOptions(Target) {
  const { attrs } = options
  class AnimatedComponent extends Component {
      static displayName = `Animated(${Target.displayName})`

      static styledComponentId = Target.styledComponentId

      static attrs = attrs

      static get classNames() {
        return classNames(this.styledComponentId)
      }

      static withComponent(...props) {
        return animatedWithOptions(Target.withComponent(...props))
      }

      renderTarget({ forwardedRef, ...props }) {
        return (
          <Target
            transitionClassNames={this.constructor.classNames}
            {...props}
            ref={forwardedRef} />
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
            {...this.constructor.attrs || {}}
            {...Target.attrs || {}}
            classNames={transitionClassNames}>
            {this.renderChildren({ ...props, transitionClassNames })}
          </CSSTransition>
        )
      }
  }

  const AnimatedComponentWithRef = React.forwardRef(
    (props, ref) => <AnimatedComponent {...props} forwardedRef={ref} />
  )

  AnimatedComponentWithRef.Target = Target

  return AnimatedComponentWithRef
}

export default animated

export const isAnimatedComponent = Klass => "styledComponentId" in Klass && "classNames" in Klass
