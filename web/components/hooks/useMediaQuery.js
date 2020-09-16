import { useState, useEffect, useCallback } from 'react'
import { breakpoints } from '../../styles/themes'

function useMedia(queries, values, defaultValue) {
  // Array containing a media query list for each query
  const mediaQueryLists = queries.map(
    q => typeof window !== 'undefined' && window.matchMedia(q)
  )

  // Function that gets value based on matching media query
  const getValue = useCallback(() => {
    // Get index of first media query that matches
    const index = mediaQueryLists.findIndex(mql => mql.matches)
    // Return related value or defaultValue if none
    return typeof values[index] !== 'undefined' ? values[index] : defaultValue
  }, [mediaQueryLists, values, defaultValue])

  // State and setter for matched value
  const [value, setValue] = useState(getValue)

  useEffect(
    () => {
      // Event listener callback
      // Note: By defining getValue outside of useEffect we ensure that it has ...
      // ... current values of hook args (as this hook callback is created once on mount).
      const handler = () => setValue(getValue)
      // Set a listener for each media query with above handler as callback.
      mediaQueryLists.forEach(mql => mql.addListener(handler))
      // Remove listeners on cleanup
      return () => mediaQueryLists.forEach(mql => mql.removeListener(handler))
    },
    [getValue, mediaQueryLists] // Empty array ensures effect is only run on mount and unmount
  )

  return value
}

/**
 * Custom MediaQuery hook that
 * returns the active breakpoint as a string
 *
 * Usage:
 * const query = useQuery()
 * => 'sm' || 'md' || 'lg' || ...
 */

export default function useMediaQuery() {
  const keys = Object.keys(breakpoints)
  const cssBreakpoints = keys.map(
    (key, index) =>
      `(min-width: ${breakpoints[key]}px) ${
        index < keys.length - 1
          ? `and (max-width: ${breakpoints[keys[index + 1]]}px)`
          : ''
      }`
  )
  const media = useMedia(cssBreakpoints, keys, keys[0])

  return media
}
