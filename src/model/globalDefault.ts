let platform = ''

export default {
  textStyle: {
    fontFamily: platform.match(/^Win/) ? 'Microsoft YaHei' : 'sans-serif',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: 'normal',
  },
  animation: 'auto',
  animationDuration: 1000,
  animationDurationUpdate: 500,
  animationEasing: 'cubicInOut',
  animationEasingUpdate: 'cubicInOut',

  animationThreshold: 2000,
}
