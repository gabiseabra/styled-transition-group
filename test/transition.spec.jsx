/* eslint-env mocha */
import React from "react"
import { mount } from "enzyme"
import { css } from "styled-components"
import { CSSTransition } from "react-transition-group"
import transition from "../dist/bundle"

const Tag = () => <div>Test</div>

describe("transition", () => {
  it("wraps tag in CSSTransition", () => {
    const Component = transition(Tag)``
    const context = mount(<Component timeout={100} />)
    const cssTransition = context.find(CSSTransition)
    const component = cssTransition.find(Tag)
    cssTransition.should.have.length(1)
    component.should.have.length(1)
  })

  it("passes props to child component", () => {
    const Component = transition(Tag)``
    const context = mount(<Component timeout={100} foo bar />)
    context.find(CSSTransition).props().should.include.keys("timeout", "classNames")
    context.find(Tag).props().should.include.keys("foo", "bar", "className")
  })

  it("passes innerRef to child component", () => {
    const Component = transition.div``
    class Wrapper extends React.Component {
      render() {
        return <Component timeout={100} innerRef={(node) => { this.innerRef = node }} />
      }
    }
    const context = mount(<Wrapper />)
    const ref = context.find(Wrapper).instance().innerRef
    ref.should.equal(context.find("div").getDOMNode())
  })

  it("omits invalid html props from tags", () => {
    const Component = transition.div``
    const context = mount(<Component timeout={100} foo bar />)
    context.find(CSSTransition).props().should.include.keys("timeout", "classNames", "foo", "bar")
    context.find("div").props().should.not.include.keys("foo", "bar")
  })

  it("can be extended", () => {
    const Component = transition.div`foo`
    const Wrapper = Component.extend`bar`
    const context = mount(<Wrapper timeout={100} />)
    context.find(CSSTransition).should.have.length(1)
    context.find("div").should.have.length(1)
    Wrapper.Target.componentStyle.rules.should.include("foo", "bar")
  })

  it("omits transition attrs", () => {
    const Component = transition(Tag).attrs({
      unmountOnExit: true,
      timeout: 100,
      onExit: () => "..."
    })``
    const context = mount(<Component in />)

    context.find(CSSTransition).props().should.include.keys("timeout", "unmountOnExit", "onExit")
    context.find(Tag).props().should.not.include.keys("in", "unmountOnExit", "onExit")
  })

  it("works with css()", () => {
    const Component = transition.div(css`foo: bar`)
    const context = mount(<Component timeout={100} />)
    context.find(CSSTransition).should.have.length(1)
    context.find("div").should.have.length(1)
    Component.Target.componentStyle.rules.should.include("foo: bar")
  })
})
