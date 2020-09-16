import React from 'react'
import styled, { css } from 'styled-components'
import { motion } from 'framer-motion'
import Emoji from './Emoji'

const Switch = ({ className, onClick, state, size }) => {
  return (
    <button
      className={className}
      onClick={onClick}
      onMouseDown={e => e.preventDefault()}
    >
      <motion.div
        className="inner"
        animate={
          state ? { background: 'darkslategray' } : { background: 'cornsilk' }
        }
      >
        <motion.div
          className="switch"
          whileHover={{ scale: 1.25 }}
          whileTap={{ scale: 1.1 }}
          animate={state ? { x: size - size / 2.2 } : { x: 0 }}
        >
          <Emoji>{state ? '🌚' : '🌝'}</Emoji>
        </motion.div>
      </motion.div>
    </button>
  )
}

export default styled(Switch)(
  ({ theme, size = 150 }) => css`
    font-size: ${size / 2.2}px;
    line-height: 1.1;
    display: flex;
    /* align-items: center; */

    .inner {
      width: ${size}px;
      border-radius: ${size / 2.2}px;
      margin: 0 ${size / 4};
    }

    .switch {
      position: relative;
      width: ${size / 2.2}px;
      height: ${size / 2.2}px;
      border-radius: ${size / 2.2}px;

      &:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        transform: translateX(-50%);
        height: 100%;
        width: ${size * 2}px;
        z-index: -1;
      }
    }
  `
)
