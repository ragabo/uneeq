import { DigitalHuman, PasscodeOverlay } from 'uneeq-react-ui'
import React, { useState, useRef } from 'react'
import { Box, Button } from 'rebass'

import { ThemeProvider } from 'emotion-theming'

import theme from '../theme'
import config from '../config'
import Home from './Home'
import assets from './assets'

import { testState } from 'uneeq-react-core'
import SessionTimedOut from './SessionTimedOut'

const backgroundStyle = {
  label: 'wrapper',
  width: '100%',
  minHeight: '100%',
  backgroundSize: 'cover',
  backgroundPosition: 'right bottom',
  backgroundColor: '#000000',
  backgroundImage: [
    'none',
    'none',
    'none',
    'none',
    `url('https://d1qt3q0di8y5ko.cloudfront.net/squiggle_lr.jpg')`,
    `url('https://d1qt3q0di8y5ko.cloudfront.net/squiggle_lr.jpg')`
  ],
  overflow: 'hidden',
  position: 'absolute'
}

const loadingTips = [
  {
    title: 'Loading...',
    // videoWebm: clickableQuestions,
    // videoMP4: clickableQuestionsMP4,
    // img: clickableQuestionsImg,
    showOnDesktop: true,
    showOnMobile: true
  },
  {
    title: 'Loading...',
    // videoWebm: holdSpacebar,
    // videoMP4: holdSpacebarMP4,
    // img: holdSpacebarImg,
    showOnDesktop: true,
    showOnMobile: true
  },
  {
    title: 'Loading....',
    // videoWebm: holdSpacebar,
    // videoMP4: holdSpacebarMP4,
    // img: holdSpacebarImg,
    showOnDesktop: true,
    showOnMobile: true
  }
]

// example CustomFeedback component that can be passed to DigitalHuman
// to customise the look and feel of this screen
const CustomFeedback = ({ restart, close, isOpen }: any) => {
  if (!isOpen) return null
  return (
    <Box
      sx={{
        background: 'white',
        width: '50vh',
        height: '50vh',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 20
      }}
    >
      CustomFeedback
      <Button onClick={close}>Close</Button>
      <Button onClick={restart}>Restart</Button>
    </Box>
  )
}

const App = () => {
  // For faster testing, skip straight to digitalHuman
  const [step, goTo] = useState(testState ? 'digitalHuman' : 'welcome')

  // const postInit = (uneeq: Uneeq) => {
  //   console.info('initialized')
  //   uneeq.sendTranscript('Example using initialized uneeq instance')
  // }

  // passcode is an overlay, not a step
  const [showPasscode, setShowPasscode] = useState(false)

  const tokenRef = useRef<string>()
  const start = () => {
    // Show passcode overlay or go straight to digitalHuman
    if (config.usePasscode) {
      setShowPasscode(true)
    } else {
      goTo('digitalHuman')
    }
  }

  const startWithToken = (token: string) => {
    tokenRef.current = token
    goTo('digitalHuman')
    setShowPasscode(false)
  }

  const restart = () => goTo('welcome')

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          ...backgroundStyle,
          overflow: step === 'welcome' ? 'visible' : 'hidden'
        }}
      >
        {step === 'digitalHuman' ? (
          <DigitalHuman
            assets={assets}
            config={config}
            token={tokenRef.current}
            loadingTips={loadingTips}
            onTimedOut={() => goTo('timed-out')}
            // postInit={postInit}
            restart={restart}
            // CustomFeedback={CustomFeedback} // uncomment to enable custom Feedback screen
            onSessionEnded={() => goTo('restart')}
          />
        ) : step === 'timed-out' ? (
          <SessionTimedOut restart={restart} />
        ) : (
          <Home startSession={start} />
        )}
        {showPasscode && (
          <PasscodeOverlay
            start={startWithToken}
            close={() => setShowPasscode(false)}
            config={config}
          />
        )}
      </Box>
    </ThemeProvider>
  )
}

export default App
