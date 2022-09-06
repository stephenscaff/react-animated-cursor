import {
  useState,
  useEffect,
  useCallback,
  useRef,
  ReactElement,
  CSSProperties
} from 'react'
import { hexToRGB } from './helpers/hexToRGB'
import { IsDevice } from './helpers/IsDevice'
import { useEventListener } from './hooks/useEventListener'

export interface IAnimatedCursor {
  color?: string
  outerAlpha?: number
  innerSize?: number
  outerSize?: number
  outerScale?: number
  innerScale?: number
  outerStyle?: object
  innerStyle?: object
  trailingSpeed?: number
  clickables?: string[]
}

export interface ICoordinates {
  x: number
  y: number
}

/**
 * Cursor Core
 * Replaces the native cursor with a custom animated cursor, consisting
 * of an inner and outer dot that scale inversely based on hover or click.
 *
 * @author Stephen Scaff (github.com/stephenscaff)
 *
 * @param {string} color - rgb color value (RGB or HEX)
 * @param {number} outerAlpha - level of alpha transparency for color
 * @param {number} innerSize - inner cursor size in px
 * @param {number} innerScale - inner cursor scale amount
 * @param {number} outerSize - outer cursor size in px
 * @param {number} outerScale - outer cursor scale amount
 * @param {object} outerStyle - style object for outer cursor
 * @param {object} innerStyle - style object for inner cursor
 * @param {array}  clickables - array of clickable selectors
 *
 */
const CursorCore = ({
  outerStyle,
  innerStyle,
  color,
  outerAlpha,
  innerSize,
  innerScale,
  outerSize,
  outerScale,
  trailingSpeed,
  clickables
}: IAnimatedCursor): ReactElement => {
  const cursorOuterRef = useRef<HTMLDivElement>(null)
  const cursorInnerRef = useRef<HTMLDivElement>(null)
  const requestRef = useRef(null)
  const previousTimeRef = useRef(null)
  const [coords, setCoords] = useState<ICoordinates>({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const [isActiveClickable, setIsActiveClickable] = useState(false)
  let endX = useRef(0)
  let endY = useRef(0)

  /**
   * Primary Mouse move event
   * @param {number} clientX - MouseEvent.clientx
   * @param {number} clientY - MouseEvent.clienty
   */
  const onMouseMove = useCallback(({ clientX, clientY }) => {
    setCoords({ x: clientX, y: clientY })
    cursorInnerRef.current.style.top = `${clientY}px`
    cursorInnerRef.current.style.left = `${clientX}px`
    endX.current = clientX
    endY.current = clientY
  }, [])

  // Outer Cursor Animation Delay
  const animateOuterCursor = useCallback(
    (time: number) => {
      if (previousTimeRef.current !== undefined) {
        coords.x += (endX.current - coords.x) / trailingSpeed
        coords.y += (endY.current - coords.y) / trailingSpeed
        cursorOuterRef.current.style.top = `${coords.y}px`
        cursorOuterRef.current.style.left = `${coords.x}px`
      }
      previousTimeRef.current = time
      requestRef.current = requestAnimationFrame(animateOuterCursor)
    },
    [requestRef] // eslint-disable-line
  )

  // RAF for animateOuterCursor
  useEffect(() => {
    requestRef.current = requestAnimationFrame(animateOuterCursor)
    return () => cancelAnimationFrame(requestRef.current)
  }, [animateOuterCursor])

  // Mouse Events State updates
  const onMouseDown = useCallback(() => setIsActive(true), [])
  const onMouseUp = useCallback(() => setIsActive(false), [])
  const onMouseEnterViewport = useCallback(() => setIsVisible(true), [])
  const onMouseLeaveViewport = useCallback(() => setIsVisible(false), [])

  useEventListener('mousemove', onMouseMove)
  useEventListener('mousedown', onMouseDown)
  useEventListener('mouseup', onMouseUp)
  useEventListener('mouseover', onMouseEnterViewport)
  useEventListener('mouseout', onMouseLeaveViewport)

  // Cursors Hover/Active State
  useEffect(() => {
    if (isActive) {
      cursorInnerRef.current.style.transform = `translate(-50%, -50%) scale(${innerScale})`
      cursorOuterRef.current.style.transform = `translate(-50%, -50%) scale(${outerScale})`
    } else {
      cursorInnerRef.current.style.transform = 'translate(-50%, -50%) scale(1)'
      cursorOuterRef.current.style.transform = 'translate(-50%, -50%) scale(1)'
    }
  }, [innerScale, outerScale, isActive])

  // Cursors Click States
  useEffect(() => {
    if (isActiveClickable) {
      cursorInnerRef.current.style.transform = `translate(-50%, -50%) scale(${
        innerScale * 1.2
      })`
      cursorOuterRef.current.style.transform = `translate(-50%, -50%) scale(${
        outerScale * 1.4
      })`
    }
  }, [innerScale, outerScale, isActiveClickable])

  // Cursor Visibility State
  useEffect(() => {
    if (isVisible) {
      cursorInnerRef.current.style.opacity = '1'
      cursorOuterRef.current.style.opacity = '1'
    } else {
      cursorInnerRef.current.style.opacity = '0'
      cursorOuterRef.current.style.opacity = '0'
    }
  }, [isVisible])

  useEffect(() => {
    const clickableEls = document.querySelectorAll<HTMLElement>(
      clickables.join(',')
    )

    clickableEls.forEach((el) => {
      el.style.cursor = 'none'

      el.addEventListener('mouseover', () => {
        setIsActive(true)
      })
      el.addEventListener('click', () => {
        setIsActive(true)
        setIsActiveClickable(false)
      })
      el.addEventListener('mousedown', () => {
        setIsActiveClickable(true)
      })
      el.addEventListener('mouseup', () => {
        setIsActive(true)
      })
      el.addEventListener('mouseout', () => {
        setIsActive(false)
        setIsActiveClickable(false)
      })
    })

    return () => {
      clickableEls.forEach((el) => {
        el.removeEventListener('mouseover', () => {
          setIsActive(true)
        })
        el.removeEventListener('click', () => {
          setIsActive(true)
          setIsActiveClickable(false)
        })
        el.removeEventListener('mousedown', () => {
          setIsActiveClickable(true)
        })
        el.removeEventListener('mouseup', () => {
          setIsActive(true)
        })
        el.removeEventListener('mouseout', () => {
          setIsActive(false)
          setIsActiveClickable(false)
        })
      })
    }
  }, [isActive, clickables])

  const mainStyles: CSSProperties = {
    zIndex: 999,
    display: 'block',
    position: 'fixed',
    borderRadius: '50%',
    pointerEvents: 'none',
    transition: 'opacity 0.15s ease-in-out, transform 0.25s ease-in-out'
  }

  // Cursor Styles
  const styles = {
    cursorInner: {
      ...mainStyles,
      width: innerSize,
      height: innerSize,
      backgroundColor: color.includes('#')
        ? hexToRGB(color)
        : `rgba(${color}, 1)`,
      ...(innerStyle && innerStyle)
    },
    cursorOuter: {
      ...mainStyles,
      width: outerSize,
      height: outerSize,
      backgroundColor: color.includes('#')
        ? hexToRGB(color, outerAlpha)
        : `rgba(${color}, ${outerAlpha} )`,
      willChange: 'transform',
      ...(outerStyle && outerStyle)
    }
  }

  // Hide / Show global cursor
  document.body.style.cursor = 'none'

  return (
    <>
      <div ref={cursorOuterRef} style={styles.cursorOuter} />
      <div ref={cursorInnerRef} style={styles.cursorInner} />
    </>
  )
}

/**
 * AnimatedCursor
 * Calls and passes props to CursorCore if not a touch/mobile device.
 */
export const AnimatedCursor = ({
  outerStyle,
  innerStyle,
  color = '220, 90, 90',
  outerAlpha = 0.3,
  innerSize = 8,
  outerSize = 8,
  outerScale = 6,
  innerScale = 0.6,
  trailingSpeed = 8,
  clickables = [
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
  ]
}: IAnimatedCursor): ReactElement => {
  if (typeof navigator !== 'undefined' && IsDevice.any()) {
    return <></>
  }
  return (
    <CursorCore
      outerStyle={outerStyle}
      innerStyle={innerStyle}
      color={color}
      outerAlpha={outerAlpha}
      innerSize={innerSize}
      innerScale={innerScale}
      outerSize={outerSize}
      outerScale={outerScale}
      trailingSpeed={trailingSpeed}
      clickables={clickables}
    />
  )
}
