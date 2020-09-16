import React from 'react'
import styled, { css } from 'styled-components'
import { motion } from 'framer-motion'
import { transitions } from '../../../utils/animation'
import { nanoid } from 'nanoid'

const ID = nanoid(10)

const Stagger = ({
  className,
  children,
  type = 'fadeInUp',
  childrenClassName = '',
  ...props
}) => {
  return (
    <motion.div
      className={className}
      variants={transitions.stagger}
      initial="initial"
      animate="animate"
      exit="initial"
      {...props}
    >
      {children.map((child, i) => {
        return (
          <motion.div
            className={childrenClassName}
            key={`stagger-child-${ID}-${i}`}
            variants={transitions[type]}
          >
            {child}
          </motion.div>
        )
      })}
    </motion.div>
  )
}

export default styled(Stagger)(({ theme }) => css``)
