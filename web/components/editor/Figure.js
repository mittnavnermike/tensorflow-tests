import React from 'react'
import styled, { css } from 'styled-components'
import CloudinaryMediaResolver from '../resolvers/CloudinaryMediaResolver'

const Figure = ({ node, aspectRatio, className }) => {
  if (!node?.cldImage) {
    return null
  }
  return (
    <figure className={className}>
      <CloudinaryMediaResolver node={node} aspectRatio={aspectRatio} />
      {node.caption && (
        <figcaption className="Figure__caption">{node.caption}</figcaption>
      )}
    </figure>
  )
}

export default styled(Figure)(
  ({ theme }) => css`
    width: 100%;
    max-width: 100%;
  `
)
