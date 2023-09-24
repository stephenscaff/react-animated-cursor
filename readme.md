# React Animated Cursor

A React component that replaces the native cursor with a custom animated [jawn](https://www.urbandictionary.com/define.php?term=Jawn). Available options and props allow you to easily craft a unique cursor experience.

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

[Live Demo→](https://stephenscaff.github.io/react-animated-cursor/)

<br/>

## 🎯 Quickstart

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

### Example Usage - with simple options and custom config for one class

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
        '.link',
        {
          target: '.custom',
          options: {
            innerSize: 12,
            outerSize: 12,
            color: '255, 255, 255',
            outerAlpha: 0.3,
            innerScale: 0.7,
            outerScale: 5
          }
        }
      ]}
    />
    </div>
  );
}
```

### Client Components, Next.js, SSR

In previous versions of the component, integration with Next's SSR environment required using a `Dynamic Import`.
However, as of version `2.10.1`, **you _should_ be good to go with a simple `import`.**

Relevant updates:

- Included module directive `'use client'` to indicate a client side component.
- Updated `useEventListener` hook with `window` checks.
- Wrapped the `document` use in a check.

However, if you do run into any issues, you could try including with Dynamic Import.

**Next's Dynamic Import**

```
'use client'; // indicates Client Component

// Import with next's dynamic import
import dynamic from 'next/dynamic';

const AnimatedCursor = dynamic(() => import('react-animated-cursor'), {
    ssr: false,
});

<AnimatedCursor/>
```

<br/>

## 🧬 Options

<!-- prettier-ignore -->
| Option | Type | Description      | Default |
| ----   | ---- | -------- | -------|
| `clickables`    | array  | Collection of selectors cursor that trigger cursor interaction or object with single target and possibly the rest of the options listed below | `['a', 'input[type="text"]', 'input[type="email"]', 'input[type="number"]', 'input[type="submit"]', 'input[type="image"]', 'label[for]', 'select', 'textarea', 'button', '.link']` |
| `color`      | string | rgb value  | `220, 90, 90` |
| `innerScale` | number | amount dot scales on click or link hover | `0.7` |
| `innerSize`  | number | Size (px) of inner cursor dot | `8` |
| `innerStyle` | object | provides custom styles / css to inner cursor  | `null` |
| `outerAlpha` | number | amount of alpha transparency for outer cursor dot    | `0.4`  |
| `outerScale` | number | amount outer dot scales on click or link hover  | `5`  |
| `outerSize`  | number | Size (px) of outer cursor outline  | `8` |
| `outerStyle` | object | provides custom styles / css to outer cursor  | `null` |
| `showSystemCursor` | boolean | Show system/brower cursor | `false` |
| `trailingSpeed` | number | Outer dot's trailing speed | `8` |

<br/>

## 🎨 Cursor Types

You can use the `innerStyle` and `outerStyle` props to provide custom styles and create a variery of custom cursor types. Additionally, you can pass custom styles and css vars to create unique cursors or update style based on events.

### Dynamic Styles

Use CSS variables with `innerStyle` and `outerStyle` props to create dynamic styles that you can easily update.
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
  outerStyle={{
    border: '3px solid var(--cursor-color)'
  }}
  innerStyle={{
    backgroundColor: 'var(--cursor-color)'
  }}
/>
```

### Donut Cursor

A donut style cursor basically resembles a donut. You can easily create on by applying using the `outerStyle` props to apply an outer border

```
<AnimatedCursor
  innerSize={8}
  outerSize={35}
  innerScale={1}
  outerScale={2}
  outerAlpha={0}
  hasBlendMode={true}
  innerStyle={{
    backgroundColor: 'var(--cursor-color)'
  }}
  outerStyle={{
    border: '3px solid var(--cursor-color)'
  }}
/>
```

[Donut Demo→](https://stephenscaff.github.io/react-animated-cursor?cursor=donut)

<br/>

### Blend Mode Cursor

You can use CSS mix-blend-mode with the style props to create an intersting cursor effect on hover that inverts the content's color. Works best with white / black cursors.

```
<AnimatedCursor
  color="#fff"
  innerSize={8}
  outerSize={35}
  innerScale={1}
  outerScale={1.7}
  outerAlpha={0}
  outerStyle={{
    mixBlendMode: 'exclusion'
  }}
/>
```

[Blend Mode Demo→](https://stephenscaff.github.io/react-animated-cursor?cursor=blendmode)

<br/>

## 📓 Notes

### Mobile / Touch

`helpers/isDevice.js` uses UA sniffing to determine if on a common device so we can avoid rendering cursors. Yes... I know, there are other and probably better ways to handle this. Whatevers.

<br/>

## 📅 To Dos

- ~~Either remove on mobile, or provide touch events.~~
- ~~Separate click and hover scalings to provide a different scaling when clicking on links/clickables~~
- ~~Fix transform blur in Safari, which may mean migrating from `scale` to a `width` &`height` update~~ 4/4/23
- ~~Make clickables (cursor targets / selectors) a prop~~
- ~~Add PropType checks~~
- ~~Open cursor styles as props~~
- ~~Add ability to maintain system cursor for the squeamish~~ 4/4/23
- ~~Migrate to TS~~
- ~~Allow for different behavior based on the element hovered~~
- Options to control cursor transition speed and bezier
- Solution for impacting state during route changes

- Add some proper tests

<br/>

Have fun ya'll.
