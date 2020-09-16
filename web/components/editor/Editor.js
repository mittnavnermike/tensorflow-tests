import React from 'react'
import BaseBlockContent from '@sanity/block-content-to-react'

import LinkResolver from '@heydays/LinkResolver'
import Quote from './Quote'
import Figure from './Figure'
import Oembed from '../Oembed'
import { H3, H2, P } from '@heydays/Typography'
import Button from '@heydays/Button'
import Accordion from '@heydays/Accordion'

export const serializers = {
  types: {
    block(props) {
      if (props.node.children.text && props.node.children.text.length === 0)
        return null
      switch (props.node.style) {
        case 'h2':
          return <H2>{props.children}</H2>

        case 'h3':
          return <H3>{props.children}</H3>

        case 'large':
          return <P modifiers="large">{props.children}</P>

        case 'small':
          return (
            <P as="small" modifiers="small">
              {props.children}
            </P>
          )

        case 'button':
          if (!props.node.link) return null
          return (
            <p>
              <Button
                as={LinkResolver}
                data={props.node.link.link}
                modifiers="primary"
              >
                {props.node.link.title}
              </Button>
            </p>
          )

        case 'span':
          return <P as="span">{props.children}</P>

        default:
          return <P>{props.children}</P>
      }
    },
    button(props) {
      if (!props.node.link) return null
      return (
        <p>
          <Button
            as={LinkResolver}
            data={
              props.node.link.externalLink?.url || props.node.link.reference
            }
            modifiers={props.node.type && props.node.type}
          >
            {props.node.link.title}
          </Button>
        </p>
      )
    },
    quote(props) {
      if (!props.node.content) return null
      return <Quote quote={props.node} />
    },
    figure(props) {
      return <Figure node={props.node} />
    },
    oembed(props) {
      return <Oembed url={props.node.url} />
    },
    accordion(props) {
      return <Accordion items={props.node.items} exclusive defaultActive={2} />
    }
  },
  marks: {
    link(props) {
      const link = props?.mark?.externalLink?.url || props?.mark?.reference
      if (!link) return props.children
      return (
        <LinkResolver
          openInNewTab={props?.mark?.externalLink?.blank}
          data={link}
        >
          {props.children ||
            props?.mark?.title ||
            props?.mark?.reference?.title}
        </LinkResolver>
      )
    }
  }
}

const Editor = ({ blocks, className }) => {
  return (
    <div className={`Editor ${className ? className : ''}`}>
      <BaseBlockContent
        className="Editor__blocks"
        blocks={blocks}
        serializers={serializers}
      />
    </div>
  )
}

export default Editor
