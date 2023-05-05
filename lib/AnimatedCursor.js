import React, { useState, useEffect, useCallback, useRef } from 'react'
import PropTypes from 'prop-types'
import { useEventListener } from './hooks/useEventListener'
import IsDevice from './helpers/IsDevice.js'

/**
 * Cursor Core
 * Replaces the native cursor with a custom animated cursor, consisting
 * of an inner and outer dot that scale inversely based on hover or click.
 *
 * @author Stephen Scaff (github.com/stephenscaff)
 *
 * @param {array}  clickables - array of clickable selectors
 * @param {string} color - rgb color value
 * @param {number} innerScale - inner cursor scale amount
 * @param {number} innerSize - inner cursor size in px
 * @param {object} innerStyle - style object for inner cursor
 * @param {number} outerAlpha - level of alpha transparency for color
 * @param {number} outerScale - outer cursor scale amount
 * @param {number} outerSize - outer cursor size in px
 * @param {object} outerStyle - style object for outer cursor
 * @param {bool}   showSystemCursor - show/hide system cursor
 * @param {bool}   showSystemCursorOnClickable - show/hide system cursor on clickables
 * @param {number} trailingSpeed - speed the outer cursor trails at
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
  showSystemCursorOnClickable = false,
  trailingSpeed = 8
}) {
  const cursorOuterRef = useRef()
  const cursorInnerRef = useRef()
  const requestRef = useRef()
  const previousTimeRef = useRef()
  const [coords, setCoords] = useState({ x: 0, y: 0 })
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
    (time) => {
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

  const getScaleAmount = (orignalSize, scaleAmount) => {
    return parseInt(orignalSize * scaleAmount) + 'px'
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const scaleBySize = useCallback((cursorRef, orignalSize, scaleAmount) => {
    cursorRef.style.height = getScaleAmount(orignalSize, scaleAmount)
    cursorRef.style.width = getScaleAmount(orignalSize, scaleAmount)
  })

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
      cursorInnerRef.current.style.opacity = 1
      cursorOuterRef.current.style.opacity = 1
    } else {
      cursorInnerRef.current.style.opacity = 0
      cursorOuterRef.current.style.opacity = 0
    }
  }, [isVisible])

  // Click event state updates
  useEffect(() => {
    const clickableEls = document.querySelectorAll(clickables.join(','))

    clickableEls.forEach((el) => {
      // Hide / Show system cursor on clickable
      if (!showSystemCursorOnClickable) document.body.style.cursor = 'none'

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

  // Cursor Styles
  const styles = {
    cursorInner: {
      zIndex: 999,
      position: 'fixed',
      display: 'block',
      width: innerSize,
      height: innerSize,
      backgroundColor: `rgba(${color}, 1)`,
      borderRadius: '50%',
      pointerEvents: 'none',
      transform: 'translate(-50%, -50%)',
      transition:
        'opacity 0.15s ease-in-out, height 0.2s ease-in-out, width 0.2s ease-in-out',
      ...(innerStyle && innerStyle)
    },
    cursorOuter: {
      zIndex: 999,
      position: 'fixed',
      display: 'block',
      width: outerSize,
      height: outerSize,
      backgroundColor: `rgba(${color}, ${outerAlpha})`,
      borderRadius: '50%',
      pointerEvents: 'none',
      transform: 'translate(-50%, -50%)',
      transition:
        'opacity 0.15s ease-in-out, height 0.2s ease-in-out, width 0.2s ease-in-out',
      ...(outerStyle && outerStyle)
    }
  }

  // Hide / Show global cursor
  if (!showSystemCursor) document.body.style.cursor = 'none'

  return (
    <React.Fragment>
      <div ref={cursorOuterRef} style={styles.cursorOuter} />
      <div ref={cursorInnerRef} style={styles.cursorInner} />
    </React.Fragment>
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
  showSystemCursorOnClickable,
  trailingSpeed
}) {
  if (typeof navigator !== 'undefined' && IsDevice.any()) {
    return <React.Fragment></React.Fragment>
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
      showSystemCursorOnClickable={showSystemCursorOnClickable}
      trailingSpeed={trailingSpeed}
    />
  )
}

AnimatedCursor.propTypes = {
  clickables: PropTypes.array,
  color: PropTypes.string,
  innerScale: PropTypes.number,
  innerSize: PropTypes.number,
  innerStyle: PropTypes.object,
  outerAlpha: PropTypes.number,
  outerScale: PropTypes.number,
  outerSize: PropTypes.number,
  outerStyle: PropTypes.object,
  showSystemCursor: PropTypes.bool,
  showSystemCursorOnClickable: PropTypes.bool,
  trailingSpeed: PropTypes.number
}

export default AnimatedCursor
