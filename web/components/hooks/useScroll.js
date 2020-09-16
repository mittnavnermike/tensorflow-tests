import { useState, useEffect } from 'react'
import throttle from 'lodash/throttle'

const useScroll = ({ delay = 50 }) => {
  const [scroll, setScroll] = useState({
    x: 0,
    y: 0,
    isTop: true
  })

  useEffect(() => {
    const updateScroll = throttle(e => {
      setScroll({
        x: window.pageXOffset,
        y: window.pageYOffset,
        isTop: window.pageYOffset <= 0
      })
    }, delay)
    updateScroll()
    window.addEventListener('scroll', updateScroll)

    return () => {
      window.removeEventListener('scroll', updateScroll)
    }
  }, [delay])

  return scroll
}

export default useScroll
