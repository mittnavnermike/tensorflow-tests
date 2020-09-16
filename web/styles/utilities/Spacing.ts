import { css } from 'styled-components'

import { responsiveSpacing } from '../../styles/themes'
import { addSpacingProps, parseCssUnit } from './helpers'
import { bp } from './Breakpoints'

const mixinDefs = {
  m: ['margin'],
  ml: ['margin-left'],
  mt: ['margin-top'],
  mr: ['margin-right'],
  mb: ['margin-bottom'],
  my: ['margin-top', 'margin-bottom'],
  mx: ['margin-left', 'margin-right'],

  p: ['padding'],
  pl: ['padding-left'],
  pt: ['padding-top'],
  pr: ['padding-right'],
  pb: ['padding-bottom'],
  py: ['padding-top', 'padding-bottom'],
  px: ['padding-left', 'padding-right'],

  gap: ['grid-gap']
}

const mixins = Object.keys(mixinDefs).reduce((acc, key) => {
  acc[key] = value => ({ theme }) => {
    return css`
      ${mixinDefs[key].map(
        prop => css`
          ${prop}: ${value};
        `
      )}
    `
  }
  return acc
}, {})

/**
 * Structure of reponsiveSpacingDefs obj below
 *
 * [name of function]: {
 *  [breakpoint]: [spacing value (theme.spacing ref || hard value ex: 100px)]
 * }
 *
 */

// const responsiveSpacingDefs = {
//   xs: {
//     xs: 'xs',
//     lg: 'lg'
//   },
//   sm: {
//     xs: 'sm',
//     lg: 'section'
//   },
//   gutter: {
//     xs: 'gutter',
//     lg: 'gutter'
//   }
// }

// const responsiveSpacing = Object.keys(responsiveSpacingDefs).reduce(
//   (acc, key) => {
//     acc[key] = propsString => ({ theme }) => {
//       // turn prop string into array. 'my,mt' => ['my', 'mt']
//       const props = propsString.split(',').map(prop => prop.trim())
//       // get breakpoints with values
//       const breakpoints = responsiveSpacingDefs[key]
//       // Loop over breakpoints to insert values
//       return Object.keys(breakpoints).map(breakpoint => {
//         // Get breakpoint spesific value
//         const value = breakpoints[breakpoint]
//         // Check if value exists in theme ex. if value === 'lg' we have spacing.lg
//         // If value does not correspond to any key in spacing we assume it is a hardcoded value
//         const themeValue = theme.spacing[value]
//         // No breakpoint needed for xs breakpoint
//         return css`
//           ${breakpoint === 'xs' &&
//             props.map(
//               prop =>
//                 css`
//                   ${spacing[prop](themeValue || value)}
//                 `
//             )}
//           ${breakpoint !== 'xs' &&
//             css`
//               ${bp.above[breakpoint]`
//                 ${props.map(
//                   prop =>
//                     css`
//                       ${spacing[prop](themeValue || value)}
//                     `
//                 )}
//               `}
//             `}
//         `
//       })
//     }
//     return acc
//   },
//   {}
// )

//
// spacing.xs('py', {mulitplier: .5, func: val => val * .5})
//

const applyPropValueOptions = (value, options) => {
  // Leave early if we don't have a value
  if (!value) {
    return value
  }
  // Apply multiplier if its a number
  if (!isNaN(options?.multiplier)) {
    const unitParsed = parseCssUnit(value)
    if (unitParsed.number) {
      return `${unitParsed.number * options.multiplier}${unitParsed.unit}`
    }
  }
  return value
}

/**
 * Spacing config proposal
 */

/*

USE:

const responsiveSpacing = {
  container: {
    xs: '10px',
    md: 'lg',
    lg: '5vw'
  }
}

// Basic prop
const Item = styled.div`
  ${spacing.key('my')};
`

// With options
const Item = styled.div`
  ${spacing.key('my,py', {multiplier:0.5})};
`

*/

const spacingConfigMap = Object.keys(responsiveSpacing).reduce((acc, key) => {
  // Make spacing key accessible as object (ie: spacing.gutter)
  acc[key] = (props, options = {}) => ({ theme }) => {
    // Map through all breakpoints for current spacing setting
    return Object.keys(responsiveSpacing[key]).map(bpKey => {
      // value can either be a theme.spacingUnit.key or a regular unit (like 10px)
      const value = responsiveSpacing[key][bpKey]
      // Check if value is a key on the themes spacingUnit, if not use the value
      const unit = theme?.spacingUnit[value] || value
      return bp.above[bpKey]`
          ${addSpacingProps(props, applyPropValueOptions(unit, options))}
        `
    })
  }
  return acc
}, {})

const spacingFunctions = {
  ...mixins,
  ...spacingConfigMap
}

const spacingObject = ({ val, cssProps, multiplier }) => {
  return css`
    ${addSpacingProps(cssProps, applyPropValueOptions(val, { multiplier }))}
  `
}

Object.keys(spacingFunctions).forEach(key => {
  spacingObject[key] = spacingFunctions[key]
})

export const spacing = spacingObject

// export const responsiveSpacing = {
//   xs: (props, options) => ({ theme }) => css`
//     ${addSpacingProps(
//       props,
//       applyPropValueOptions(theme?.spacingUnit?.xs, options)
//     )}

//     ${bp.above.lg`
//       ${addSpacingProps(
//         props,
//         applyPropValueOptions(theme?.spacingUnit?.sm, options)
//       )}
//    `}
//   `,
//   sm: (props, options) => ({ theme }) => css`
//     ${addSpacingProps(
//       props,
//       applyPropValueOptions(theme?.spacingUnit?.sm, options)
//     )}

//     ${bp.above.lg`
//       ${addSpacingProps(
//         props,
//         applyPropValueOptions(theme?.spacingUnit?.md, options)
//       )}
//    `}
//   `,
//   md: (props, options) => ({ theme }) => css`
//     ${addSpacingProps(
//       props,
//       applyPropValueOptions(theme?.spacingUnit?.md, options)
//     )}

//     ${bp.above.lg`
//       ${addSpacingProps(
//         props,
//         applyPropValueOptions(theme?.spacingUnit?.lg, options)
//       )}
//    `}
//   `,
//   lg: (props, options) => ({ theme }) => css`
//     ${addSpacingProps(
//       props,
//       applyPropValueOptions(theme?.spacingUnit?.lg, options)
//     )}
//   `,
//   section: (props, options) => ({ theme }) => css`
//     ${addSpacingProps(
//       props,
//       applyPropValueOptions(theme?.spacingUnit?.section, options)
//     )}
//   `,
//   gutter: (props, options) => ({ theme }) => css`
//     ${addSpacingProps(
//       props,
//       applyPropValueOptions(theme?.spacingUnit?.md, options)
//     )}
//     ${bp.above.lg`
//       ${addSpacingProps(
//         props,
//         applyPropValueOptions(theme?.spacingUnit?.gutter, options)
//       )}
//    `}
//   `
// }
