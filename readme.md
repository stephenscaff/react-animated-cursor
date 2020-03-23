# React Animated Cursor

A React functional component that replaces the native cursor with a custom animated [https://www.urbandictionary.com/define.php?term=Jawn](jawn). As this is a function component, hooks manage events, local state and RAF.

### The cursor is comprised of
- An inner dot,
- An outer outline circle (with slight opacity based on the dot/primary color)
- A slight trailing animation of the outer dot
- An inversely scaling effect between the inner and outer parts when clicking or hovering over a link

Options exist for modifying the color and scaling of the cursor elements (see props/options below)

[Live Example](https://0vvpf.csb.app/)


### Install
`npm install`

### Build

`npm run build`


### Run Demo

`npm run demo`

Uses `[Parcel.js](https://parceljs.org/)` bundle the demo and serve it at [http://localhost:1234/](http://localhost:1234/).



### Example Usage
```
import React from "react";
import AnimatedCursor from "./AnimatedCursor";

export default function App() {
  return (
    <div className="App">
      <AnimatedCursor />
    </div>
  );
}
```


### Example Usage
```
import React from "react";
import AnimatedCursor from "./AnimatedCursor";

export default function App() {
  return (
    <div className="App">
    <AnimatedCursor
      dotSize={8}
      outlineSize={8}
      color='193, 11, 111'
      outlineAlpha = {0.2}
    />
    </div>
  );
}
```


### Cursor Styling

Cursor styling is included within the component, using a simple dependency free inline approach. Default properties use *es6 default parameters*, as `defaultProps`, [https://github.com/reactjs/rfcs/blob/createlement-rfc/text/0000-create-element-changes.md](is slated for deprecation).

## Options / Props

| Option | Type | Description | Default |
| --- | --- | --- | --- |
| `color` | string | rgb value |  `220, 90, 90` |
| `outlineAlpha` | number | amount of alpha transparency for cursor outline | `0.4` |
| `dotSize` | number | Size (px) of inner cursor dot | `8` |
| `outlineSize` | number | Size (px) of outer cursor outline | `8` |
| `outlineScale` | number | amount outline scales on click or link hover | `5` |
| `dotScale` | number | amount dot scales on click or link hover | `0.7` |

## Todo
- Either remove on mobile, or provide touch events.
- Separate click and hover scalings to provide a different scaling when clicking on links


Have fun.
