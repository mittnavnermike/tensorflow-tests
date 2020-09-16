export const mapEdgesToNode = data =>
  data.edges ? data.edges.map(edge => edge.node) : []

export const getReadTime = blocks => {
  let readTime = 1
  if (blocks) {
    const text = blocks.reduce((res, block, index) => {
      if (block._type === 'block') {
        res += ' ' + block.children.map(child => child.text).join(' ')
      }
      return res
    }, '')
    const wordAmount = text.split(' ').length
    const images = blocks.map(block => block._type === 'figure').length

    readTime = Math.floor(wordAmount / 275 + images * 0.12)
  }

  return readTime > 0 ? readTime : '1'
}

const defaults = { nonTextBehavior: 'remove' }

export const blocksToText = (blocks, opts = {}) => {
  const options = Object.assign({}, defaults, opts)
  return blocks
    .map(block => {
      if (block._type !== 'block' || !block.children) {
        return options.nonTextBehavior === 'remove'
          ? ''
          : `[${block._type} block]`
      }

      return block.children.map(child => child.text).join('')
    })
    .join('\n\n')
}
