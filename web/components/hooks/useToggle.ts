import { useState } from 'react'

const useToggle = (init: boolean = false) => {
  const [isToggled, setIsToggled] = useState<boolean>(init)

  const toggle = () => {
    setIsToggled(value => !value)
  }

  return { isToggled, toggle }
}

export default useToggle
