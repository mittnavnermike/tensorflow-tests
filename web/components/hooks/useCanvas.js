import { useState, useLayoutEffect } from 'react'
import useWindowSize from './useWindowSize'

/**
 *
 * Usage:
 *
 * const Graphic = () => {
  const container = useRef(null)
  const canvas = useRef(null)
  const { c, width, height } = useCanvas({ canvas, container })

  useEffect(() => {
    if (c) {
      c.fillRect(0, 0, 100, 100)
    }
  }, [c])

  return (
    <div ref={container} style={{width: '100%', height: '50vh'}}>
      <canvas ref={canvas}></canvas>
    </div>
  )
}
*
* Use container to control the size of the canvas
*
*/

const useCanvas = ({ canvas, container }) => {
  const [c, setC] = useState(null)
  const [width, setWidth] = useState(null)
  const [height, setHeight] = useState(null)
  const windowSize = useWindowSize()

  // HandleResizing
  useLayoutEffect(() => {
    if (canvas?.current) {
      const ctx = canvas.current.getContext('2d')
      setC(ctx)

      const ratio = window.devicePixelRatio || 1
      ctx.scale(ratio, ratio)

      const { width, height } = container.current.getBoundingClientRect()
      canvas.current.width = width
      canvas.current.height = height
      setWidth(width)
      setHeight(height)
    }
  }, [windowSize, canvas, container])

  return { c, width, height }
}

export default useCanvas
