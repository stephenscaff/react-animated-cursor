# React Animated Cursor

A React functional component that replaces the native cursor with a custom animated [jawn](https://www.urbandictionary.com/define.php?term=Jawn). As this is a function component, hooks manage events, local state and RAF.

## Contents

1. [📌 Features](#-features)
2. [🎯 Quickstart](#-quickstart)
3. [🤖 Commands](#-commands)
4. [🧬 Options](#-options)
5. [🕹️ Usage](#-usage)
6. [🎨 Cursor Types](#-cursor-types)
7. [📓 Notes](#-notes)
8. [📅 To Dos](#-to-dos)

<br/>

## 📌 Features

### The custom cursor is comprised of

- An inner dot (`cursorInner`)
- An outer, outlining circle (`cursorOuter`), with slight opacity based on the dot/primary color
- A slight trailing animation of the outer outline
- An inversely scaling effect between the inner and outer cursor parts on click or link hover

Options exist for modifying the color and scaling of the cursor elements (see props/options below). Style props for in the inner and outer cursor allow you to easily create unique cursor types.

[Live Demo](https://stephenscaff.github.io/react-animated-cursor/)

## 🎯 Quickstart

<br/>

### Install package from npm

`npm i react-animated-cursor`

### Add to you project

Add to a global location, like `_app.js`

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

<br>

## 🤖 Commands

**Install** `npm i react-animated-cursor` <br/>
**Build**: `npm run build` <br/>
**Dev**: `npm run dev` <br/>
**Demo Run**: `npm run demo:start` <br/>
**Demo Build**: `npm run demo:build` <br/>
**Demo Clean**: `npm run demo:clean` <br/>

### Demo

The demo is bundled with [`Parcel.js`](https://parceljs.org/) and served up at [http://localhost:1234/](http://localhost:1234/).

### Dist

On build, `lib` populates `dist` with commonjs, es, umd versions of the component.

<br/>

## 🕹️ Usage

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

<br/>

## 🧬 Options

| Option          | Type   | Description                                                    | Default                                                                                                                                                                            |
| --------------- | ------ | -------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `color`         | string | rgb value                                                      | `220, 90, 90`                                                                                                                                                                      |
| `outerAlpha`    | number | amount of alpha transparency for outer cursor dot              | `0.4`                                                                                                                                                                              |
| `innerSize`     | number | Size (px) of inner cursor dot                                  | `8`                                                                                                                                                                                |
| `outerSize`     | number | Size (px) of outer cursor outline                              | `8`                                                                                                                                                                                |
| `innerScale`    | number | amount dot scales on click or link hover                       | `0.7`                                                                                                                                                                              |
| `outerScale`    | number | amount outer dot scales on click or link hover                 | `5`                                                                                                                                                                                |
| `innerStyle`    | object | provides custom styles / css to inner cursor                   | `null`                                                                                                                                                                             |
| `outerStyle`    | object | provides custom styles / css to outer cursor                   | `null`                                                                                                                                                                             |
| `trailingSpeed` | number | Outer dot's trailing speed                                     | `8`                                                                                                                                                                                |
| `clickables`    | array  | Collection of selectors cursor that trigger cursor interaction | `['a', 'input[type="text"]', 'input[type="email"]', 'input[type="number"]', 'input[type="submit"]', 'input[type="image"]', 'label[for]', 'select', 'textarea', 'button', '.link']` |

<br/>

## 🎨 Cursor Types

You can use the `innerStyle` and `outerStyle` props to provide custom styles and create a variery of custom cursor types. For example:

### Donut Cursor

A donut style cursor basically resembles a donut. You can easily create on by applying using the `outerStyle` props to apply an outer border

```
<AnimatedCursor
  color="255,255,255"
  innerSize={8}
  outerSize={35}
  innerScale={1}
  outerScale={1.7}
  outerAlpha={0}
  outerStyle={{
    border: '3px solid #fff'
  }}
/>
```

### Dynamic Styles

Use CSS Vars with `innerStyle` and `outerStyle` props to create dynamic styles values that you can easily update.
For example, perhaps you have a light and dark mode experience and what your cursor to also adapt it's colors.

**CSS Vars**

```
html {
  --cursor-color: #333
}

html.dark-mode {
  --cursor-color: #fff
}
```

**Pass CSS Var as Style Props**

```
<AnimatedCursor
  innerSize={8}
  outerSize={35}
  innerScale={1}
  outerScale={1.7}
  outerAlpha={0}
  hasBlendMode={true}
  outerStyle={{
    border: '3px solid var(--cursor-color)'
  }}
  innerStyle={{
    backgroundColor: 'var(--cursor-color)'
  }}
/>
```

### BlendMode Cursor

You can use CSS mix-blend-mode with the style props to create an intersting cursor effect on hover tha inverts the content's color. Works best with white / black cursors.

```
<AnimatedCursor
  color="#fff"
  innerSize={8}
  outerSize={35}
  innerScale={1}
  outerScale={1.7}
  outerAlpha={0}
  hasBlendMode={true}
  outerStyle={{
    mixBlendMode: 'exclusion'
  }}
/>
```

<br/>

## 📓 Notes

### Mobile / Touch

`helpers/isDevice.js` uses UA sniffing to determine if on a common device so we can avoid rendering cursors
<br/>

## 📅 To Dos

- ~~Either remove on mobile, or provide touch events.~~
- ~~Separate click and hover scalings to provide a different scaling when clicking on links~~
- ~~Fix transform blur in Safari~~
- ~~Make clickables (cursor targets / selectors) a prop~~
- ~~Add PropType checks~~
- ~~Add PropType checks~~
- ~~Open cursor styles as props~~
- Solution for impacting state during route changes
- Convert to TS

Have fun ya'll.
