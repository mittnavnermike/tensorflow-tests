import React from 'react'

import AspectContainer from './AspectContainer'
import LinkResolver from '@heydays/LinkResolver'
import Editor from '../editor'
import styled, { css } from 'styled-components'
import { P } from './Typography'
import { spacing } from '../../styles/utilities'
import CloudinaryImage from './CloudinaryImage'

const Card = ({ className, title, image, excerpt, link }) => {
  return (
    <LinkResolver link={link}>
      <div className="media">
        {image ? (
          <CloudinaryImage node={image} aspectRatio="portrait" />
        ) : (
          <AspectContainer
            aspect={{
              xs: 'portrait'
            }}
          />
        )}
      </div>
      {title && (
        <P modifiers="large" className="title">
          {title}
        </P>
      )}
      {excerpt && (
        <div className="excerpt">
          <Editor blocks={excerpt} />
        </div>
      )}
    </LinkResolver>
  )
}

export default styled(Card)(
  ({ theme }) => css`
    /* transition: opacity $trans, transform $trans; */
    opacity: 0;
    transform: translateY(50px);

    &.is-visible {
      opacity: 1;
      transform: translateY(0);
    }

    .media {
      background: #f1f1f1;
    }

    .title,
    .excerpt {
      ${spacing.sm('mt')}
    }
  `
)
