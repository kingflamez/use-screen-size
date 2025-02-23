# use-screen-size

> This helps you write conditional code based on screen size, or get the screen size value

[![NPM](https://img.shields.io/npm/v/use-screen-size.svg)](https://www.npmjs.com/package/use-screen-size)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![NPM](https://img.shields.io/npm/dm/use-screen-size.svg)](https://www.npmjs.com/package/use-screen-size)
![Total Downloads](https://img.shields.io/npm/dt/use-screen-size)



## Install

```bash
npm install --save use-screen-size
```

```bash
yarn add use-screen-size
```

## Example

> This shows a quick example of displaying your screen width, screen height and current screen mode

```tsx
import React from 'react';

import { useScreenSize } from 'use-screen-size';

const App = () => {
  const size = useScreenSize();

  return (
    <>
      <h1>
        {size.width}px / {size.height}px
      </h1>
      <h1>{size.screen}</h1>
    </>
  );
};
```

## Helpful Methods

1. `size.screen` is used to get the quick current size mode of the screen

| Name        | Size    | property |
| ----------- | ------- | -------- |
| Extra small | <576px  | xs       |
| Small       | ≥576px  | s        |
| Medium      | ≥768px  | m        |
| Large       | ≥992px  | l        |
| Large       | ≥1200px | xl       |

2. `size.width` its is used to get the width of the screen in pixels

3. `size.height` its is used to get the height of the screen in pixels

## Advanced Example

> This shows an advanced example of running conditional actions based on the screen size

```tsx
import React, { useState, useEffect } from 'react';

import { BreakPoint, useScreenSize } from 'use-screen-size';

const App = () => {
  const size = useScreenSize();
  const [color, setColor] = useState('');
  const [screenSize, setScreenSize] = useState('');

  useEffect(() => {
    if (size.screen == BreakPoint.xs) {
      setColor('red');
      setScreenSize('Extra Small Screen eg Mobile Phones(Portrait Mode)');
    } else if (size.screen === BreakPoint.s) {
      setColor('blue');
      setScreenSize('Small Screen eg Mobile Phones(Landscape Mode)');
    } else if (size.screen === BreakPoint.m) {
      setColor('orange');
      setScreenSize('Medium Screen eg Tablet');
    } else if (size.screen === BreakPoint.l) {
      setColor('yellowgreen');
      setScreenSize('Large Screen eg Laptop, PC');
    } else if (size.screen === BreakPoint.xl) {
      setColor('darkmagenta');
      setScreenSize('Extra Large Screen eg Laptop, PC');
    }
  }, [size]);

  return (
    <>
      <h1>
        {size.width}px / {size.height}px
      </h1>
      <h1 style={{ color }}>
        {size.screen.toUpperCase()} {screenSize}
      </h1>
    </>
  );
};
```

## Configuration Options

The hook accepts the following configuration options:

| Option        | Type               | Default                                              | Description                                      |
| ------------- | ------------------ | ---------------------------------------------------- | ------------------------------------------------ |
| `breakpoints` | `BreakPointConfig` | `{ xs: 576, s: 768, m: 992, l: 1200, xl: Infinity }` | Define custom screen size breakpoints.           |
| `debounceMs`  | `number`           | `250`                                                | Debounce time in milliseconds for resize events. |

Example:

```tsx
const breakpoints = {
  xs: 500,
  s: 700,
  m: 900,
  l: 1100,
  xl: Infinity
}

const size = useScreenSize(breakpoints, 300) // Custom breakpoints and debounce time
```

## License

Follow on Twitter [@__wole__](https://twitter.com/__wole__)

MIT © [kingflamez](https://github.com/kingflamez)
