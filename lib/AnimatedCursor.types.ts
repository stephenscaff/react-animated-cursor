import { CSSProperties, ReactNode } from 'react'

export interface AnimatedCursorOptions {
  children?: string | ReactNode
  color?: string
  innerScale?: number
  innerSize?: number
  innerStyle?: CSSProperties
  outerAlpha?: number
  outerScale?: number
  outerSize?: number
  outerStyle?: CSSProperties
  hug?: boolean
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
