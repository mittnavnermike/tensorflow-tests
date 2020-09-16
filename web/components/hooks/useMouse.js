import { useState, useEffect } from 'react'

const initialMouseState = {
  x: null,
  y: null,
  screenX: null,
  screenY: null,
  pageX: null,
  pageY: null,
  clientX: null,
  clientY: null,
  movementX: null,
  movementY: null,
  offsetX: null,
  offsetY: null
}

function getMousePositionFromEvent(e) {
  const {
    screenX,
    screenY,
    movementX,
    movementY,
    pageX,
    pageY,
    clientX,
    clientY,
    offsetX,
    offsetY
  } = e
  return {
    screenX,
    screenY,
    movementX,
    movementY,
    pageX,
    pageY,
    clientX,
    clientY,
    offsetX,
    offsetY,
    x: screenX,
    y: screenY
  }
}

const useMouse = () => {
  const [mousePosition, setMousePostition] = useState(initialMouseState)

  function updateMousePosition(e) {
    setMousePostition(getMousePositionFromEvent(e))
  }

  useEffect(() => {
    document.addEventListener('mousemove', updateMousePosition)
    return () => {
      document.removeEventListener('mousemove', updateMousePosition)
    }
  }, [])
  return mousePosition
}

export default useMouse
