const styles = {
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'all 1s'
  },
  inner: {
    fontWeight: '800',
    textAlign: 'left',
    background: 'white',
    borderRadius: 20,
    backgroundImage:
      'linear-gradient(to bottom left, #EF8D9C 40%, #FFC39E 100%)',
    boxShadow: '0px 4px 30px rgb(223 45 70 / 60%)',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    mb: 6,
    position: 'absolute',
    minHeight: [44, 44, 44, 44, 44, 44],
    maxHeight: [184, 184, 144, 144, 168, 168],
    minWidth: 144,
    maxWidth: ['90%', '90%', '90%', '90%', 634, 634],
    overflow: 'ellipsis',
    bottom: -2,
    py: [4, 4, 4, 4, 4, 4],
    px: [6, 6, 6, 6, 6, 6],
    alignItems: 'center',
    justifyContent: 'center',
    width: 'auto',
    '& span': {
      minWidth: 'auto'
    }
  }
}

export default styles
