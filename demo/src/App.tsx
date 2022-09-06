import { AnimatedCursor } from '../../lib'
import { DemoContent } from './DemoContent'
import './demo-styles.css'

export const App = () => (
  <div className="App">
    <AnimatedCursor
      color={'#dc5a5a'}
      innerSize={8}
      outerSize={35}
      innerScale={1}
      outerScale={1.7}
    />
    <DemoContent />
  </div>
)
