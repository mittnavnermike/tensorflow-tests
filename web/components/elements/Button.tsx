import React from 'react'
import styled, { css } from 'styled-components'
import { bp, color, applyModifier } from '../../styles/utilities'

type Modifiers = 'secondary' | 'small' | 'active'

type Props = {
  children: React.ReactNode
  className?: string
  modifiers?: Modifiers | Modifiers[] | undefined
  onClick?: () => void
}

const Button: React.FC<Props> = ({ children, className, ...props }) => {
  return (
    <button
      className={className}
      onMouseDown={e => e.preventDefault}
      {...props}
    >
      {children}
    </button>
  )
}

export default styled(Button)<Props>(
  // @ts-ignore
  ({ theme }) => css`
    appearance: none;
    background: none;
    display: inline-block;
    border: 2px solid transparent;
    background-color: ${theme.colors.text};
    color: ${theme.colors.background};
    font-size: 2rem;
    padding: 20px;
    transition: 0.15s ease background-color, color;
    cursor: pointer;

    &:hover {
      background-color: white;
      color: black;
      border-color: black;
    }

    ${bp.above.md`
      background: orange;
    `}

    ${applyModifier(
      'small',
      css`
        padding: 0;
      `
    )}

    ${applyModifier(
      'active',
      css`
        background: orange;
      `
    )}
  `
)
