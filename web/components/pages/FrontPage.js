import React, { useState, useEffect, useRef } from 'react'
import styled, { css } from 'styled-components'

import Container from '@heydays/Container'
import HandDetector from 'components/HandDetector'
import useCanvas from '@heydays/useCanvas'
import FaceDetector from 'components/FaceDetector'

const FrontPage = ({ className, title, pagebuilder }) => {
  const videoEl = useRef(null)
  const canvas = useRef(null)
  const { c, width, height } = useCanvas({ canvas, container: videoEl })
  console.log('FrontPage -> c', c)

  const [videoHasLoaded, setVideoHasLoaded] = useState(false)

  useEffect(() => {
    if (!videoEl) {
      return
    }
    navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
      let video = videoEl.current
      video.srcObject = stream
      video.play()
    })

    const handleVideoLoad = () => {
      setVideoHasLoaded(true)
    }

    videoEl.current.addEventListener('loadeddata', handleVideoLoad, {
      passive: true
    })

    return () => {
      videoEl.current.removeEventListener('loadeddata', handleVideoLoad, {
        passive: true
      })
    }
  }, [videoEl])

  return (
    <div className={className}>
      <Container className="Page__container">
        <video ref={videoEl} />
        <canvas ref={canvas} />

        {videoHasLoaded && <HandDetector c={c} />}
        {videoHasLoaded && c && <FaceDetector c={c} />}
      </Container>
    </div>
  )
}

export default styled(FrontPage)(
  ({ theme }) => css`
    .Page__container {
      position: relative;
    }
    canvas {
      position: absolute;
      top: 0;
      left: 0;
    }
    video {
      width: 100%;
    }
  `
)
