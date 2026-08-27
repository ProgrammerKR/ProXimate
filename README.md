# ProXimate

> Motion, engineered. A lightweight, composable animation toolkit for modern web applications.

ProXimate is a production-grade animation library engineered for the web. Built with a CSS-first architecture, it provides a comprehensive collection of animation primitives, prioritizing developer ergonomics, performance, and accessibility.

Unlike traditional animation libraries that ship massive monolithic stylesheets, ProXimate is built to be composable and fully tree-shakable. 

## Features

- **CSS-First Architecture:** Zero unnecessary JavaScript runtime overhead.
- **Tree-Shakable:** Only ship the animations you actually use.
- **Accessibility-First:** Built-in `prefers-reduced-motion` handling by default.
- **Framework-Friendly:** Dedicated `@proximate-css/react` integration, and highly compatible with Vue, Svelte, and vanilla JS.
- **Composable:** Control duration, delay, easing, and staggering with simple, chainable CSS utilities or JavaScript APIs.
- **Viewport Orchestration:** Built-in IntersectionObserver logic for seamless scroll reveals.
- **Performance:** Relies strictly on compositor-friendly properties (transform, opacity, filter).

## Installation

Install the core packages via npm, pnpm, or yarn:

```bash
npm install @proximate-css/css @proximate-css/core
```

For React environments:
```bash
npm install @proximate-css/react
```

## Quick Start

### CSS Only

Import the animations you need and apply the base `px-animate` class along with the specific animation class:

```html
<link rel="stylesheet" href="node_modules/@proximate-css/css/dist/proximate.min.css">

<div class="px-animate px-fade-in-up px-duration-fast px-delay-100">
  Hello, World!
</div>
```

### Vanilla JavaScript

Use the `@proximate-css/core` runtime to dynamically trigger animations and stagger elements:

```js
import { animate, stagger, reveal } from '@proximate-css/core';

// Single element animation
animate('.card', {
  animation: 'fade-in-up',
  duration: 600,
  easing: 'ease-out'
});

// Stagger a list of elements
stagger('.list-item', {
  animation: 'zoom-in',
  stagger: 100
});

// Animate on scroll
reveal('.reveal-box', {
  animation: 'fade-in',
  threshold: 0.2
});
```

### React Integration

Use the `<Motion>` polymorphic component for a first-class React experience:

```jsx
import { Motion } from '@proximate-css/react';

function App() {
  return (
    <Motion as="section" animation="fade-in-up" duration={500} reveal threshold={0.5}>
      <Card />
    </Motion>
  );
}
```

## Animation Catalogue

ProXimate organizes animations into meaningful families. The core library currently includes:

- **Entrance:** `fade-in`, `fade-in-up`, `zoom-in`
- **Attention:** `pulse`
- *(More expanding rapidly...)*

## Accessibility

ProXimate respects the user's OS-level motion preferences by default. When `@media (prefers-reduced-motion: reduce)` is detected, non-essential animations are gracefully bypassed to a 1ms duration to ensure events still fire without triggering vestibular discomfort.

You can configure this behavior globally in JS:

```js
import { configure } from '@proximate-css/core';

configure({
  reducedMotion: 'respect' // 'respect', 'always', 'never'
});
```

## Performance

We treat performance as a first-class feature. ProXimate strictly avoids expensive layout-triggering properties (like `top`, `margin`, or `height`) and leverages the GPU compositor via `transform` and `opacity`.

## Documentation

For full API references, configuration options, and the Interactive Explorer, please visit our [Documentation Site](#).

## Contributing

Please see our [CONTRIBUTING.md](./CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests.

## License

ProXimate is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
