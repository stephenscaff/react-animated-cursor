import { React, useState, useEffect } from 'react'
import AnimatedCursor from '../../lib'
import DemoContent from './DemoContent'
import './demo-styles.css'

export default function App() {
  const [state, setState] = useState('donut')
  const searchParams = new URLSearchParams(document.location.search)
  const cursorParam = searchParams.get('cursor')

  useEffect(() => {
    if (cursorParam) setState(cursorParam)
  }, [cursorParam])

  return (
    <div className="App">
      {state === 'default' && <AnimatedCursor />}
      {state === 'donut' && (
        <AnimatedCursor
          innerSize={8}
          outerSize={35}
          innerScale={1}
          outerScale={2}
          outerAlpha={0}
          hasBlendMode={true}
          outerStyle={{
            border: '3px solid var(--cursor-color)'
          }}
          innerStyle={{
            backgroundColor: 'var(--cursor-color)'
          }}
        />
      )}
      {state === 'blendmode' && (
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
      )}
      <DemoContent />
    </div>
  )
}
