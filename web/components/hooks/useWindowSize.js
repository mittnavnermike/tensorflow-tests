import { useState, useEffect } from 'react'
import _debounce from 'lodash/debounce'

/**
 * Usage
 *
 * const windowSize = useWindowSize({ debounce: 250 })
 * handleResize = () => {
 *    // do stuff on resize
 * }
 * useEffect(handleResize, [windowSize])
 *
 */

const getSize = () => {
  return typeof window !== 'undefined'
    ? {
        innerHeight: window.innerHeight,
        innerWidth: window.innerWidth,
        outerHeight: window.outerHeight,
        outerWidth: window.outerWidth
      }
    : {
        innerHeight: 0,
        innerWidth: 0,
        outerHeight: 0,
        outerWidth: 0
      }
}

const useWindowSize = ({ debounce = 0 } = {}) => {
  const [windowSize, setWindowSize] = useState(getSize())

  const handleResizeDebounce = _debounce(handleResize, debounce)

  function handleResize() {
    setWindowSize(getSize())
  }

  useEffect(() => {
    window.addEventListener('resize', handleResizeDebounce)
    return () => {
      window.removeEventListener('resize', handleResizeDebounce)
    }
  }, [handleResizeDebounce])

  return windowSize
}

export default useWindowSize
