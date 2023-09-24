import { useEffect, useRef } from 'react'

type AllEventMaps = HTMLElementEventMap & DocumentEventMap & WindowEventMap

export function useEventListener<K extends keyof HTMLElementEventMap>(
  type: K,
  listener: (event: HTMLElementEventMap[K]) => void,
  element: HTMLElement
): void

export function useEventListener<K extends keyof DocumentEventMap>(
  type: K,
  listener: (event: DocumentEventMap[K]) => void,
  element: Document
): void

export function useEventListener<K extends keyof WindowEventMap>(
  type: K,
  listener: (event: WindowEventMap[K]) => void,
  element?: Window
): void

export function useEventListener<K extends keyof AllEventMaps>(
  type: K,
  listener: (event: AllEventMaps[K]) => void,
  element?: HTMLElement | Document | Window | null
) {
  const listenerRef = useRef(listener)

  useEffect(() => {
    listenerRef.current = listener
  })

  useEffect(() => {
    const el = element === undefined ? window : element

    const internalListener = (ev: AllEventMaps[K]) => {
      return listenerRef.current(ev)
    }

    el?.addEventListener(
      type,
      internalListener as EventListenerOrEventListenerObject
    )

    return () => {
      el?.removeEventListener(
        type,
        internalListener as EventListenerOrEventListenerObject
      )
    }
  }, [type, element])
}
