import React, { Component } from "react"
import { storiesOf } from "@storybook/react"
import animated from "../src"

const transition = {
  timeout: 500
}

const Button = animated.div.attrs({ transition })`
  border: 2px black solid;
  margin: 20px;

  &:enter {
    background: wheat;
  }

  &:exit {
    background: ${props => props.color};
  }
`

class Test extends Component {
  state = {
    active: false
  }

  onClick = () => this.setState({ active: !this.state.active })

  render() {
    return (
      <Button
        color="#afafaf"
        in={this.state.active}
        onClick={this.onClick}>
        Click Me
      </Button>
    )
  }
}

storiesOf("Examples", module)
  .add("to Storybook", () => <Test />)
