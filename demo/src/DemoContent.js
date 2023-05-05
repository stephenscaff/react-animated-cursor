import React from 'react'

const styles = {
  section: {
    padding: '4em 0'
  },
  title: {
    marginBottom: '0.7em',
    fontSize: '3em',
    fontWeight: 800,
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
    <section style={styles.section}>
      <p style={styles.subtitle}>
        <a href="https://github.com/stephenscaff/react-animated-cursor">Repo</a>{' '}
        |{' '}
        <a href="https://github.com/stephenscaff/react-animated-cursor/blob/master/readme.md">
          Docs
        </a>
      </p>
      <h1 style={styles.title}>React Animated Cursor</h1>
      <p style={styles.subtitle}>
        A component by <a href="http://stephenscaff.com/">Stephen Scaff</a>
      </p>
      <hr style={styles.sep} />
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

      <h3>Clickables</h3>
      <p>Test of clickable elements:</p>
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

      <h3>Demo Cursors</h3>
      <p>A few options to checkout</p>
      <ul>
        <li>
          <a href="/?cursor=default">Default</a>
        </li>
        <li>
          <a href="/?cursor=donut">Donut</a>
        </li>
        <li>
          <a href="/?cursor=blendmode">Blendmode</a>
        </li>
      </ul>
    </section>
  )
}
