import React from 'react'
import Pagebuilder from '../pagebuilder/Pagebuilder'
import Container from '@heydays/Container'

const ContactPage = ({ title, content, pagebuilder, ...props }) => {
  return (
    <div className="Page">
      <header className="Page__header">
        <Container>
          <h1 className="Page__title">Contact Page Template</h1>
        </Container>
      </header>
      <Container className="Page__content">
        {pagebuilder?.sections && (
          <Pagebuilder sections={pagebuilder.sections} />
        )}
      </Container>
    </div>
  )
}

export default ContactPage
