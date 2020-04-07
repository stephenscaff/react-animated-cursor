# React Animated Cursor

A React functional component that replaces the native cursor with a custom animated [jawn](https://www.urbandictionary.com/define.php?term=Jawn). As this is a function component, hooks manage events, local state and RAF.

### The custom cursor is comprised of
- An inner dot (`cursorDot`)
- An outer, outlining circle (`cursorOutline`), with slight opacity based on the dot/primary color
- A slight trailing animation of the outer outline
- An inversely scaling effect between the inner and outer cursor parts on click or link hover

Options exist for modifying the color and scaling of the cursor elements (see props/options below).

[Live Demo](https://stephenscaff.github.io/react-animated-cursor/)

### Install package from npm
`npm i react-animated-cursor`

### Instal Project Dependencies
`npm install`

### Build
`npm run build`

### Run Demo
`npm run demo:start`

### Build Demo
`npm run demo:build`

### Clean Demo
`npm run clean:demo`

## Demo

The demo is bundled with [`Parcel.js`](https://parceljs.org/) and served up at [http://localhost:1234/](http://localhost:1234/).

## Lib

The core component file is housed in `lib/`

## Dist

On build, `lib` populates `dist` with commonjs, es, umd versions of the component.

### Example Usage
```
import React from "react";
import AnimatedCursor from "react-animated-cursor"


export default function App() {
  return (
    <div className="App">
      <AnimatedCursor />
    </div>
  );
}
```


### Example Usage - with options
```
import React from "react";
import AnimatedCursor from "react-animated-cursor"

export default function App() {
  return (
    <div className="App">
    <AnimatedCursor
      dotSize={8}
      outlineSize={8}
      color='193, 11, 111'
      outlineAlpha={0.2},
      dotScale={0.7},
      outlineScale={5}
    />
    </div>
  );
}
```

If not using via npm install, then import from directory

### Example Usage - from lib
```
import React from "react";
import AnimatedCursor from "./AnimatedCursor";
```

### With SSR (Server Side Rendering)

The component obtains `window` HxW via `useState(window.innerWidth)` and `useState(window.innerHeight)`.
Since, `window` is unavailable for components rendering server side, you'll need to render `AnimatedCursor` client side or you'll snag an error.

With `Next.js`, you can leverage a `Dynamic Imports` to set `ssr:false` for `AnimatedCursor`.

**Next.js SSR Example**

```
import dynamic from 'next/dynamic'

const AnimatedCursor = dynamic(() => import('react-animated-cursor'), {
  ssr: false
});

// <AnimatedCursor/>
```

### Cursor Styling

Cursor styling is included within the component, using a simple dependency-free inline approach. Default properties use *es6 default parameters*, as `defaultProps`, [is slated for deprecation](https://github.com/reactjs/rfcs/blob/createlement-rfc/text/0000-create-element-changes.md).

## Options / Props

| Option | Type | Description | Default |
| --- | --- | --- | --- |
| `color` | string | rgb value |  `220, 90, 90` |
| `outlineAlpha` | number | amount of alpha transparency for cursor outline | `0.4` |
| `dotSize` | number | Size (px) of inner cursor dot | `8` |
| `outlineSize` | number | Size (px) of outer cursor outline | `8` |
| `dotScale` | number | amount dot scales on click or link hover | `0.7` |
| `outlineScale` | number | amount outline scales on click or link hover | `5` |


## Mobile
`lib/WhoDis.js` is a utility that detects for device based `navigator.userAgent` (:p).
If any of the common device `userAgent`'s match, we return out and render an empty frag.
Not the best solution of course, and had to add a navigator check so we don't fail in node env (as `navigator` is browser api)


## Todo
- ~~Either remove on mobile, or provide touch events.~~
- Separate click and hover scalings to provide a different scaling when clicking on links


Have fun ya'll.
