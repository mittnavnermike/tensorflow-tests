import React from 'react'
import Carousel from '../elements/Carousel'
import CloudinaryMediaResolver from '@heydays/CloudinaryMediaResolver'

const CarouselSection = ({ images, aspectRatio = 'original' }) => {
  if (!images) return null

  return (
    <div className="CarouselSection">
      <Carousel>
        {images.map(image => (
          <CloudinaryMediaResolver
            key={image._key}
            node={image}
            aspectRatio={aspectRatio}
          />
        ))}
      </Carousel>
    </div>
  )
}

export default CarouselSection
