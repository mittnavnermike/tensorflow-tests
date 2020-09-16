// import React from 'react'
// import { Helmet } from 'react-helmet'
// import { graphql, useStaticQuery } from 'gatsby'
// import { GatsbySeo, ArticleJsonLd } from 'gatsby-plugin-next-seo'
// import { getOgType } from '../routes'
// import { toPlainText } from '../utils/helpers'
// import useLinkResolver from './hooks/useLinkResolver'

// /*
// Opengraph: https://ogp.me/#types

// TODO:

// Add JsonLd types for
// - Blog
// - BlogPost
// - Article (done)
// - Local Business
// - Logo
// - Breadcrumb (maybe)
// Docs: https://www.gatsbyjs.org/packages/gatsby-plugin-next-seo/

// All pages should have a "last updated" tag (?)

// */

// const truncateString = (string, maxLength = 158) => {
//   if (!string) return null
//   if (string.length < maxLength) {
//     return string
//   }
//   return `${string.substring(0, maxLength)}…`
// }

// const getLastValidOverride = (arr, key) => {
//   let val
//   for (let i = 0; i < arr.length; i++) {
//     if (arr[i] && arr[i][key]) {
//       val = arr[i][key]
//     }
//   }
//   return val
// }

// // const getTitleFromTemplate = (template, title) => {
// //   return template.replace(/%s/g, title)
// // }

// // const getDescription = (page, sanitySiteSettings) => {
// //   console.log(page.seo)
// //   if (sanitySiteSettings.description) return ''
// // }

// const normalizePageKeys = page => {
//   // Normalize page props to seo props
//   const normalizedPage = Object.assign({}, page)
//   if (!normalizedPage.description) {
//     if (normalizedPage.body) {
//       normalizedPage.description = toPlainText(normalizedPage.body)
//     }
//     // What about pagebuilders?
//   }
//   if (normalizedPage.description) {
//     normalizedPage.description = truncateString(normalizedPage.description)
//   }
//   return normalizedPage
// }

// const SEO = ({ page }) => {
//   const data = useStaticQuery(query)
//   const canonical = useLinkResolver(page, { canonical: true })
//   const { sanityCompanyInfo, sanitySiteSettings } = data
//   if (!page) {
//     return null
//   }

//   const ogType = getOgType(page)
//   const locale = sanitySiteSettings?.locale || 'en_US'
//   // const { type, slug, getUrl, authors, publishDate, id } = props

//   // if (!type) {
//   //   console.info(`Type is missing. We need this to make the SEO. Type: ${type}`)
//   //   return null
//   // }

//   // const ogType = type === 'article' ? 'article' : 'website'

//   /**
//    * Get meta tag overrides recursively, starting from global site settings
//    */
//   const pageExtract = normalizePageKeys(page)
//   const sources = [sanitySiteSettings?.seo, pageExtract, page.seo]
//   const description = getLastValidOverride(sources, 'description')
//   const title = getLastValidOverride(sources, 'title')
//   const image = getLastValidOverride(sources, 'image')

//   const openGraph = {
//     url: canonical,
//     title: title,
//     description: description,
//     type: ogType,
//     locale: locale,
//     site_name: sanityCompanyInfo?.name,
//     images: image?.asset?.fixed && [
//       {
//         url: image.asset.fixed.src,
//         width: image.asset.fixed.width,
//         height: image.asset.fixed.height
//       }
//     ]
//   }

//   /**
//    * Set all props to objects to allow debugging
//    */
//   const gatsbySeoProps = {
//     titleTemplate: `%s » ${sanityCompanyInfo?.name}`,
//     title: title,
//     canonical: canonical,
//     openGraph: openGraph,
//     facebook: { appId: sanitySiteSettings?.facebookAppId },
//     twitter: {
//       handle: `@${sanityCompanyInfo?._rawSocial?.twitter.split('/').pop()}`,
//       cardType: 'summary_large_image'
//     }
//   }

//   //
//   const articleJsonProps = {
//     url: canonical,
//     headline: title,
//     description,
//     images: image?.asset?.fixed && [
//       {
//         '@type': 'ImageObject',
//         url: image.asset.fixed.src,
//         width: image.asset.fixed.width,
//         height: image.asset.fixed.height
//       }
//     ],
//     datePublished: page.publishDate,
//     publisherName: sanityCompanyInfo?.name,
//     publisherLogo: null,
//     authorName: page?.authors && page?.authors[0]?.person?.name,
//     authorType: 'Person'
//   }

//   return (
//     <>
//       {/* <pre>{JSON.stringify(gatsbySeoProps, null, 2)}</pre>
//       <pre>{JSON.stringify(articleJsonProps, null, 2)}</pre> */}
//       <GatsbySeo {...gatsbySeoProps} />
//       {ogType === 'article' && <ArticleJsonLd {...articleJsonProps} />}
//       {/* Rich result for article */}
//       {/* https://schema.org/LocalBusiness */}
//       {/* {type === 'article' && (
//         <ArticleJsonLd
//           url={canonicalUrl && canonicalUrl}
//           headline={title && title}
//           images={
//             image?.asset?.fixed && [
//               {
//                 '@type': 'ImageObject',
//                 url: image.asset.fixed.src,
//                 width: image.asset.fixed.width,
//                 height: image.asset.fixed.height
//               }
//             ]
//           }
//           datePublished={publishDate && publishDate}
//           publisherName={sanityCompanyInfo?.name}
//           publisherLogo="https://www.example.com/photos/logo.jpg"
//           authorName={authors && authors[0]?.person?.name}
//           authorType="Person"
//           description={description && description}
//           overrides={{
//             // '@type': 'BlogPosting', // set's this as a blog post.
//             author: authors?.reduce((acc, author) => {
//               acc.push({
//                 '@type': 'Person',
//                 name: author?.person?.name || '',
//                 jobTitle: author?.person?.role || '',
//                 image: {
//                   '@type': 'ImageObject',
//                   url: author?.person?.image?.asset?.url || '',
//                   width:
//                     author?.person?.image?.asset?.metadata?.dimensions?.width,
//                   height:
//                     author?.person?.image?.asset?.metadata?.dimensions?.height
//                 }
//               })
//               return acc
//             }, [])
//           }}
//         />
//       )} */}

//       {/*
//       Rich result for article.
//       Only show on frontpage.
//       https://schema.org/LocalBusiness
//        */}
//       {/* {sanitySiteSettings?._rawFrontpage?.id === id && (
//         <LocalBusinessJsonLd
//           type="LocalBusiness"
//           id={sanitySiteSettings?.siteUrl || ''}
//           name={
//             sanityCompanyInfo?.name ||
//             sanitySiteSettings?._rawSeo?.siteName ||
//             ''
//           }
//           description={sanitySiteSettings?._rawSeo?.description}
//           url={canonicalUrl}
//           telephone={sanityCompanyInfo?.phone || ''}
//           address={{
//             streetAddress: sanityCompanyInfo?._rawAddress?.streetAddress || '',
//             addressLocality: sanityCompanyInfo?._rawAddress?.city || '',
//             addressRegion: sanityCompanyInfo?._rawAddress?.region || '',
//             postalCode: sanityCompanyInfo?._rawAddress?.postCode || '',
//             addressCountry: sanityCompanyInfo?._rawAddress?.country || ''
//           }}
//           geo={{
//             latitude: sanityCompanyInfo?.lat || '',
//             longitude: sanityCompanyInfo?.lng || ''
//           }}
//           images={[
//             {
//               '@type': 'ImageObject',
//               url: sanitySiteSettings?.seo?.image?.asset?.fixed?.src,
//               width: sanitySiteSettings?.seo?.image?.asset?.fixed?.width,
//               height: sanitySiteSettings?.seo?.image?.asset?.fixed?.height
//             }
//           ]}
//         />
//       )} */}
//       <Helmet>
//         <html lang={locale.includes('_') ? locale.split('_')[0] : locale} />
//       </Helmet>
//     </>
//   )
// }

// export default SEO

// const query = graphql`
//   fragment SEO on SanitySeo {
//     title
//     description
//     cldImage {
//       ...CloudinaryImage
//     }
//   }
//   {
//     sanityCompanyInfo {
//       _rawSocial(resolveReferences: { maxDepth: 10 })
//       email
//       name
//       phone
//     }
//     sanitySiteSettings(_id: { eq: "siteSettings" }) {
//       locale
//       siteUrl
//       facebookAppId
//       _rawFrontpage(resolveReferences: { maxDepth: 10 })
//       _rawSeo(resolveReferences: { maxDepth: 10 })
//       seo {
//         ...SEO
//       }
//     }
//   }
// `
import Head from 'next/head'
// Maybe use: https://github.com/garmeeh/next-seo

const SEO = props => {
  // const { page } = props
  // const { title } = page
  return <Head>{/* <title>{title}</title> */}</Head>
}

export default SEO
