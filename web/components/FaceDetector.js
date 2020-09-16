import { useEffect } from 'react'
import styled, { css } from 'styled-components'
import * as blazeface from '@tensorflow-models/blazeface'
import '@tensorflow/tfjs-backend-webgl' // handpose does not itself require a backend, so you must explicitly install one.

const FaceDetector = ({ className, c }) => {
  useEffect(() => {
    async function main() {
      const video = document.querySelector('video')

      // Load the model
      const model = await blazeface.load()

      async function predictFace(model, video) {
        const returnTensors = false // Pass in `true` to get tensors back, rather than values.
        const predictions = await model.estimateFaces(video, returnTensors)
        console.log('predictFace -> predictions', predictions)

        if (predictions.length > 0) {
          /*
          `predictions` is an array of objects describing each detected face, for example:

          [
            {
              topLeft: [232.28, 145.26],
              bottomRight: [449.75, 308.36],
              probability: [0.998],
              landmarks: [
                [295.13, 177.64], // right eye
                [382.32, 175.56], // left eye
                [341.18, 205.03], // nose
                [345.12, 250.61], // mouth
                [252.76, 211.37], // right ear
                [431.20, 204.93] // left ear
              ]
            }
          ]
          */
          c.clearRect(0, 0, 1000, 1000)
          for (let i = 0; i < predictions.length; i++) {
            // const start = predictions[i].topLeft
            // const end = predictions[i].bottomRight
            // const size = [end[0] - start[0], end[1] - start[1]]

            // // Render a rectangle over each detected face.
            // c.strokeRect(start[0], start[1], size[0], size[1])
            for (let j = 0; j < predictions[i].landmarks.length - 2; j++) {
              const landmark = predictions[i].landmarks[j]
              c.beginPath()
              c.arc(landmark[0], landmark[1], 10, 0, 2 * Math.PI)
              c.fill()
            }
          }
        }
        window.requestAnimationFrame(() => predictFace(model, video))
      }
      predictFace(model, video)
    }
    main()
  }, [])

  return null
}

export default styled(FaceDetector)(({ theme }) => css``)
