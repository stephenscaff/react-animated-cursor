import { React, useState, useEffect } from 'react'
import AnimatedCursor from '../../lib'
import DemoContent from './DemoContent'
import DemoCustomTest from './DemoCustomTest'
import DemoHeader from './DemoHeader'
import DemoFooter from './DemoFooter'
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
          showSystemCursor={false}
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
      {state === 'custom' && (
        <AnimatedCursor
          clickables={[
            {
              target: '.small',
              innerScale: 3,
              outerScale: 1
            },
            {
              target: '.big',
              innerScale: 9,
              outerScale: 7
            },
            {
              target: '.blue',
              color: 'blue',
              innerStyle: {
                backgroundColor: 'blue'
              },
              outerStyle: {
                backgroundColor: 'rgb(0,0,255,0.4)'
              }
            },
            {
              target: '#blueDonut',
              innerSize: 8,
              outerSize: 35,
              innerScale: 1,
              outerScale: 2,
              outerAlpha: 0,
              showSystemCursor: true,
              hasBlendMode: true,
              outerStyle: {
                border: '3px solid blue'
              },
              innerStyle: {
                backgroundColor: 'blue'
              }
            },
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
          color={'220, 90, 90'}
          innerScale={0.6}
          innerSize={8}
          outerAlpha={0.4}
          outerScale={6}
          outerSize={8}
          showSystemCursor={false}
          trailingSpeed={8}
        />
      )}
      <DemoHeader />
      <DemoContent />
      {state === 'custom' && <DemoCustomTest />}
      <DemoFooter />
    </div>
  )
}
