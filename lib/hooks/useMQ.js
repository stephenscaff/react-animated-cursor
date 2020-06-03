import { useEffect, useState } from 'react'
/* eslint-disable react-hooks/exhaustive-deps */
export const useMQ = (query) => {
  const mediaMatch = window.matchMedia(query)
  const [matches, setMatches] = useState(mediaMatch.matches)

  useEffect(() => {
    const handler = (e) => setMatches(e.matches)
    mediaMatch.addListener(handler)
    return () => mediaMatch.removeListener(handler)
  })
  return matches
}
