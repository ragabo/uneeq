export const styles = {
  mainContainer: {
    '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
      display: 'none'
    },
    '& *': {
      msOverflowStyle: 'none',
      scrollbarWidth: 'none'
    },
    msOverflowStyle: 'none',
    scrollbarWidth: 'none',
    label: 'homeMainContainer',
    minWidth: '100%',
    height: '100%',
    position: 'absolute',
    alignItems: 'flex-start',
    flexDirection: ['column', 'column', 'column', 'column', 'row', 'row'],
    justifyContent: [
      'flex-start',
      'flex-start',
      'flex-start',
      'flex-start',
      'normal',
      'normal'
    ],
    width: '100%',
    '& > video': {
      objectFit: 'cover',
      width: '100vw',
      height: [
        'calc(100vh - 48px)',
        'calc(100vh - 48px)',
        '100vh',
        '100vh',
        '100vh'
      ],
      minHeight: ['auto', 'auto', '100vh', '100vh', '100vh'],
      position: ['static', 'static', 'static', 'static', 'fixed', 'fixed'],
      top: 0,
      left: 0,
      zIndex: 0
    },
    maxHeight: '100%'
  },
  videoContainer: {
    my: 2,
    width: '28%',
    display: ['none', 'none', 'none', 'none', 'block', 'block']
  },
  textContainer: {
    label: 'text-container',
    mb: [4, 0],
    pl: ['10%', '10%', '10%', '10%', '15%', '50%'],
    pr: ['10%', '10%', '10%', '10%', '40%', '10%'],
    mt: 0,
    height: ['1px', '1px', '1px', '1px', 'auto', 'auto'],
    maxWidth: ['100%', '100%', '100%', '100%', '100%', '90%'],
    color: 'textAlternate',
    textAlign: 'left',
    zIndex: 4,
    width: '100%',
    maxHeight: '100%',
    overflowY: ['visible', 'visible', 'visible', 'visible', 'scroll', 'scroll']
  },
  mobileImSophie: {
    display: ['flex', 'flex', 'flex', 'flex', 'none', 'none'],
    fontSize: [2, 2, 6, 6, 78, 78],
    lineHeight: '26px',
    minHeight: 56,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  imSophieText: {
    display: ['none', 'none', 'none', 'none', 'flex', 'flex'],
    fontSize: 78,
    lineHeight: '80px',
    mt: 15,
    fontWeight: 'bold'
  },
  subtitle: {
    fontWeight: '300',
    fontSize: 4,
    mt: 2,
    mb: [3, 4],
    lineHeight: '30px',
    display: ['none', 'none', 'none', 'none', 'block', 'block'],
    maxWidth: 480
  },
  sophieBGImage: {
    label: 'sophieBGImage',
    position: 'fixed',
    backgroundSize: ['100%', '100%', '70%'],
    backgroundRepeat: 'no-repeat',
    backgroundPosition: ['top', 'top', '100% bottom'],
    top: ['3em', '3em', 'unset'],
    right: ['3em', '3em', 'unset'], // this is bc the empty space the img has, we should ask them for a better png
    height: '100%',
    width: '100%',
    zIndex: 1
  },
  letsChatButton: {
    lineHeight: '24px',
    fontWeight: '600',
    minWidth: '10rem',
    py: [3, 2],
    px: [6, 5],
    mt: 3,
    mb: 10
  },
  privacyTextToggle: {
    fontWeight: '300',
    cursor: 'pointer',
    fontSize: 0,
    lineHeight: '22px',
    textDecoration: 'none',
    maxWidth: 480
  },
  disclaimer: {
    mt: 9,
    mb: 6,
    fontWeight: '300',
    fontSize: 0,
    lineHeight: '22px',
    '& a, & a:active': {
      color: 'primary',
      textDecoration: 'none'
    },
    '& a:hover': {
      textDecoration: 'underline'
    },
    maxWidth: 480
  },
  recaptchaDisclaimer: {
    fontWeight: '300',
    fontSize: 0,
    lineHeight: '22px',
    mb: 14
  },
  startButton: {
    label: 'startButton',
    display: ['block', 'block', 'block', 'block', 'none', 'none'],
    mt: [-100, -100, -200, -200, 1, 1],
    mb: [100, 100, 150, 150, 1, 1],
    mx: ['auto', 'auto', 'auto', 'auto', 0, 0],
    zIndex: 4
  },
  surveyToggle: {
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: 2,
    lineHeight: '24px',
    textDecoration: 'none',
    mb: 2,
    mt: [10, 10, 10, 10, 0, 0],
    pt: [10, 10, 10, 10, 0, 0]
  },
  togglePrivacyIcon: {
    display: 'inline-block',
    color: 'primary'
  },
  surveyContainer: {
    transition: 'max-height .5s linear',
    overflow: 'hidden',
    '& label': {
      fontWeight: '300',
      fontSize: 2,
      alignItems: 'flex-start',
      lineHeight: '24px'
    },
    '& textarea': {
      borderRadius: 'button',
      borderColor: 'grey',
      backgroundColor: 'white'
    },
    maxWidth: 440
  },
  checkbox: {
    width: '20px',
    height: '20px',
    borderRadius: 'button',
    'input:checked ~ &': {
      color: 'text',
      backgroundColor: 'white'
    }
  },
  textarea: {
    color: 'text',
    fontFamily: 'sans-serif',
    fontSize: 1
  },
  paragraphContainer: {
    transition: 'max-height .5s linear',
    overflow: 'hidden',
    fontSize: '12px',
    lineHeight: '18px',
    flexDirection: 'column',
    fontWeight: '300',
    px: 0,
    mt: 2,
    '& p': {
      mb: 3
    },
    maxWidth: 480
  },
  mobileParagraphsContainer: {
    zIndex: 9,
    color: 'white',
    textAlign: 'center',
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: '300',
    fontSize: 4,
    px: 7,
    my: 2,
    '& p': {
      my: 3
    }
  },
  privacyPolicyLink: {
    textDecoration: 'underline',
    color: 'currentColor'
  },
  titleContainer: {
    display: 'flex',
    width: '100%'
  }
}
export default styles
