import React from 'react'
import styled, { css } from 'styled-components'
import { spacing } from '../../styles/utilities'

const Container = ({ children, className }) => {
  return <div className={className}>{children}</div>
}

export default styled(Container)(
  ({ theme }) => css`
    max-width: 100%;
    ${spacing.container('mx')}
  `
)
