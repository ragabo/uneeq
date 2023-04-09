const styles = {
  container: {
    label: 'DigitalHuman',
    position: 'absolute',
    height: '100%',
    width: '100%',
    '& button': {
      zIndex: 2
    },
    '& a, & a:active, & a:focus, & button, & button:active, & button:focus': {
      outline: 'none'
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      right: 0,
      width: '30%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: ['none', 'none', 'none', 'none', 'none', 'none']
    }
  },
  avatar: {
    label: 'avatar',
    height: '100%',
    width: '100%'
  },
  localVideo: {
    width: 400,
    height: 300,
    display: 'none'
  }
}

export default styles
