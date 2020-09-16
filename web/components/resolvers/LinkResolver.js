import React from 'react'
import Link from 'next/link'
import useLinkResolver from '../hooks/useLinkResolver'

export const resolveLinkText = ({ children, customText, link }) => {
  if (children) {
    return children
  }
  if (customText) {
    return customText
  }
  if (link.title) {
    return link.title
  }
  return false
}

export const InternalLink = ({
  page,
  linkText,
  className,
  children,
  ...props
}) => {
  const link = useLinkResolver(page)

  if (!link) {
    console.warn('Could not resolve internal link', page)
    return children
  }

  return (
    <Link href={link}>
      <a className={className} {...props}>
        {linkText || children || page.title}
      </a>
    </Link>
  )
}

export const ExternalLink = ({ link, className, children, ...props }) => {
  const { blank, title, linkText, href } = link
  const targetProps = blank
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {}

  if (!href) {
    console.warn(`No href provided. Can't resolve link.`)
    return children // make sure we render potentially nested content
  }

  return (
    <a
      title={title}
      href={href}
      className={className}
      {...targetProps}
      {...props}
    >
      {linkText || children || href}
    </a>
  )
}

const LinkResolver = ({ link, className, children, ...props }) => {
  // External link
  if (typeof link === 'string') {
    return (
      <ExternalLink className={className} link={{ href: link }} {...props}>
        {children}
      </ExternalLink>
    )
  }

  // External link
  if (link?._type === 'link') {
    return (
      <ExternalLink className={className} link={link} {...props}>
        {children}
      </ExternalLink>
    )
  }

  if (link?._type === 'internalLink') {
    return (
      <InternalLink
        className={className}
        title={link?.title}
        linkText={link?.linkText}
        page={link?.reference}
        {...props}
      >
        {children}
      </InternalLink>
    )
  }

  // If a _type is assigned it's probably a document reference
  if (link?._type) {
    return (
      <InternalLink className={className} page={link} {...props}>
        {children}
      </InternalLink>
    )
  }

  if (!link?._type) {
    console.warn(`No _type provided. Can't resolve link.`)
    return children
  }

  console.warn('No link resolved. Returning children', link)

  return children
}

export default LinkResolver
