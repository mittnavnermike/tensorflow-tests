// Routes for all generated pages
export const routes = {
  page: ({ slug }) => {
    return `/${slug.current}`
  },
  article: ({ slug }) => {
    return `/article/${slug.current}`
  },
  frontpage: () => {
    return `/`
  }
}

export const resolveRoute = page => {
  const type = page?._type
  if (!type) {
    console.warn(`_type not defined`, page)
    return null
  }

  const route = routes[type]
  if (route && typeof route === 'function') {
    return route(page)
  }

  console.warn(`Could not resolve route`, page)
  return null
}

export const docTypes = {
  illustrator: {
    ogType: 'website'
  },
  page: {
    ogType: 'website'
  },
  post: {
    ogType: 'article'
  },
  article: {
    ogType: 'article'
  },
  blogCategory: {
    ogType: 'website'
  }
}

export const getOgType = node => {
  if (node._type && docTypes[node._type]) {
    return docTypes[node._type].ogType ? docTypes[node._type].ogType : 'website'
  }
}
