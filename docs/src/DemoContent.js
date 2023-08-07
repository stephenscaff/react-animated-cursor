import React from 'react'

const s = {
  section: {
    paddingTop: '6em',
    width: '80%',
    maxWidth: '36em',
    margin: '0 auto 1em'
  },
  title: {
    marginBottom: '1em',
    fontSize: '3em',
    fontWeight: 800,
    textAlign: 'center',
    lineHeight: 1
  },
  pretitle: {
    textAlign: 'center'
  },
  subtitle: {
    textAlign: 'center'
  },
  sep: {
    border: 0,
    margin: '2em auto',
    height: 2,
    width: '3em',
    backgroundColor: 'rgba(255, 255, 255, 0.5)'
  }
}

export default function Content() {
  return (
    <section style={s.section}>
      <p style={s.pretitle}>Demos</p>
      <h1 style={s.title}>React Animated Cursor</h1>
      <p style={s.subtitle}>
        A component by <a href="http://stephenscaff.com/">Stephen Scaff</a>
      </p>
      <hr style={s.sep} />
      <p>
        React animated cursor is a React component that creates a custom cursor
        experience. You can craft a variety of cursor types, and animate
        movement, hover and clicking properties.
      </p>
      <p>
        Hover over these <a>links</a> and see how that animated cursor does it's
        thing. Kinda nifty, right? Not applicable to most projects, but a nice
        move for more interactive/immersive stuff... if you're into that kinda
        thing? Here's another <a href="">link to nowhere.</a>
      </p>
      <p>Essentially, the cursor consists:</p>
      <ul>
        <li>
          An inner dot (<code>cursorInner</code>)
        </li>
        <li>
          An outer, outlining circle (<code>cursorOuter</code>), with slight
          opacity based on the dot/primary color
        </li>
        <li>
          An inversely scaling effect between the inner and outer cursor parts
          on click or link hover
        </li>
      </ul>
      <p>
        Style props exist for in the inner and outer cursor allow you to easily
        create unique cursor types. Play with <a>css variables</a> to influence
        the cursor, cursor outline size, and amount of scale on target hover.
      </p>

      <h3>Demo Cursors</h3>
      <p>Here's a few cursor types you can create to test</p>
      <ul>
        <li>
          <a href="?cursor=default">Default</a>
        </li>
        <li>
          <a href="?cursor=donut">Donut</a>
        </li>
        <li>
          <a href="?cursor=blendmode">Blendmode</a>
        </li>
        <li>
          <a href="?cursor=custom">Custom</a>
        </li>
      </ul>

      <h3>Test Clickables</h3>
      <p>Here's a collection of test clickable elements to hover over:</p>
      <ul>
        <li>
          <a>Basic Link Tag</a>
        </li>
        <li>
          <button>Buttons</button>
        </li>
        <li>
          <input type="submit" value="Submit" />
        </li>
        <li>
          <select>
            <option>Select</option>
          </select>
        </li>
        <li>
          <input
            type="image"
            id="image-input"
            alt="Image Input"
            src="https://cdn2.iconfinder.com/data/icons/button-v1/30/25-512.png"
            width="30px"
          />
        </li>
        <li>
          <label htmlFor="label_for">Label For</label>
          <input type="radio" name="gender" id="label_for" value="label_for" />
        </li>
        <li>
          <div className="link">Class name ="link"</div>
        </li>
      </ul>
    </section>
  )
}
