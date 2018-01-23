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

    static withComponent(...props) {
      return animated(Target.withComponent(...props))
    }

    static get extend() { return extend(animated, Target.extend) }

    get classNames() {
      const id = (
        this.target ?
          this.target.state.generatedClassName :
          this.constructor.styledComponentId
      )
      return classNames(id)
    }

    render() {
      const { transition, props } = groupProps(this.props)

      return (
        <CSSTransition
          {...transition}
          {...props}
          {...(this.constructor.attrs || {})}
          {...(Target.attrs || {})}
          classNames={this.classNames}>
          <Target ref={(node) => { this.target = node }} {...props} />
        </CSSTransition>
      )
    }
  }
)

export default animated
