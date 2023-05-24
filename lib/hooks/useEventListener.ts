import { useRef, useEffect } from 'react'

type EventListener = (event: Event) => void

/**
 * useEventListener
 * Hook for handling EventListeners
 * @param {string} eventName - The name of the event to listen for
 * @param {EventListener} handler - The event handler function
 * @param {HTMLElement|Window} element - The element to attach the event listener to
 * @returns {void}
 */
export function useEventListener(
  eventName: string,
  handler: EventListener,
  element: HTMLElement | Window = window
): void {
  // Create a ref that stores handler
  const savedHandler = useRef<EventListener | null>(null)

  // Update ref.current value if handler changes.
  useEffect(() => {
    savedHandler.current = handler
  }, [handler])

  useEffect(() => {
    // Make sure element supports addEventListener
    const isSupported = element && element.addEventListener
    if (!isSupported) return

    // Create event listener that calls handler function stored in ref
    const eventListener: EventListener = (event) => {
      if (savedHandler.current) {
        savedHandler.current(event)
      }
    }

    // Add event listener
    element.addEventListener(eventName, eventListener)

    // Remove event listener on cleanup
    return () => {
      element.removeEventListener(eventName, eventListener)
    }
  }, [eventName, element]) // Re-run if eventName or element changes
}
