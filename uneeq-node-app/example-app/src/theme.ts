const colors = {
  text: '#000000',
  textLight: '#393939',
  textAlternate: '#FFFFFF',

  primary: '#225bb5',
  primaryLight: '#4287f5',
  primaryText: '#FFFFFF',

  secondary: '#22b5a1',
  secondaryLight: '#4bd6c4',
  secondaryText: '#FFFFFF',

  greyDark: '#50575D',
  grey: '#BDC0C7',
  greyLight: '#F6F6F6',

  error: '#BF2828',
  warning: '#FBBD1D',

  // TODO create our own progress bar with rebass so we can use variant="timoutBar"
  timeoutColor: '#1C8728',
  timeoutTrailColor: '#BDC0C7'
}

const hex2rgba = (hex: string, alpha = 1) => {
  const [r, g, b] = hex.match(/\w\w/g)!.map(x => parseInt(x, 16))
  return `rgba(${r},${g},${b},${alpha})`
}

export const theme = {
  colors: {
    ...colors,

    // PTT animation
    pttMobileGlow: hex2rgba(colors.primaryLight, 0.2), // Mobile - glow around button while recording
    // PTT desktop colors & gradients
    pttColRecording: 'white',
    pttImgRecording: `radial-gradient(circle, ${colors.primaryLight} 0%, white 100%)`,
    pttColSending: 'primaryLight',
    pttImgSending: `radial-gradient(circle, white 0%,${colors.primaryLight} 100%)`,
    pttColWaiting: 'primaryLight',
    pttImgWaiting: 'primary'
  },
  fonts: {
    body: 'Overpass, Roboto , Almarai , system-ui, sans-serif',
    heading: 'inherit'
  },
  fontSizes: ['14px', '15px', '16px', '20px', '22px', '24px', '30px'],
  fontWeights: {
    body: 400,
    heading: 400,
    bold: 700
  },
  lineHeights: {
    body: 1.5,
    heading: '31px'
  },
  space: [
    0,
    4,
    8,
    10,
    12,
    14,
    16,
    18,
    20,
    22,
    24,
    28,
    32,
    40,
    48,
    56,
    64,
    80,
    100,
    128
  ],
  radii: {
    button: 2,
    card: 8
  },
  shadows: {
    card: '0 4px 4px rgba(0, 0, 0, 0.25)'
  },
  text: {
    heading: {
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 5,
      pb: 2,
      mt: 3,
      mx: 4
    }
  },
  variants: {
    link: {
      color: 'primary'
    },
    card: {
      bg: 'white',
      color: 'textLight',
      borderRadius: 'card',
      p: [6, 6, 12, 12, 12, 12],
      boxShadow: 'card'
    },
    modal: {
      variant: 'variants.card',
      label: 'modal',
      width: ['92%', '92%', 850],
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    },
    transcript: {
      borderRadius: '3px',
      overflow: 'hidden',
      top: 0,
      right: 0,
      width: ['100%', '100%', '100%', '100%', 238, 238],
      height: ['100%', '100%', '100%', '100%', 504, 504],
      zIndex: 3,
      color: 'text',
      backgroundColor: 'greyLight',
      '& .transcript-header': {
        height: 62,
        position: ['fixed', 'fixed', 'fixed', 'fixed', 'static'],
        backgroundColor: 'primary',
        color: 'text',
        top: [0, 0, 0, 0, 'auto', 'auto'],
        zIndex: 10
      },
      '& .transcript-content': {
        // borderTop: '1px solid #E6E6E6',
        borderBottom: '1px solid #E6E6E6',
        fontSize: [4, 1],
        p: 3,
        height: ['100%', '100%', '100%', '100%', 'auto', 'auto'],
        paddingTop: [62, 62, 62, 62, 3, 3],
        paddingBottom: [53, 53, 53, 53, 3, 3]
      },
      '& .transcript-footer': {
        height: 45,
        position: ['fixed', 'fixed', 'fixed', 'fixed', 'static'],
        minHeight: '45px',
        bottom: [0, 0, 0, 0, 'auto', 'auto'],
        backgroundColor: 'white',
        width: '100%',
        p: 2
      }
    }
  },
  buttons: {
    // TODO
    unstyled: {
      background: 'transparent',
      color: 'secondary',
      fontFamily: 'inherit',
      fontSize: 0
    },
    primary: {
      fontFamily: 'inherit',
      borderRadius: 'button',
      fontWeight: '600',
      fontSize: '16px',
      lineHeight: '24px',
      verticalPadding: '12px',
      horizontalPadding: '22px',
      transition: 'all 1s',
      cursor: 'pointer',
      backgroundColor: 'primary',
      backgroundImage: 'linear-gradient(45deg,#1da1f2,#0e71c8)',
      boxShadow: '0px 4px 30px rgb(19 127 212 / 40%)',
      border: '1px solid transparent',
      borderColor: 'primary',
      whiteSpace: 'nowrap',
      '& svg, & img': {
        fill: 'currentColor'
      },
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'text',
      '& img, & svg': {
        mr: 2
      },
      '&:hover': {
        backgroundColor: 'primaryLight'
      },
      '&:focus': {
        backgroundColor: 'primary',
        '--box-shadow-color': 'primary',
        boxShadow: '0 0 3px var(--box-shadow-color)',
        borderColor: 'primaryLight'
      },
      '&:disabled': {
        backgroundColor: 'greyDark',
        color: '#85898E'
      }
    },
    primaryInverted: {
      variant: 'buttons.primary',
      bg: 'black',
      color: '#fff',
      borderRadius: 100,
      borderColor: 'primary',
      '&:hover': {
        backgroundColor: 'rgba(1, 99, 172, 0.1)'
      },
      '&:focus': {
        outline: 'none',
        '--box-shadow-color': 'primary',
        boxShadow: '0 0 3px var(--box-shadow-color)'
      },
      '&:disabled': {
        borderColor: 'grey',
        color: '#E3E5E8'
      }
    },
    secondary: {
      variant: 'buttons.primary',
      color: 'secondaryText',
      backgroundColor: 'secondary',
      borderColor: 'secondary',
      '& svg, & img': {
        // TODO
        // fill: 'currentColor'
        fill: 'red'
      },
      '& img, & svg': {
        mr: 2
      },
      '&:hover': {
        backgroundColor: 'secondaryLight'
      },
      '&:focus': {
        backgroundColor: 'secondary',
        '--box-shadow-color': 'secondary',
        boxShadow: '0 0 3px var(--box-shadow-color)',
        borderColor: 'secondaryLight'
      },
      '&:disabled': {
        backgroundColor: 'greyDark',
        color: '#85898E'
      }
    },
    secondaryInverted: {
      variant: 'buttons.secondary',
      color: 'secondary',
      background: 'white',
      borderColor: 'secondary',
      '& svg, & img': {
        // fill: 'currentColor'
        fill: 'red'
      },
      '& img, & svg': {
        // mr: 2
        mr: 20
        // TODO
      },
      '&:hover': {
        backgroundColor: '#2E2818'
      },
      '&:focus': {
        borderColor: 'secondary',
        '--box-shadow-color': 'secondary',
        boxShadow: '0 0 3px var(--box-shadow-color)'
      },
      '&:disabled': {
        borderColor: 'greyDark',
        color: '#85898E'
      }
    },
    outline: {
      color: 'textAlternate',
      fontWeight: '300',
      cursor: 'pointer',
      border: '1px solid #FFFFFF',
      transition: 'all 1s',
      backgroundColor: 'transparent',
      borderRadius: 50,
      '&:hover': {
        backgroundColor: 'rgba(255,255,255,0.1)'
      },
      '&:focus': {
        outline: 'none',
        border: '1px solid transparent',
        borderColor: 'white',
        '--box-shadow-color': 'transparent',
        boxShadow: 'none'
      },
      '&:disabled': {
        backgroundColor: 'thirdGray',
        color: 'fourthGray'
      }
    }
  },
  breakpoints: ['320px', '600px', '768px', '1024px', '1280px']
}

export default theme
