import React from 'react'
import CloudinaryImage from '../elements/CloudinaryImage'
import CloudinaryBackgroundVideo from '../elements/CloudinaryBackgroundVideo'

const CloudinaryMediaResolver = ({ node, aspectRatio }) => {
  const isNested = node?.hasOwnProperty('image')
  if (
    node?.cldImage?.resource_type === 'image' ||
    node?.resource_type === 'image'
  ) {
    return <CloudinaryImage node={node} aspectRatio={aspectRatio} />
  } else if (
    node?.cldImage?.resource_type === 'video' ||
    node?.resource_type === 'video'
  ) {
    return <CloudinaryBackgroundVideo node={isNested ? node?.image : node} />
  }
  return null
}

export default CloudinaryMediaResolver
