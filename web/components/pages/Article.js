import React from 'react'

import { getReadTime } from '../../utils/sanityHelpers'
import Editor from '../editor'
import Grid, { GridItem } from '@heydays/Grid'
import Container from '@heydays/Container'
import Card from '@heydays/Card'
import PageBuilder from '../pagebuilder/Pagebuilder'
import Author from '../elements/Author'

const Article = page => {
  const {
    _id,
    title,
    body,
    _rawMainImage,
    authors,
    publishDate,
    slug,
    pagebuilder
  } = page

  return (
    <Container>
      <article className="Article">
        <Grid reverse={{ md: true }}>
          <GridItem span={{ sm: 12, md: 9 }}>
            <header className="Article__header">
              {title && <h1 className="Article__title">{title}</h1>}
              {_rawMainImage && (
                <div className="Article__image">
                  <SanityImage node={_rawMainImage} />
                </div>
              )}
            </header>
            {body && (
              <div className="Article__content">
                <Editor blocks={body} />
              </div>
            )}
          </GridItem>
          <GridItem span={{ md: 3 }}>
            {body && `Read time: ${getReadTime(body)}min`}
            {publishDate && <p className="Article__date">{publishDate}</p>}
            {authors &&
              authors.map(author => <Author key={author._key} {...author} />)}
            {/* {slug && slug.current && <Share page={page} />} */}
          </GridItem>
        </Grid>
        {pagebuilder?.sections && (
          <PageBuilder sections={pagebuilder.sections} />
        )}
        {/* {currentArticles && (
          <section className="Article__latest">
            <Grid gap={true} columns={{ xs: 2 }}>
              {currentArticles.map(article => (
                <Card
                  key={article?._key}
                  title={article.title}
                  image={article.mainImage}
                  excerpt={article.excerpt}
                  link={article}
                />
              ))}
            </Grid>
          </section>
        )} */}
      </article>
    </Container>
  )
}

export default Article
