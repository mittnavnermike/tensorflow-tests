import React from 'react'

import Container from '@heydays/Container'
import Card from '@heydays/Card'
import Grid from '@heydays/Grid'

const NewsPage = ({ title, content, pagebuilder, articles, ...props }) => {
  return (
    <div className="Page">
      {title && (
        <header className="Page__header">
          <Container>
            <h1 className="Page__title">{title}</h1>
          </Container>
        </header>
      )}
      {articles && (
        <Container className="Page__content">
          <Grid gap={true} columns={{ xs: 1, sm: 2, md: 3 }}>
            {articles.map(
              article =>
                article && (
                  <div key={article.id}>
                    <Card
                      title={article.title}
                      image={article.mainImage}
                      excerpt={article.excerpt}
                      link={article}
                    />
                  </div>
                )
            )}
          </Grid>
        </Container>
      )}
    </div>
  )
}

export default NewsPage

export const query = graphql`
  {
    allSanityArticle {
      nodes {
        title
        isFeatured
        _updatedAt
        mainImage: _rawMainImage(resolveReferences: { maxDepth: 10 })
        excerpt: _rawExcerpt(resolveReferences: { maxDepth: 10 })
        body: _rawBody(resolveReferences: { maxDepth: 10 })
        ...Link
      }
    }
  }
`
