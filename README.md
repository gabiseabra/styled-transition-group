# Styled Transition Group

[![npm version](https://badge.fury.io/js/styled-transition-group.svg)](https://badge.fury.io/js/styled-transition-group)

Inspired by issue [#1036](https://github.com/styled-components/styled-components/issues/1036) of styled-components, this package exports a `styled` object for generating animations with react-transition-group's `CSSTransition`.

## Getting Started

Add `styled-transition-group` and it's peer dependencies to your package:
`styled-transition-group@1` is compatible with `styled-components` v2 - v3.
`styled-transition-group@2` is compatible with `styled-components` v4.

```shell
yarn add styled-components react-transition-group
yarn add styled-transition-group
```

## Usage

The `transition` object has the same interface as styled-component's `styled` object, except it wraps the target component in a `CSSTransition` component and passes down it's props.

### Basic

To style a transition state use an `&:{state}` selector. See [react-transition-group's docs](https://reactcommunity.org/react-transition-group/#CSSTransition-prop-classNames) for available transition states (State names are hyphenated).

[Live example on Stackblitz](https://stackblitz.com/edit/01-styled-transition-group?file=Fade.js)

```jsx
import transition from "styled-transition-group";

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
`;
```

### Attach transition props

Styled component's `attrs()` method can be used to attach transition props to a component. Props unrelated to CSSTransition are passed to the child component.

[Live example on Stackblitz](https://stackblitz.com/edit/02-styled-transition-group?file=Fade.js)

```jsx
import transition from "styled-transition-group";

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
`;
```

### Transition Group

Styled transitions can be used with `TransitionGroup`

[Live example on Stackblitz](https://stackblitz.com/edit/03-styled-transition-group?file=Fade.js)

### Selectors

Using `styled-transition-group`'s css helper, selectors can target the transition it's included in (`&`) or other transition components. It replaces the selectors with the actual `styled-transition-group` component's class names.

_Warning:_ Nesting doesn't work here. `&` targets the top level component regardless of nesting.

```jsx
import styled from "styled-components";
import transition, { css } from "styled-transition-group";

const Fade = transition.div` /* ... */ `;

const style = css`
  ${Fade}:enter & {
    color: green;
  }
  ${Fade}:exit & {
    color: red;
  }
`;

const Button = styled.div`
  ${style} /* ... */
`;
```

[Live example on Stackblitz](https://stackblitz.com/edit/04-styled-transition-group?file=Text.js)
