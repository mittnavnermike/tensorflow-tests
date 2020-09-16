import React, { useEffect, useRef } from 'react'
import * as handpose from '@tensorflow-models/handpose'
import styled, { css } from 'styled-components'
import '@tensorflow/tfjs-backend-webgl' // handpose does not itself require a backend, so you must explicitly install one.

const HandDetector = ({ className, c }) => {
  useEffect(() => {
    async function main() {
      const video = document.querySelector('video')

      // Load the MediaPipe handpose model.
      const model = await handpose.load()

      async function predictHands(model, video, canvas) {
        // Pass in a video stream (or an image, canvas, or 3D tensor) to obtain a
        // hand prediction from the MediaPipe graph.
        const predictions = await model.estimateHands(video)

        if (predictions.length > 0) {
          /*
        `predictions` is an array of objects describing each detected hand, for example:
        [
          {
            handInViewConfidence: 1, // The probability of a hand being present.
            boundingBox: { // The bounding box surrounding the hand.
              topLeft: [162.91, -17.42],
              bottomRight: [548.56, 368.23],
            },
            landmarks: [ // The 3D coordinates of each hand landmark.
              [472.52, 298.59, 0.00],
              [412.80, 315.64, -6.18],
              ...
            ],
            annotations: { // Semantic groupings of the `landmarks` coordinates.
              thumb: [
                [412.80, 315.64, -6.18]
                [350.02, 298.38, -7.14],
                ...
              ],
              ...
            }
          }
        ]
        */
          // if (c && predictions) {
          //   const { annotations } = predictions?.[0]
          //   c.fillStyle = 'blue'
          //   c.beginPath()
          //   c.arc(
          //     annotations.indexFinger[0][0],
          //     annotations.indexFinger[0][1],
          //     10,
          //     0,
          //     2 * Math.PI
          //   )
          //   c.stroke()
          // }
          if (c && predictions) {
            const boundingBox = predictions?.[0]?.boundingBox
            const start = boundingBox.topLeft
            const end = boundingBox.bottomRight
            const size = [end[0] - start[0], end[1] - start[1]]

            // Render a rectangle over each detected hand.
            c.strokeRect(start[0], start[1], size[0], size[1])
          }

          // for (let i = 0; i < predictions.length; i++) {
          //   const keypoints = predictions[i].landmarks

          //   // Log hand keypoints.
          //   for (let i = 0; i < keypoints.length; i++) {
          //     const [x, y, z] = keypoints[i]
          //     console.log(`Keypoint ${i}: [${x}, ${y}, ${z}]`)
          //   }
          // }
        }
        window.requestAnimationFrame(() => predictHands(model, video))
      }
      predictHands(model, video)
    }
    main()
  }, [])

  return null
}

export default styled(HandDetector)(({ theme }) => css``)
