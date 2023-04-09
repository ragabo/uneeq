export const styles = {
  button: {
    position: 'absolute',
    top: [6, 6, 6, 6, 25, 25],
    right: [6, 6, 40, 40, 40, 40],
    width: [48, 48, 40, 40, 'auto', 'auto'],
    height: [48, 48, 40, 40, 'auto', 'auto'],
    '& > svg': {
      mr: [0, 0, 0, 0, '8px', '8px'],
      minWidth: ['21px', '21px', '16px', '16px', '16px', '16px'],
      minHeight: ['21px', '21px', '16px', '16px', '16px', '16px']
    },
    borderRadius: [40, 40, 40, 40, 100, 100],
    py: [0, 0, 0, 0, 4, 4],
    px: [0, 0, 0, 0, 8, 8],
    zIndex: '10 !important'
  },
  text: {
    display: ['none', 'none', 'none', 'none', 'inline-block', 'inline-block']
  }
}
export default styles
