import { getArticle, getArticles } from '@cms'
import TemplateResolver from '../../components/resolvers/TemplateResolver'

export const getStaticProps = async ({ params, preview = false }) => {
  const data = await getArticle(params)
  return {
    props: { article: data[0] } // will be passed to the page component as props
  }
}

export async function getStaticPaths() {
  const articles = await getArticles()
  return {
    paths: articles.map(article => ({
      params: {
        slug: article.slug.current
      }
    })),
    fallback: true
  }
}

export default function Article({ article }) {
  return <TemplateResolver page={article} />
}
