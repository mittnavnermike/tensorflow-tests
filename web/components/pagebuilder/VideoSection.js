/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react'
import styled, { css } from 'styled-components'

const VideoSection = ({ className, video }) => {
  const newVideo = video && JSON.parse(video)
  return (
    <div className={className}>
      <video controls>
        <source src={newVideo.value.files[0].link} />
      </video>
    </div>
  )
}

export default styled(VideoSection)(
  ({ theme }) => css`
    video {
      max-width: 100%;
      width: 100%;
    }
  `
)
