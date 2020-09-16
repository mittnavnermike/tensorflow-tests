import React from 'react'

import Editor from '../editor/'
import LinkResolver from '@heydays/LinkResolver'
import { H3 } from '@heydays/Typography'
import Grid from '@heydays/Grid'
import styled, { css } from 'styled-components'
import { spacing } from '../../styles/utilities'
import CloudinaryMediaResolver from '../resolvers/CloudinaryMediaResolver'

const TextImageSplit = ({
  textOnTheRight = false,
  cldImage,
  aspect,
  link,
  title,
  content,
  className,
  image
}) => {
  return (
    <div className={className}>
      <Grid
        reverse={textOnTheRight}
        columns={{ xs: 1, md: 2 }}
        gap={true}
        align="center"
      >
        <div className="content">
          {title && <H3>{title}</H3>}
          {content && (
            <Editor className="TextImageSplit__content" blocks={content} />
          )}
          {link && (
            <LinkResolver className="TextImageSplit__button" link={link} />
          )}
        </div>
        <div className="image">
          {image && (
            <CloudinaryMediaResolver
              className="TextImageSplit__image"
              node={image}
              aspectRatio={aspect}
            />
          )}
        </div>
      </Grid>
    </div>
  )
}

export default styled(TextImageSplit)(
  ({ theme }) => css`
    .TextImageSplit__content {
      ${spacing.sm('mt')}
    }
    .TextImageSplit__button {
      ${spacing.sm('mt')}
    }
  `
)
