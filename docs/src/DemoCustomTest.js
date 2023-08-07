import React from 'react'

const s = {
  section: {
    paddingBottom: '6em',
    width: '80%',
    maxWidth: '36em',
    margin: '0 auto 1em'
  }
}

export default function Content() {
  return (
    <section style={s.section}>
      <h3>Test custom Clickables</h3>
      <p>
        Here's a collection of additional elements to test custom behaviors:
      </p>
      <ul>
        <li>
          <div className="small">Class name ="small"</div>
        </li>
        <li>
          <div className="big">Class name ="big"</div>
        </li>
        <li>
          <div className="blue">Class name ="blue"</div>
        </li>
        <li>
          <div id="blueDonut">Id ="blueDonut"</div>
        </li>
      </ul>
    </section>
  )
}
