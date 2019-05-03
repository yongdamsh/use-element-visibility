# useElementVisibility Hook
Intersection Observer API + React Hooks

[![NPM](https://img.shields.io/npm/v/use-element-visibility.svg)](https://www.npmjs.com/package/use-element-visibility)

# NOTES
- This project is still in the implementation phase and breaking changes will occur.
- The latest version (v0.2.1) has a critical bug and is deprecated.


## Installation

To install the latest version:
```sh
npm install --save use-element-visibility
```


## Usage

### Step.1 Initialize with Targets and Options

Execute the hook by passing two arguments like the source code below.
1. List of elements ([React refs](https://reactjs.org/docs/hooks-reference.html#useref)) that want to detect changes in exposed areas
2. [IntersectionObserver options](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_options)

```jsx
import useElementVisibility from 'use-element-visibility'

function ScrollView() {
  const topObserver = React.useRef();
  const middleObserver = React.useRef();
  const bottomObserver = React.useRef();

  // 1. List of elements(refs) to observe the intersection changes
  const targets = [topObserver, middleObserver, bottomObserver]

  // 2. IntersectionObserver Options
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 1.0 // Also can be an array like [0, 0.5, 1.0]
  }

  const [topVisibility, middleVisibility, bottomVisibility] = useElementVisibility(targets, options)

  return (
    // Refer to Step.2
  )
}
```

### Step.2 Binding ref to HTML

Connect the ref list created in Step.1 to the `ref` attribute of the rendered tag.

```jsx
const targets = [topObserver, middleObserver, bottomObserver]

function ScrollView() {
  return (
    <main>
      <section ref={topObserver}>Top</section>
      <section ref={middleObserver}>Middle</section>
      <section ref={bottomObserver}>Bottom</section>
    </main>
  )
}
```

### Step.3 Use the visibility information returned

The `useElementVisibility` hook returns visibility information for each element in the same order as the `targets` array.

> The visibility type is the same as [IntersectionObserverEntry](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry).

Now, for implementation purposes, we implement dynamic UIs using fields like `intersectionRatio` and `isIntersecting`.


```jsx
function ScrollView() {
  const [topVisibility, middleVisibility, bottomVisibility] = useElementVisibility(targets, options)
  const getColor = ratio => ratio === 1 ? 'red' : 'black'
  const getStyle = ratio => ({ color: getColor(ratio) })

  return (
    <main>
      <section ref={topObserver} style={getStyle(topVisibility.intersectionRatio)}>Top</section>
      <section ref={middleObserver} style={getStyle(middleVisibility.intersectionRatio)}>Middle</section>
      <section ref={bottomObserver} style={getStyle(bottomVisibility.intersectionRatio)}>Bottom</section>
    </main>
  )
}
```


## Examples

### [Infinite Scroll](/examples/infinite-scroll)

To run the demo page:
```sh
npm run example:infinite-scroll
```

### Lazy Image Loading

WIP

### Navigation Tab Bar

WIP


## Browser Compatibility

WIP

## useElementVisibility API Reference

WIP
