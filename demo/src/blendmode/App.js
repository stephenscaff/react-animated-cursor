import React from 'react'
import AnimatedCursor from '../../../lib'
import DemoContent from '../DemoContent'
import '../demo-styles.css'

export default function App() {
  return (
    <div className="App">
      <AnimatedCursor
        color="255,255,255"
        innerSize={8}
        outerSize={35}
        innerScale={1}
        outerScale={2}
        outerAlpha={1}
        hasBlendMode={true}
        outerStyle={{
          mixBlendMode: 'exclusion'
        }}
        innerStyle={{
          backgroundColor: 'var(--cursor-color)',
          mixBlendMode: 'exclusion'
        }}
      />
      <DemoContent />
    </div>
  )
}
