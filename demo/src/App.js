import React from 'react'
import AnimatedCursor from '../../lib'
import DemoContent from './DemoContent'
import './demo-styles.css'

export default function App() {
  return (
    <div className="App">
      <AnimatedCursor
        //color="255,255,255"
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
      <DemoContent />
    </div>
  )
}
