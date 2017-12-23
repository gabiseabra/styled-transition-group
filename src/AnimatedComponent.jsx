import React, { Component } from "react"
import CSSTransition from "react-transition-group/CSSTransition"

const animated = Target => (
  class extends Component {
    static target = Target

    static displayName = `Animated(${Target.displayName})`

    static styledComponentId = Target.styledComponentId

    static withComponent = Target.withComponent

    static get extend() { return Target.extend }

    render() {
      const { classNames } = Target

      return (
        <CSSTransition {...(Target.attrs || {})} {...this.props} classNames={classNames}>
          <Target {...this.props} transition={{ classNames }} />
        </CSSTransition>
      )
    }
  }
)

export default animated
