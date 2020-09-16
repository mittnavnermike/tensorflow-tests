import Color from 'color'

export const color = color => Color(color).hex()

color.darken = (color, percent) =>
  Color(color)
    .darken(percent)
    .hex()
color.lighten = (color, percent) =>
  Color(color)
    .lighten(percent)
    .hex()
color.rotate = (color, degree) =>
  Color(color)
    .rotate(degree)
    .hex()
color.rgba = (color, alpha) =>
  Color(color)
    .alpha(alpha)
    .string()
color.hsla = (color, alpha) =>
  Color(color)
    .alpha(alpha)
    .hsl()
    .string()
color.isDark = color => Color(color).isDark()
color.isLight = color => Color(color).isLight()

export const createTints = (startColor, steps = 10) => {
  const increment = 100 / steps
  const color = Color(startColor).hsl()
  return [...new Array(steps)].map((step, i) => {
    color.color[2] = increment * (i + 1)
    return color.hex()
  })
}

export const createMixColorSteps = (startColor, endColor, steps = 10) => {
  const increment = 1 / steps
  const color = Color(startColor)
  return [...new Array(steps)].map((step, i) => {
    return color.mix(Color(endColor), increment * (i + 1))
  })
}
