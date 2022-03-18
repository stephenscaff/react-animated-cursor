import React from 'react'
import AnimatedCursor from '../../lib'
import DemoContent from './DemoContent'
import './demo-styles.css'

export default function App() {
  return (
    <div className="App">
      <AnimatedCursor />
      <DemoContent 
      cursorStyles={{
          border: "9px solid pink"
      }}
    />
    </div>
  )
}
