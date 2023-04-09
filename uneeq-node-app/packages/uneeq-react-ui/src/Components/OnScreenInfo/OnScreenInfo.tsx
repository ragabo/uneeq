import React, { useContext } from 'react'
import {
  trackHandler,
  UneeqContext,
  useIsSmallScreen,
  useUneeqSpaceToTalk,
  useUneeqState
} from 'uneeq-react-core'

import Information from './Information'
import { Flex, Text, Box } from 'rebass'
import { motion, AnimatePresence } from 'framer-motion'
import InformationExpanded from './InformationExpanded'
import styles from './styles'

const MotionCard = motion.custom(Box)

import UserQuestion from '../BottomBar/UserQuestion'
import SuggestedResponses from './SuggestedResponses'

const MotionUserQuestion = motion.custom(UserQuestion)
const MotionBox = motion.custom(Box)

const OnScreenInfo = () => {
  const {
    hiddenUI,
    inputMode,
    transcriptOpen,
    transcriptHasOpened,
    onScreenInfo,
    mobileInformationOpen,
    spacebarTapped,
    noInput,
    question,
    avatarSpeaking,
    savedItems
  } = useUneeqState()

  const shouldShowQuestion =
    question && !onScreenInfo?.suggestedResponses?.chosenResponse

  const trimmedQuestion =
    question?.length > 267 ? question.substring(0, 267).concat('...') : question

  return (
    <>
      <InformationExpanded />
      <Box
        sx={{
          ...styles.conatianer,
          display: 'flex'
        }}
        id="onscreeninfo-container"
      >
        <Flex sx={styles.userQuestionMotionContainer}>
          <AnimatePresence>
            {shouldShowQuestion && (
              <MotionUserQuestion
                variants={{
                  start: {
                    opacity: 0,
                    transition: {
                      delay: 1.5
                    },
                    transform: 'translateX(-200px)'
                  },
                  end: {
                    opacity: 1,
                    transition: {
                      delay: 1.5
                    },
                    transform: 'translateX(1px)'
                  },
                  final: {
                    opacity: 0,
                    transform: 'translateX(200px)'
                  }
                }}
                initial="start"
                animate="end"
                exit="final"
                key="question"
              >
                {trimmedQuestion}
              </MotionUserQuestion>
            )}
          </AnimatePresence>
        </Flex>
        <Flex
          sx={{
            alignItems: 'center'
          }}
        >
          <AnimatePresence>
            <MotionBox sx={styles.motionSuggestedResponses}>
              <SuggestedResponses />
            </MotionBox>
          </AnimatePresence>
        </Flex>
        <AnimatePresence>
          {onScreenInfo.information && (
            <MotionCard
              sx={styles.card}
              variant="card"
              initial={{
                opacity: 0,
                transform: 'translate(0px, 200px)'
              }}
              animate={{
                opacity: 1,
                transform: `translate(0px, 0px)`
              }}
              exit={{
                opacity: 0,
                transform: `translate(0px, -200px)`
              }}
            >
              <Information information={onScreenInfo.information} />
            </MotionCard>
          )}
        </AnimatePresence>
      </Box>
    </>
  )
}

export default OnScreenInfo
