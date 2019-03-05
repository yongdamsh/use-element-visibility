# useElementVisibility Hook
Intersection Observer API + React Hooks

[![NPM](https://img.shields.io/npm/v/use-element-visibility.svg)](https://www.npmjs.com/package/use-element-visibility)

[English Version](README.md)

## Installation

최신 버전을 설치합니다.

```sh
npm install --save use-element-visibility
```

## Usage

### Step.1 감지 대상과 옵션값 전달 

아래 소스코드와 같이 2가지 인자를 전달해 hook을 실행합니다.
1. 노출되는 영역을 변화를 감지하고자 하는 element([React refs](https://reactjs.org/docs/hooks-reference.html#useref))의 목록
2. [IntersectionObserver options](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_options)

```jsx
import useElementVisibility from 'use-element-visibility'

function ScrollView() {
  const topObserver = React.useRef();
  const middleObserver = React.useRef();
  const bottomObserver = React.useRef();

  // 1. 노출되는 영역을 변화를 감지하고자 하는 element(ref)의 목록
  const targets = [topObserver, middleObserver, bottomObserver]

  // 2. IntersectionObserver 옵션
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 1.0 // 배열도 가능 [0, 0.5, 1.0]
  }

  const [topVisibility, middleVisibility, bottomVisibility] = useElementVisibility(targets, options)

  return (
    // Step.2 참고
  )
}
```

### Step.2 ref를 HTML에 binding

Step.1에서 생성한 ref 목록을 렌더링되는 태그의 `ref` 속성으로 연결합니다.

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

### Step.3 반환되는 visibility 정보 활용

`useElementVisibility` hook은 `targets` 배열과 동일한 순서로 각 element의 visibility 정보를 반환합니다. 

> visibility 타입은 [IntersectionObserverEntry](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry)와 동일합니다.

이제 구현 목적에 따라 `intersectionRatio`, `isIntersecting`과 같은 필드를 활용해 동적인 UI를 구현합니다.

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

아래 명령어로 페이지를 확인합니다.
```sh
npm run example:infinite-scroll
```

### Lazy Image Loading

추가 예정

### Navigation Tab Bar

추가 예정


## Browser Compatibility

작성 중...

## useElementVisibility API Reference

작성 중...