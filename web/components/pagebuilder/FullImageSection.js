import React from 'react'
import Figure from '../editor/Figure'

const FullImageSection = ({ image, aspect }) => {
  return (
    <div className="FullImageSection">
      <Figure node={image} aspectRatio={aspect} />
    </div>
  )
}

export default FullImageSection
