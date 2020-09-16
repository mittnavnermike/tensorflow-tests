import React from 'react'
import styled, { css } from 'styled-components'
import { motion } from 'framer-motion'
import { transitions } from '../../../utils/animation'

const Animate = ({ className, children, type = 'fadeInUp' }) => {
  return (
    <motion.div
      className={className}
      {...transitions[type]}
      exit={transitions[type.initial]}
    >
      {children}
    </motion.div>
  )
}

export default styled(Animate)(({ theme }) => css``)
