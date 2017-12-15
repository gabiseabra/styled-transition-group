Styled Transition Group
===

Inspired by issue [#1036](https://github.com/styled-components/styled-components/issues/1036) of styled-components, this package exports a `styled` object for generating animations with react-transition-group's `CSSTransition`.

Getting Started
---

Add `styled-transition-group` and it's peer dependencies to your package:

```shell
yarn add styled-components react-transition-group
yarn add styled-transition-groups
```

Usage
---

The `transition` object has the same interface as styled-component's `styled` object, except it wraps the target component in a `CSSTransition` component and passes down it's props.

### Basic

To style a transition state use an `&:{state}` selector. See [react-transition-group's docs](https://reactcommunity.org/react-transition-group/#CSSTransition-prop-classNames) for available transition states (State names are hyphenated).

[Live example on CodeSandbox](https://stackblitz.com/edit/01-styled-transition-group?file=index.js)

```jsx
import transition from "styled-transition-group"

const Fade = transition.div`
  &:enter { opacity: 0.01; }
  &:enter-active {
    opacity: 1;
    transition: opacity 1000ms ease-in;
  }
  &:exit { opacity: 1; }
  &:exit-active {
    opacity: 0.01;
    transition: opacity 800ms ease-in;
  }
`

render(
  <Fade in={"true"} timeout={1000}>
    Hello World
  </Fade>
)
```

### Attach transition props

Styled component's `attr()` method can be used to attach transition props to a component. Other props are passed to the child component.

[Live example on CodeSandbox](https://stackblitz.com/edit/02-styled-transition-group?file=index.js)

```jsx
import transition from "styled-transition-group"

const Fade = transition.div.attrs({
  unmountOnExit: true,
  timeout: 1000
})`
  &:enter { opacity: 0.01; }
  &:enter-active {
    opacity: 1;
    transition: opacity 1000ms ease-in;
  }
  &:exit { opacity: 1; }
  &:exit-active {
    opacity: 0.01;
    transition: opacity 800ms ease-in;
  }
`

render(
  <Fade in={"true"} id="foo">
    Hello World
  </Fade>
)
```

### Transition Group

Styled transitions can be used inside a `TransitionGroup` as normal.

[Live example on CodeSandbox](https://stackblitz.com/edit/03-styled-transition-group?file=index.js)

```jsx
import { TransitionGroup } from "react-transition-group"
import transition from "styled-transition-group"

const Animation = transition.div` /* ... */ `

render(
  <TransitionGroup>
    <Animation key="hello" in={"true"} id="foo">
      Hello
    </Animation>
    <Animation key="world" in={"true"} id="foo">
      World
    </Animation>
    {/* ... */}
  </TransitionGroup>
)
```
