import React, { Component } from "react"
import CSSTransition from "react-transition-group/CSSTransition"
import { groupProps } from "./transitionProps"
import { classNames } from "./states"
import { extend } from "./construct"

const animated = Target => (
  class extends Component {
    static Target = Target

    static displayName = `Animated(${Target.displayName})`

    static styledComponentId = Target.styledComponentId

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
      const [ transition, props ] = groupProps(this.props)

      return (
        <CSSTransition
          {...transition}
          {...props}
          {...(Target.attrs || {})}
          classNames={this.classNames}>
          <Target ref={(node) => { this.target = node }} {...props} />
        </CSSTransition>
      )
    }
  }
)

export default animated
