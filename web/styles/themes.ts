import { css, DefaultTheme } from 'styled-components'

import { remSize } from './utilities/Converters'
import { BorderProps } from '../types'

export const colors = {
  primary: 'red',
  secondary: 'green',
  text: 'black',
  border: 'black',
  background: 'white'
}

export const breakpoints = {
  xs: 0,
  sm: 550,
  md: 870,
  lg: 1200,
  xl: 1600,
  xxl: 1800
}

export const spacingUnit = {
  xs: remSize(5),
  sm: remSize(10),
  md: remSize(15),
  lg: remSize(40),
  xl: remSize(80),
  section: remSize(160),
  gutter: remSize(40)
}

export const responsiveSpacing = {
  xs: {
    xs: remSize(5),
    lg: remSize(10)
  },
  sm: {
    xs: remSize(10),
    lg: remSize(15)
  },
  md: {
    xs: remSize(15),
    lg: 'lg'
  },
  lg: {
    xs: 'lg',
    lg: '12rem'
  },
  section: {
    xs: remSize(100)
  },
  gutter: {
    xs: 'md',
    lg: 'gutter'
  },
  container: {
    xs: '10px',
    md: 'lg',
    lg: '5vw'
  },
  pixel: {
    xs: '1px'
  }
}

export const grid = {
  columns: 12
}

export const fontFamily = {
  sans: `'SuisseIntl', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
  Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;`,
  serif: `'Suisse Works', times, serif`
}

const fontDefs = {
  xs: '16px/1.2'
}

export const responsiveFonts = {
  small: fontDefs.xs,
  body: {
    xs: fontDefs.xs,
    lg: '18px/1.2'
  },
  title: {
    xs: fontDefs.xs,
    lg: '24px/1.2'
  },
  h1: {
    xs: {
      size: '40px/50px',
      css: css`
        text-transform: uppercase;
      `
    },
    lg: '60px/1.2'
  },
  h2: {
    xs: '24px/1.2',
    lg: '40px/1.2'
  },
  h3: {
    xs: fontDefs.xs,
    lg: '24px/1.2'
  }
}

export const aspect = {
  portrait: 7 / 6,
  landscape: 2 / 3,
  square: 1,
  widescreen: 9 / 16,
  panorama: 11 / 16
}

export const contentWidth = {
  small: remSize(600),
  large: remSize(1200)
}

export const icons = {
  small: remSize(40),
  medium: remSize(80),
  large: remSize(160)
}

export const trans = {
  fast: `0.1s ease`,
  slow: `1s ease`
}

export const borderWidth = {
  small: remSize(1),
  large: remSize(3)
}

export const border = {
  large: (prop: BorderProps) => ({ theme }: { theme: DefaultTheme }) => css`
    ${prop}: ${theme.borderWidth.large} solid ${theme.colors.border};
  `,
  small: (prop: BorderProps) => ({ theme }: { theme: DefaultTheme }) => css`
    ${prop}: ${theme.borderWidth.small} solid ${theme.colors.border};
  `
}

export const theme: DefaultTheme = {
  colors,
  breakpoints,
  spacingUnit,
  grid,
  fontFamily,
  aspect,
  responsiveFonts,
  contentWidth,
  trans,
  icons,
  borderWidth,
  border
}

export const darkTheme = {
  ...theme,
  colors: {
    primary: 'green',
    secondary: 'orange',
    text: 'white',
    border: 'red',
    background: 'rgba(0,0,0,.8)'
  },
  defaultStyle: ({ theme }) => css`
    body {
      background: ${theme?.colors?.background};
    }
  `
}

export default theme
