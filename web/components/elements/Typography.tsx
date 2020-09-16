import styled, { css } from 'styled-components'

import { applyModifier, fonts } from '../../styles/utilities'

type Modifiers = 'large' | 'small'

type Props = {
  modifiers?: Modifiers | Modifiers[]
}

export const P = styled.p(
  ({ theme }) => css`
    ${fonts?.body?.()}

    ${applyModifier(
      'small',
      css`
        font-size: 0.8rem;
      `
    )}
    ${applyModifier(
      'large',
      css`
        font-size: 2rem;
      `
    )}
  `
)

export const H1 = styled.h1(
  ({ theme }) => css`
    ${fonts.h1?.()}
  `
)

export const H2 = styled.h2(
  ({ theme }) => css`
    ${fonts.h2?.()}
  `
)

export const H3 = styled.h3(
  ({ theme }) => css`
    ${fonts.title?.()}
  `
)
