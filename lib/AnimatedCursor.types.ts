import { CSSProperties } from 'react'

export interface AnimatedCursorOptions {
  color?: string
  innerScale?: number
  innerSize?: number
  innerStyle?: CSSProperties
  outerAlpha?: number
  outerScale?: number
  outerSize?: number
  outerStyle?: CSSProperties
}

export interface AnimatedCursorProps extends AnimatedCursorOptions {
  clickables?: (string | ({ target: string } & AnimatedCursorOptions))[]
  showSystemCursor?: boolean
  trailingSpeed?: number
}

export interface AnimatedCursorCoordinates {
  x: number
  y: number
}
