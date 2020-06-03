import React from "react";


const styles = {
  section: {
    padding: "4em 0",
  },
  title: {
    marginBottom: '0.7em',
    fontSize: '3em',
    fontWeight: 800,
    textAlign: 'center'
  },
  sep: {
    border: 0,
    margin: '0 auto 2em',
    height: 2,
    width: '3em',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  }
}

export default function Content() {
  return (
    <section style={styles.section}>
      <h1 style={styles.title}>
        Animated Cursor <br />
        React Component
      </h1>
      <hr style={styles.sep} />
      <p>
        An animated cursor component made as a <a>Functional Component</a>,
        using <a>React hooks</a> like <a>useEffect</a> to handle event
        listeners, local state, an <a>RequestAnimationFrame</a> management.
      </p>
      <p>
        Hover over these <a>links</a> and see how that animated cursor does it's
        thing. Kinda nifty, right? Not right for most things, but a nice move
        for more interactive-type projects. Here's another{" "}
        <a href="">link to nowhere.</a>
      </p>
      <p>
        Play with the <a>css variables</a> to influence the cursor, cursor
        outline size, and amount of scale on target hover. I suppose those could
        all be <a>props</a> with some. Click in the margin to check click
        animation.
      </p>
      <p>
        There's probably a better way to manage these kind of events, but this
        was the best I could come up with. Recently started mucking more with
        React cause I'm down with the simplicity of Functional Components and
        Hooks. And if you read the docs, the future ain't class components. So,
        best get on them functions.
      </p>
      <h3>Clickables</h3>
      <p>Let's do a text of all clickable elements:</p>
      <ul>
      <li><a>Basic Link Tag</a></li>
      <li><button>Buttons</button></li>
      <li><input type="submit" value="Submit"/></li>
      <li><select><option>Select</option></select></li>
      <li><input type="image" id="image-input" alt="Image Input"
       src="https://cdn2.iconfinder.com/data/icons/button-v1/30/25-512.png" width="30px"/></li>
       <li><label htmlFor="label_for">Label For</label><input type="radio" name="gender" id="label_for" value="label_for"/></li>
       <li><div className="link">class name ="link"</div></li>
      </ul>
    </section>
  );
}
