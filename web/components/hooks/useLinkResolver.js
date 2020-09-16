import { resolveRoute } from '../../routes'
import { removeTrailingSlash } from 'utils/helpers'

// const query = graphql`
//   {
//     site {
//       siteMetadata {
//         siteUrl
//       }
//     }
//     sanitySiteSettings(_id: { eq: "siteSettings" }) {
//       frontpage {
//         _id
//       }
//     }
//   }
// `

function useLinkResolver(page, options) {
  if (!page) {
    console.warn('Page not provided. Can not resolve link')
    return null
  }

  // if (frontPageId === page?._id) {
  //   return '/'
  // }

  let url = resolveRoute(page)

  if (url && options?.canonical) {
    url = `${removeTrailingSlash(siteUrl)}${url}`
  }

  return url
}

export default useLinkResolver
