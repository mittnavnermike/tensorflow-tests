import React from 'react'

const Emoji = ({ children }) => {
  return (
    <span role="img" aria-label="emoji">
      {children}
    </span>
  )
}

export default Emoji
