import { useWindowWidth } from '@react-hook/window-size'
import React, { useState , useEffect } from 'react'
import { Box, Button, Flex, Text, Image } from 'rebass'
import { trackHandler, useSupportedBrowser } from 'uneeq-react-core'
import { UnsupportedBrowser } from 'uneeq-react-ui'
import config from '../../config'
import styles from './styles'
import chromeIcon from '../assets/img/chrome-icon.png'
import safariIcon from '../assets/img/safari-icon.png'

const Paragraphs = () => (
  <>
    <Text as="p">
      We take your privacy seriously, we only use video and audio data so that a
      digital human can understand what you are saying to it. We then share
      audio data with third party service partners who help us with
      transcription. Neither they or we store any audio data once we have
      completed the transcription. For more information read our{' '}
      <Text
        as="a"
        href="/privacy_policy.html"
        target="_blank"
        rel="noreferrer noopener"
        sx={styles.privacyPolicyLink}
      >
        privacy policy
      </Text>
      .
    </Text>
  </>
)

const SophieVideo = () => {
  const width = useWindowWidth()
  const smallScreen = width < 1024

  return (
    <video
      playsInline
      autoPlay
      muted
      loop
      poster={
        smallScreen
          ? 'https://d1qt3q0di8y5ko.cloudfront.net/portrait_idle.jpg'
          : 'https://d1qt3q0di8y5ko.cloudfront.net/landing_page_idle.jpg'
      }
    >
      <source
        src={
          smallScreen
            ? 'https://d1qt3q0di8y5ko.cloudfront.net/portrait_idle.webm'
            : 'https://d1qt3q0di8y5ko.cloudfront.net/landing_page_idle.webm'
        }
        type="video/webm"
      />
      <source
        src={
          smallScreen
            ? 'https://d1qt3q0di8y5ko.cloudfront.net/portrait_idle.mp4'
            : 'https://d1qt3q0di8y5ko.cloudfront.net/landing_page_idle.mp4'
        }
        type="video/mp4"
      />
    </video>
  )
}

interface HomeProps {
  startSession: (token: string) => void
}

const Home: React.FC<HomeProps> = ({ startSession }) => {
  useEffect(() => {
    trackHandler(startSession, 'lets-chat-btn')(true)
  },[startSession]);
  const { isBrowserSupported } = useSupportedBrowser()
  const [showPasscode, setShowPasscode] = useState(false)

  if (showPasscode && !isBrowserSupported) {
    return <UnsupportedBrowser close={() => setShowPasscode(false)} />
  }

  const StartButton = ({ sx }: any) => (
    <Button
      variant="outline"
      onClick={() => {
        trackHandler(startSession, 'lets-chat-btn')(true)
      }}
      sx={{ ...styles.letsChatButton, ...sx }}
    >
      Let's chat
    </Button>
  )

  return (
    <Flex sx={styles.mainContainer}>
      <Text sx={styles.mobileImSophie}>
        Meet {config?.avatarName}, our new digital assistant
      </Text>
      <SophieVideo />

      <Box sx={styles.textContainer}>
        <Box sx={styles.titleContainer}>
          <Text sx={styles.imSophieText}>Meet {config?.avatarName}</Text>
        </Box>
        <Box sx={styles.videoContainer}>
          <video
            autoPlay={false}
            loop={true}
            playsInline={true}
            controls={true}
            style={{ width: '335px', objectFit: 'cover' }}
          >
            <source
              src="https://d1qt3q0di8y5ko.cloudfront.net/sophieintro.mp4"
              type="video/mp4"
            />
            Loading...
          </video>
        </Box>
        <Text sx={styles.subtitle}>
          I’m a digital assistant that can help you with your questions.
        </Text>

        <StartButton sx={styles.startButton} />
        <Flex
          sx={{
            ...styles.paragraphContainer
          }}
        >
          <Paragraphs />
          <Flex>
            <Image src={safariIcon} alt="Safari" />
            <Image src={chromeIcon} alt="Chrome" />
            <Image src={chromeIcon} alt="Safari1" />
            <Image src={chromeIcon} alt="Chrome1" />
          </Flex>
        </Flex>
        <StartButton
          sx={{ display: ['none', 'none', 'none', 'none', 'block', 'block'] }}
        />
      </Box>
    </Flex>
  )
}

export default Home
