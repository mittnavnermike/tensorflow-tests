import { css, CSSObject } from 'styled-components'
import { spacing } from './Spacing'

/**
 * 'mb', '20px' => 'margin-botton: 20px'
 * 'mb, ml', '20px' => 'margin-botton: 20px; margin-left: 20px'
 * 'mb', spacing.xs => 'margin-bottom: 1rem'
 *
 * @param {*} propsString string of spacing mixins (my, mx, pb...)
 * @param {*} value the value you want to insert for the props
 */

export const addSpacingProps = (propsString = 'mb', value) => {
  if (typeof propsString !== 'string') {
    console.log(
      `addSpacingProps propsString needs to be a string was ${typeof propsString}`,
      propsString,
      value
    )
    return null
  }
  const props = propsString.split(',').map(prop => prop.trim())
  return css`
    ${props.map(prop => {
      if (!spacing[prop]) {
        console.warn(
          `addSpacingProp: the method ${prop} does not exist on spacing`
        )
        return null
      }
      return spacing[prop](value)
    })}
  `
}

export const addProps = (propsString, value) => {
  const props = propsString.split(',').map(prop => prop.trim())
  return css`
    ${props.map(
      prop => css`
        ${prop}: ${value};
      `
    )}
  `
}

/**
 * Parses css unit and returns object with number and unit separated
 * @param {string|number} cssUnit CSS length unit (1em, 2rem, 3vh, 4vw, 100%, ...)
 * @returns {object} float and unit separated {number:float, unit:string}
 */
export const parseCssUnit = cssUnit => {
  const number = parseFloat(cssUnit)
  // Leave early if a unitless number is passed
  if (!isNaN(cssUnit)) {
    return { number, unit: '' }
  }
  const unit = cssUnit.replace(/^[-\d.]+/, '')
  return { number, unit }
}

export const applyModifier = (modifier, css) => ({ modifiers }) => {
  console.log('applyModifier -> modifiers', modifiers)
  if (!modifiers) return null
  return modifiers === modifier || modifiers.includes(modifier) ? css : null
}
