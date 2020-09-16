import React from 'react'
import Editor from '../editor/'

const TextSection = props => {
  return (
    <div className="TextSection">
      <Editor blocks={props.body} />
    </div>
  )
}

export default TextSection
