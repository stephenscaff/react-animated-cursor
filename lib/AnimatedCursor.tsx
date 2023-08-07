import { useState, useEffect, useCallback, useRef, CSSProperties } from 'react'
import { useEventListener } from './hooks/useEventListener'
import IsDevice from './helpers/isDevice'
import {
  AnimatedCursorProps,
  AnimatedCursorCoordinates
} from './AnimatedCursor.types'

/**
 * Cursor Core
 * Replaces the native cursor with a custom animated cursor, consisting
 * of an inner and outer dot that scale inversely based on hover or click.
 *
 * @author Stephen Scaff (github.com/stephenscaff)
 *
 * @param {object} obj
 * @param {array}  obj.clickables - array of clickable selectors
 * @param {string} obj.color - rgb color value
 * @param {number} obj.innerScale - inner cursor scale amount
 * @param {number} obj.innerSize - inner cursor size in px
 * @param {object} obj.innerStyle - style object for inner cursor
 * @param {number} obj.outerAlpha - level of alpha transparency for color
 * @param {number} obj.outerScale - outer cursor scale amount
 * @param {number} obj.outerSize - outer cursor size in px
 * @param {object} obj.outerStyle - style object for outer cursor
 * @param {bool}   obj.showSystemCursor - show/hide system cursor1
 * @param {number} obj.trailingSpeed - speed the outer cursor trails at
 */
function CursorCore({
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
  ],
  color = '220, 90, 90',
  innerScale = 0.6,
  innerSize = 8,
  innerStyle,
  outerAlpha = 0.4,
  outerScale = 6,
  outerSize = 8,
  outerStyle,
  showSystemCursor = false,
  trailingSpeed = 8
}: AnimatedCursorProps) {
  const cursorOuterRef = useRef<HTMLDivElement>(null)
  const cursorInnerRef = useRef<HTMLDivElement>(null)
  const requestRef = useRef(null)
  const previousTimeRef = useRef(null)
  const [coords, setCoords] = useState<AnimatedCursorCoordinates>({
    x: 0,
    y: 0
  })
  const [isVisible, setIsVisible] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const [isActiveClickable, setIsActiveClickable] = useState(false)
  const endX = useRef(0)
  const endY = useRef(0)

  /**
   * Primary Mouse move event
   * @param {number} clientX - MouseEvent.clientX
   * @param {number} clientY - MouseEvent.clientY
   */
  const onMouseMove = useCallback((event: MouseEvent) => {
    const { clientX, clientY } = event
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

  // Outer cursor RAF setup / cleanup
  useEffect(() => {
    requestRef.current = requestAnimationFrame(animateOuterCursor)
    return () => cancelAnimationFrame(requestRef.current)
  }, [animateOuterCursor])

  /**
   * Calculates amount to scale cursor in px3
   * @param {number} orignalSize - starting size
   * @param {number} scaleAmount - Amount to scale
   * @returns {String} Scale amount in px
   */
  const getScaleAmount = (orignalSize: number, scaleAmount: number) => {
    return `${parseInt(String(orignalSize * scaleAmount))}px`
  }

  // Scales cursor by HxW
  const scaleBySize = useCallback(
    (
      cursorRef: HTMLDivElement | null,
      orignalSize: number,
      scaleAmount: number
    ) => {
      if (cursorRef) {
        cursorRef.style.height = getScaleAmount(orignalSize, scaleAmount)
        cursorRef.style.width = getScaleAmount(orignalSize, scaleAmount)
      }
    },
    []
  )

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
      scaleBySize(cursorInnerRef.current, innerSize, innerScale)
      scaleBySize(cursorOuterRef.current, outerSize, outerScale)
    } else {
      scaleBySize(cursorInnerRef.current, innerSize, 1)
      scaleBySize(cursorOuterRef.current, outerSize, 1)
    }
  }, [innerSize, innerScale, outerSize, outerScale, scaleBySize, isActive])

  // Cursors Click States
  useEffect(() => {
    if (isActiveClickable) {
      scaleBySize(cursorInnerRef.current, innerSize, innerScale * 1.2)
      scaleBySize(cursorOuterRef.current, outerSize, outerScale * 1.4)
    }
  }, [
    innerSize,
    innerScale,
    outerSize,
    outerScale,
    scaleBySize,
    isActiveClickable
  ])

  // Cursor Visibility Statea
  useEffect(() => {
    if (isVisible) {
      cursorInnerRef.current.style.opacity = '1'
      cursorOuterRef.current.style.opacity = '1'
    } else {
      cursorInnerRef.current.style.opacity = '0'
      cursorOuterRef.current.style.opacity = '0'
    }
  }, [isVisible])

  // Click event state updates
  useEffect(() => {
    const clickableEls = document.querySelectorAll<HTMLElement>(
      clickables.join(',')
    )

    clickableEls.forEach((el) => {
      if (!showSystemCursor) el.style.cursor = 'none'

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
        const clickableOptions =
          typeof clickables === 'object'
            ? find(
                clickables,
                (clickable: Clickable) =>
                  typeof clickable === 'object' && el.matches(clickable.target)
              )
            : {}

        const options = {
          ...defaultOptions,
          ...clickableOptions
        }

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
  }, [isActive, clickables, showSystemCursor])

  const coreStyles: CSSProperties = {
    zIndex: 999,
    display: 'block',
    position: 'fixed',
    borderRadius: '50%',
    pointerEvents: 'none',
    transform: 'translate(-50%, -50%)',
    transition:
      'opacity 0.15s ease-in-out, height 0.2s ease-in-out, width 0.2s ease-in-out'
  }

  // Cursor Styles
  const styles = {
    cursorInner: {
      width: innerSize,
      height: innerSize,
      backgroundColor: `rgba(${color}, 1)`,
      ...coreStyles,
      ...(innerStyle && innerStyle)
    },
    cursorOuter: {
      width: outerSize,
      height: outerSize,
      backgroundColor: `rgba(${color}, ${outerAlpha})`,
      ...coreStyles,
      ...(outerStyle && outerStyle)
    }
  }

  // Hide / Show global cursor
  if (!showSystemCursor) document.body.style.cursor = 'none'

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
function AnimatedCursor({
  clickables,
  color,
  innerScale,
  innerSize,
  innerStyle,
  outerAlpha,
  outerScale,
  outerSize,
  outerStyle,
  showSystemCursor,
  trailingSpeed
}: AnimatedCursorProps) {
  if (typeof navigator !== 'undefined' && IsDevice.any()) {
    return <></>
  }
  return (
    <CursorCore
      clickables={clickables}
      color={color}
      innerScale={innerScale}
      innerSize={innerSize}
      innerStyle={innerStyle}
      outerAlpha={outerAlpha}
      outerScale={outerScale}
      outerSize={outerSize}
      outerStyle={outerStyle}
      showSystemCursor={showSystemCursor}
      trailingSpeed={trailingSpeed}
    />
  )
}

export default AnimatedCursor
