# React Animated Cursor

A React functional component that replaces the native cursor with a custom animated [jawn](https://www.urbandictionary.com/define.php?term=Jawn). As this is a function component, hooks manage events, local state and RAF.

### The custom cursor is comprised of

- An inner dot (`cursorInner`)
- An outer, outlining circle (`cursorOuter`), with slight opacity based on the dot/primary color
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
      innerSize={8}
      outerSize={8}
      color='193, 11, 111'
      outerAlpha={0.2}
      innerScale={0.7}
      outerScale={5}
      clickables={[
        'a',
        'input[type="text"]',
        'input[type="email"]',
        'input[type="number"]',
        'input[type="submit"]',
        'input[type="image"]',
        'label[for]',
        'select',
        'textarea',
        'button',
        '.link'
      ]}
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

With `Next.js`, you can leverage a `Dynamic Imports` to set `ssr:false` for `AnimatedCursor`.
HOWEVER since v2.1.5, a normal import should do the trick.

**Next.js SSR Example, pre v2.1.5f**

```
import dynamic from 'next/dynamic'

const AnimatedCursor = dynamic(() => import('react-animated-cursor'), {
  ssr: false
});

// <AnimatedCursor/>
```

### Cursor Styling

Cursor styling is included within the component, using a simple dependency-free inline approach. Default properties use _es6 default parameters_, as `defaultProps`, [is slated for deprecation](https://github.com/reactjs/rfcs/blob/createlement-rfc/text/0000-create-element-changes.md).

## Options / Props

| Option          | Type   | Description                                       | Default       |
| --------------- | ------ | ------------------------------------------------- | ------------- |
| `color`         | string | rgb value                                         | `220, 90, 90` |
| `outerAlpha`    | number | amount of alpha transparency for outer cursor dot | `0.4`         |
| `innerSize`     | number | Size (px) of inner cursor dot                     | `8`           |
| `outerSize`     | number | Size (px) of outer cursor outline                 | `8`           |
| `innerScale`    | number | amount dot scales on click or link hover          | `0.7`         |
| `outerScale`    | number | amount outer dot scales on click or link hover    | `5`           |
| `trailingSpeed` | number | Outer dot's trailing speed                        | `8`           |
| `clickables`    | array  | Collection of selectors cursor that trigger cursor interaction | `['a', 'input[type="text"]', 'input[type="email"]', 'input[type="number"]', 'input[type="submit"]', 'input[type="image"]', 'label[for]', 'select', 'textarea', 'button', '.link']` |

## Mobile / Touch

`helpers/isDevice.js` uses UA sniffing to determine if on a common device so we can avoid rendering cursors

## Todo

- ~~Either remove on mobile, or provide touch events.~~
- ~~Separate click and hover scalings to provide a different scaling when clicking on links~~
- ~~Fix transform blur in Safari~~
- ~~Make clickables (cursor targets / selectors) a prop~~
- ~~Add PropType checks~~
- Open cursor styles as props
- Solution for impacting state during route changes
- Convert to TS

Have fun ya'll.
