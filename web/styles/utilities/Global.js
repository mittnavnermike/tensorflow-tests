import { createGlobalStyle, css } from 'styled-components'
import themes from '../themes'
import { bp } from './Breakpoints'
import { fonts, globalTypeStyle } from './Typography'
import { spacing } from './Spacing'

export const GlobalStyle = createGlobalStyle(
  ({ theme }) => css`
    html {
      font-size: 62.5%;
    }

    body {
      overflow-x: hidden;
      font-family: ${theme.fontFamily.sans};
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      color: ${theme.colors.text};
      ${fonts.body()}
    }

    ::selection {
      background: ${theme.colors.primary};
      color: white;
    }

    #___gatsby {
      transition: background-color 300ms ease;
    }

    figure {
      margin: 0;
      position: relative;
    }

    img {
      max-width: 100%;
      height: auto;
      vertical-align: middle; /*  remove space above/below images */
    }

    [role='button'] {
      cursor: pointer;
    }

    button {
      cursor: pointer;
      appearance: none;
      border-radius: 0;
      background: none;
      color: currentColor;
      font-size: inherit;
      border: none;
      padding: 0;
      vertical-align: baseline;
      font-family: ${theme.fontFamily.sans};
      ${fonts.body()};

      &:disabled {
        cursor: default;
      }
    }

    select {
      cursor: pointer;
      appearance: none;
      border: none;
      background: none;
      font-family: ${theme.fontFamily.sans};

      ${fonts.body()}
    }

    input {
      appearance: none;
      margin: 0;
      padding: 0;
      border-radius: 0;
    }

    input[type='number'] {
      appearance: textfield;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      appearance: none;
    }

    hr {
      height: ${theme.borderWidth.large};
      width: 100%;
      background: ${theme.colors.border};
      border: none;
    }

    summary {
      cursor: pointer;
    }

    ul {
      list-style: none;
    }

    /* Typography */
    ${globalTypeStyle}

    /* Global styling from theme */
    ${theme.defaultStyle && theme.defaultStyle}

    /* Add visible tag that shows breakpoint for dev environment */
    ${process.env.NODE_ENV === 'development' &&
      css`
    body:after {
      background: rgba(255, 255, 255, 0.5);
      position: fixed;
      bottom: 0;
      left: 0;
      ${spacing.xs('py,px')}
      ${fonts.body()}

      ${Object.keys(themes.breakpoints).map(
        key =>
          css`
            ${bp.above[key]`content: '${key}';`}
          `
      )}
    }
  `}
  `
)
