import React, { Component } from "react"
import CSSTransition from "react-transition-group/CSSTransition"
import { groupProps } from "./transitionProps"
import construct from "./construct"

const animated = Target => (
  class extends Component {
    static Target = Target

    static displayName = `Animated(${Target.displayName})`

    static componentId = Target.componentId

    static withComponent(...props) {
      return animated(Target.withComponent(...props))
    }

    /* TODO */
    static get extend() {
      return construct(animated, Target)
    }

    render() {
      const { classNames } = Target
      const [ transition, props ] = groupProps(this.props)

      return (
        <CSSTransition
          {...this.props}
          {...(Target.transition || {})}
          {...(Target.attrs || {})}
          classNames={classNames}>
          <Target {...props} transition={{ classNames, ...transition }} />
        </CSSTransition>
      )
    }
  }
)

export default animated
