import React, { Component } from "react"
import CSSTransition from "react-transition-group/CSSTransition"
import { groupProps } from "./transitionProps"

const animated = Target => (
  class extends Component {
    static target = Target

    static displayName = `Animated(${Target.displayName})`

    static styledComponentId = Target.styledComponentId

    static withComponent = Target.withComponent

    static get extend() { return Target.extend }

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
