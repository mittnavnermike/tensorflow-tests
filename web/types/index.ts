import { CSSProp } from 'styled-components'

export type FlexBoxAlignItems =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'baseline'
  | 'stretch'

export type FlexBoxJustifyContent =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'

export type SpacingMixins =
  | 'm'
  | 'ml'
  | 'mt'
  | 'mr'
  | 'mb'
  | 'my'
  | 'mx'
  | 'p'
  | 'pl'
  | 'pt'
  | 'pr'
  | 'pb'
  | 'py'
  | 'px'
  | 'gap'
  | string

export type ResponsiveColumns = {
  xs?: number
  sm?: number
  md?: number
  lg?: number
  xl?: number
  xxl?: number
}

export type ResponsiveReverse = {
  xs?: boolean
  sm?: boolean
  md?: boolean
  lg?: boolean
  xl?: boolean
  xxl?: boolean
}

export type BorderProps =
  | 'border'
  | 'border-top'
  | 'border-right'
  | 'border-bottom'
  | 'border-left'

export type SpacingUnits =
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | 'section'
  | 'gutter'

export type BreakPoints = {
  xs?: number
  sm?: number
  md?: number
  lg?: number
  xl?: number
  xxl?: number
}

export type FontDeclarationObject = {
  [key: string]:
    | string
    | {
        size: string
        css?: CSSProp
      }
}

export type FontDeclaration = string | FontDeclarationObject

export type responsiveFontDeclaration = {
  [key: string]: FontDeclaration
}
