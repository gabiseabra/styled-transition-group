import React, { Component } from "react"
import CSSTransition from "react-transition-group/CSSTransition"
import { groupProps } from "./transitionProps"
import { classNames } from "./states"
import construct from "./construct"

const animated = Target => (
  class extends Component {
    static Target = Target

    static displayName = `Animated(${Target.displayName})`

    static styledComponentId = Target.styledComponentId

    static withComponent(...props) {
      return animated(Target.withComponent(...props))
    }

    /* TODO */
    static get extend() {
      return construct(animated, Target)
    }

    get classNames() { return classNames(this.constructor.styledComponentId) }

    render() {
      const [ transition, props ] = groupProps(this.props)

      return (
        <CSSTransition
          {...transition}
          {...(Target.attrs || {})}
          classNames={this.classNames}>
          <Target {...props} />
        </CSSTransition>
      )
    }
  }
)

export default animated
