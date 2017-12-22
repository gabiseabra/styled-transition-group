/* eslint-env mocha */
import React from "react"
import { mount } from "enzyme"
import { CSSTransition } from "react-transition-group"
import AnimatedComponent from "../src/AnimatedComponent"
import transition from "../src"

const Tag = () => <div>Test</div>

describe("transition", () => {
  it("wraps tag in AnimatedComponent", () => {
    const Component = transition(Tag)``
    const context = mount(<Component timeout={100} />)
    const parent = context.find(AnimatedComponent)
    const cssTransition = parent.find(CSSTransition)
    const component = cssTransition.find(Tag)
    parent.should.have.length(1)
    cssTransition.should.have.length(1)
    component.should.have.length(1)
  })
  it("passes props to child component", () => {
    const Component = transition(Tag)``
    const context = mount(<Component timeout={100} foo bar />)
    context.find(CSSTransition).props().should.have.keys("timeout", "classNames", "children")
    context.find(Tag).props().should.have.keys("foo", "bar", "className")
  })
  it("passes innerRef to child component")
  it("omits invalid html props from tags")
})
