export const ResourceRenderItem = function (params, api) {
  var y = api.coord([api.value(2), api.value(0)])[1]
  const rowIndex = api.value(0)
  const gridX = params.coordSys.x
  const rectWidth = gridX
  const rectHeight = api.size([0, 1])[1]
  const rowFill = rowIndex % 2 === 0 ? '#FFFFFF' : '#F7F8FA'
  const dotSize = 8
  const centerY = rectHeight / 2
  return {
    type: 'group',
    position: [0, y],
    children: [
      {
        type: 'rect',
        shape: {
          x: 0,
          y: 0,
          width: rectWidth,
          height: rectHeight,
        },
        style: {
          fill: rowFill,
          stroke: '#E5EAF0',
          lineWidth: 1,
        },
      },
      {
        type: 'rect',
        shape: {
          x: 12,
          y: centerY - dotSize / 2,
          width: dotSize,
          height: dotSize,
          r: dotSize / 2,
        },
        style: {
          fill: '#F3B33D',
        },
        silent: true,
      },
      {
        type: 'text',
        style: {
          x: 28,
          y: centerY,
          text: api.value(1),
          verticalAlign: 'middle',
          align: 'left',
          textVerticalAlign: 'middle',
          textAlign: 'left',
          textFill: '#1F2937',
          fontSize: 13,
        },
      },
    ],
  }
}