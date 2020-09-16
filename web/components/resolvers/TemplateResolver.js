import React, { useState, useEffect } from 'react'

const templates = {
  article: 'Article',
  frontpage: 'FrontPage',
  contact: 'ContactPage',
  news: 'NewsPage',
  default: 'Page'
}

export default function TemplateResolver({ page }) {
  const [Component, setComponent] = useState(null)

  useEffect(() => {
    let temp
    // Check if we have a template
    if (page.template && templates[page.template]) {
      temp = templates[page.template]
    } // If no template name is set, resolve to type
    else if (page._type && templates[page._type]) {
      temp = templates[page._type]
    } // If we still don't have a component, resolve to default
    else {
      temp = templates.default
    }

    // Dynamically import template
    import(`../pages/${temp}`)
      .then(comp => setComponent(() => comp.default))
      .catch(err => console.log(err))
  }, [page])

  if (!Component) return <div style={{ minHeight: '100vh' }} />

  return <Component {...page} />
}
