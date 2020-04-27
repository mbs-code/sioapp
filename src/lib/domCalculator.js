const width = function (dom) {
  if (dom) {
    const style = dom.currentStyle || window.getComputedStyle(dom)
    const width = dom.offsetWidth
    const margin = parseFloat(style.marginLeft) + parseFloat(style.marginRight)
    const padding = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight)
    const border = parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth)

    const calcWidth = width + margin - padding + border
    return calcWidth
  }
  return 0
}

export default {
  width
}
