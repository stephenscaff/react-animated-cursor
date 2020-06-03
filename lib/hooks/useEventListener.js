import { useRef, useEffect } from 'react'
/* eslint-disable react-hooks/exhaustive-deps */
/**
 * UseWindowSize
 * Custom React Hook that returns window wxh.
 * @return {object} width, height
 */
export function useEventListener(eventName, handler, element = document) {
  const savedHandler = useRef()

  useEffect(() => {
    savedHandler.current = handler
  }, [handler])

  useEffect(() => {
    const isSupported = element && element.addEventListener
    if (!isSupported) return

    const eventListener = (event) => savedHandler.current(event)

    element.addEventListener(eventName, eventListener)

    return () => {
      element.removeEventListener(eventName, eventListener)
    }
  }, [eventName, element])
}
