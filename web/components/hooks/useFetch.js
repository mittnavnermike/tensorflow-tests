import { useState, useEffect, useRef } from 'react'

/**
 *
 * @param { string | Array } url
 * @param { object } options
 *
 * Usage:
 * const {response, error, isLoading} = useFetch(`https://api.kanye.rest`)
 *
 * => { "quote": "Only free thinkers" }
 *
 *
 * fetch multiple
 *
 * const { response, error, isLoading } = useFetch({
 *  rss: `https://api.rss2json.com/v1/api.json?rss_url=`,
 *  kanye: `https://api.kanye.rest`,
 *  oembed: {
 *    url: '/.netlify/functions/oembed'
 *    options: {
 *      method: 'POST',
 *      body: JSON.stringify({ url: 'https://www.youtube.com/watch?v=hHW1oY26kxQ' })
 *    }
 *  },
 * })
 *
 * => {
 *  "rss": { "status": "error", "message": "`rss_url` parameter must be a valid url." },
 *  "kanye": { "quote": "Distraction is the enemy of vision" }
 *  "oembed": { ... }
 * }
 *
 * We're only handling one set options. If you're doing post one and get on another.
 * I would suggest splitting into two useFetch
 */

const useFetch = (url, options = {}) => {
  const [response, setResponse] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAllDone, setIsAllDone] = useState(
    typeof url === 'object' ? Object.keys(url).length : null
  )
  const refUrl = useRef(url)
  const refOptions = useRef(options)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const request = await fetch(refUrl.current, refOptions.current)
        const data = await request.json()
        setResponse(data)
        setIsLoading(false)
      } catch (error) {
        setError(error)
      }
    }
    async function fetchMultipleData(urls) {
      const keys = Object.keys(urls)
      keys.forEach(async (key, i) => {
        try {
          const hasOptions = urls[key].hasOwnProperty('options')
          console.log({ options: hasOptions ? urls[key].options : null })
          const request = await fetch(
            [hasOptions ? urls[key].url : urls[key]], // Pass correct url
            hasOptions ? urls[key].options : null // Pass optional options
          )
          const data = await request.json()
          setResponse(response =>
            Object.assign(
              {},
              {
                ...response,
                [key]: data
              }
            )
          )
          setIsLoading(false)
          setIsAllDone(c => c - 1)
        } catch (error) {
          setError(error)
          setIsLoading(false)
          setIsAllDone(c => c - 1)
        }
      })
    }
    if (typeof refUrl.current === 'string') {
      fetchData()
    } else {
      fetchMultipleData(refUrl.current)
    }
  }, [refUrl, refOptions]) // tslint disable exhaustive-deps

  return {
    response,
    error,
    isLoading: typeof url === 'object' ? isAllDone !== 0 : isLoading
  }
}

export default useFetch
