import React from 'react'
import styled, { css } from 'styled-components'
import { getImageSrc, getAspect } from '../../utils/cloudinary'

/*
Image transformations:
https://cloudinary.com/documentation/image_transformation_reference
*/

const CloudinaryImage = ({ node, aspectRatio = null }) => {
  if (!node) {
    return null
  }
  // Set aspect ratio as style prop to prevent generating a class for every ratio
  const originalRatio =
    node?.aspectRatio ||
    node?.cldImage?.aspectRatio ||
    node?.aspect_ratio ||
    null
  const passedRatio = aspectRatio && getAspect(aspectRatio)
  // Get the passed ratio first, then fallback to image original ratio
  const ratioValue = passedRatio || originalRatio
  const src = getImageSrc(node?.cldImage ? node.cldImage : node, ratioValue)
  const ratioStyle = ratioValue
    ? { paddingBottom: `${100 / ratioValue}%` }
    : null
  return (
    <Wrapper>
      <div className="spacer" style={ratioStyle} />
      {/* <img src={src.lqip} aria-hidden="true" alt={node.alt} /> */}
      <img
        className="lazyload"
        alt={node.alt}
        src={src.empty}
        data-sizes="auto"
        data-srcset={src.srcset}
      />
      <noscript>
        <img src={src.noscript} alt={node.alt} />
      </noscript>
    </Wrapper>
  )
}

const Wrapper = styled.div(
  ({ theme }) => css`
    width: 100%;
    position: relative;
    overflow: hidden;
    /* backface-visibility: hidden;
    perspective: 1000;
    transform: translate3d(0, 0, 0), translateZ(0); */

    .spacer {
      display: block;
      width: 100%;
      background: rgba(125, 125, 125, 0.05);
    }
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      transition: opacity 500ms, transform 500ms;
      &.lazyload,
      &.lazyloading {
        opacity: 0;
        /* filter: blur(50px); */
        /* Blurring is causing massive lag on all animations and loading across the site */
      }
      &.lazyloaded {
        opacity: 1;
        /* filter: blur(0px); */
        /* Blurring is causing massive lag on all animations and loading across the site */
      }
    }
  `
)

export default CloudinaryImage
