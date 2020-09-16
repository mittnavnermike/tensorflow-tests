import { css, CSSObject } from 'styled-components'

import { responsiveFonts } from '../themes'
import { remSize } from './Converters'
import { bp } from './Breakpoints'

const px2LineHeight = (size, lineheight) => {
  if (!size.includes('px') || !lineheight.includes('px')) {
    console.warn(
      `px2LineHeight() assumes px values. Size or lineheight is not spesified in px. Was ${size} ${lineheight}`
    )
  }
  return (
    Math.round(
      (parseFloat(lineheight) / parseFloat(size) + Number.EPSILON) * 100
    ) / 100
  )
}

export const createFontSizeAndLineHeight = size => {
  const [fz, lh] =
    typeof size === 'object' ? size.size.split('/') : size.split('/')
  const fzUnit = fz.replace(/[0-9]/g, '').trim()
  const fzVal = parseFloat(fz)
  const lhUnit = lh.replace(/[0-9]/g, '').trim()
  return css`
    font-size: ${fzUnit === 'px' ? remSize(fzVal) : fz};
    line-height: ${lhUnit === 'px' ? px2LineHeight(fz, lh) : lh};
    ${size.css && size.css}
  `
}

type fonts = {
  small?: () => CSSObject
  body?: () => CSSObject
  h1?: () => CSSObject
  h2?: () => CSSObject
  h3?: () => CSSObject
  h4?: () => CSSObject
  h5?: () => CSSObject
  title?: () => CSSObject
  display?: () => CSSObject
}

const fontFuncs = Object.keys(responsiveFonts).reduce((acc, key) => {
  acc[key] = () => ({ theme }) => {
    if (theme?.responsiveFonts.hasOwnProperty(key)) {
      const val = theme.responsiveFonts[key]
      return typeof val === 'string'
        ? createFontSizeAndLineHeight(val)
        : Object.keys(val).map(bpKey => {
            return bp.above[bpKey]`
        ${createFontSizeAndLineHeight(val[bpKey])}
        `
          })
    }
  }
  return acc
}, {})

export const fonts: fonts = fontFuncs

export const globalTypeStyle = ({ theme }) => css`
  html {
    font-size: 62.5%;
  }

  h1,
  h2,
  h3,
  h4 {
    font-weight: normal;
  }

  body {
    overflow-x: hidden;
    font-family: ${theme.fontFamily.serif};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: ${theme.colors.text};
    font-size: 1.8rem;
    ${bp.above.md`
      font-size: 2.4rem;
    `}
  }

  ::selection {
    background: ${theme.colors.primary};
    color: white;
  }

  strong {
    font-weight: bold;
  }

  *:focus {
    outline-color: ${theme.colors.primary};
  }

  a {
    font-family: ${theme.fontFamily.serif};
    cursor: pointer;
    position: relative;
    text-decoration: none;
    color: blue;
    &:hover {
      color: deeppink;
    }
  }

  .link {
    display: inline-block;
    border-bottom: ${theme.colors.secondary};
    transition: border-color ${theme.trans.fast};

    &:hover {
      border-color: transparent;
    }
  }

  .sans {
    font-family: ${theme.fontFamily.sans};
  }

  .serif {
    font-family: ${theme.fontFamily.serif};
  }
`
