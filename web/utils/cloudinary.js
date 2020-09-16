import { aspect } from '../styles/themes'

export const CLOUDINARY_CLOUD_NAME = 'heydaysoslo'

export const cldVideoFormats = [
  {
    format: 'video/webm',
    ext: 'webm'
  },
  {
    format: 'video/mp4',
    ext: 'mp4'
  },
  {
    format: 'video/ogg',
    ext: 'ogv'
  }
]

export const cldGetVideoUrl = ({ type, public_id }, options) => {
  // const dpr = (typeof window !== undefined && window.devicePixelRatio) || 1
  const transformations = `f_auto,q_auto:best${
    options.blur ? ',e_blur:2000' : ''
  }` // `q_auto:best,dpr_${dpr}`
  return cldVideoFormats.map(({ ext, format }) => {
    return {
      type: format,
      ext,
      src: `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/video/${type}/${transformations}/${public_id}.${ext}`
    }
  })
}

export const getAspect = ratio => {
  if (typeof ratio === 'string' && aspect[ratio]) {
    return aspect[ratio]
  } else if (typeof ratio === 'number') {
    return ratio
  }
}

export const getImageSrc = ({ public_id, format }, aspectRatio) => {
  let transformations = 'f_auto,q_auto'
  if (aspectRatio) {
    transformations += `,ar_${getAspect(aspectRatio)},c_fill`
  }

  // Applying transformations to animated gifs is extremely unstable
  // quick fix to prevent issues
  if (format === 'gif') {
    return {
      empty: `data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7`,
      lqip: `data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7`,
      srcset: `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${public_id}.${format}`,
      noscript: `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${public_id}.${format}`
    }
  }

  return {
    empty: `data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7`,
    lqip: `data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7`,
    // lqip: `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/w_1,f_auto${
    //   aspectRatio ? `,ar_${getAspect(aspectRatio)},c_fill` : ''
    // }/${public_id}`,
    srcset: `
      https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${transformations},w_256/${public_id} 256w,
      https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${transformations},w_512/${public_id} 512w,
      https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${transformations},w_768/${public_id} 768w,
      https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${transformations},w_1024/${public_id} 1024w,
      https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${transformations},w_1280/${public_id} 1280w
    `,
    noscript: `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${transformations},w_1280/${public_id}`
  }
}
