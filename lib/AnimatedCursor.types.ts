import { CSSProperties } from 'react'

export interface AnimatedCursorProps {
  clickables?: string[]
  color?: string
  innerScale?: number
  innerSize?: number
  innerStyle?: CSSProperties
  outerAlpha?: number
  outerScale?: number
  outerSize?: number
  outerStyle?: CSSProperties
  showSystemCursor?: boolean
  trailingSpeed?: number
}

export interface AnimatedCursorCoordinates {
  x: number
  y: number
}