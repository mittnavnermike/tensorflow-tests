import React from 'react'
import Editor from './Editor'

const Quote = ({ quote }) => {
  return (
    quote.content && (
      <div className="Quote">
        <blockquote className="Quote__blockquote">
          <Editor blocks={quote.content} />
        </blockquote>
        {quote.source && (
          <cite className="Quote__cite">
            <Editor blocks={quote.source} />
          </cite>
        )}
      </div>
    )
  )
}

export default Quote
