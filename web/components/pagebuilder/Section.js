import React from 'react'
import Editor from '../editor/'
import { P, H3 } from '@heydays/Typography'
import styled, { css } from 'styled-components'
import { spacing } from '../../styles/utilities'
import LinkResolver from '@heydays/LinkResolver'

const Section = ({ label, title, content, link, className }) => {
  return (
    <div className={className}>
      {label && (
        <P modifiers="small" className="label">
          {label}
        </P>
      )}
      {title && <H3 className="title">{title}</H3>}
      {content && <Editor className="content" blocks={content} />}
      {link && (
        <LinkResolver link={link}>{link.title || link.url}</LinkResolver>
      )}
    </div>
  )
}

export default styled(Section)(
  ({ theme }) => css`
    text-align: center;
    .button {
      ${spacing.md('mt')}
    }
  `
)
