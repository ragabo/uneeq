import React, { useContext } from 'react'
import {
  UneeqProvider,
  UneeqAvatar,
  UneeqLocalVideo,
  UneeqContext,
  useUneeqState,
  Uneeq
} from 'uneeq-react-core'
import { Box } from 'rebass'
import Menu from './Components/Menu'
import BottomBar from './Components/BottomBar'
import OnScreenInfo from './Components/OnScreenInfo'
import Transcript from './Components/Transcript'
import Errors from './Components/Errors'
import Settings from './Components/Settings'
import Timeout from './Components/Timeout'
import Feedback from './Components/endSession/Feedback'
import EscalationForm from './Components/endSession/EscalationForm'
import EndSessionButton from './Components/endSession/EndSessionButton'
import PrivacySummary from './Components/PrivacySummary'
import PermissionsGateway, {
  LoadingTip
} from './Components/Startup/PermissionsGateway'

import EndSessionConfirm from './Components/endSession/EndSessionConfirm'
import styles from './styles'
import { UneeqCoreConfig } from 'uneeq-react-core'

const DigitalHumanContent = ({
  restart,
  CustomFeedback,
  permissions,
  audio,
  loadingTips
}: any) => {
  const FinalFeedback = CustomFeedback || Feedback
  const { dispatch, config } = useContext(UneeqContext)
  const { feedbackOpen } = useUneeqState()

  const styleTypes: any = {
    '407e29c5-32e0-4fb6-a29c-e1bcdbe9ddbd': 'ar',
    'f700e02b-7e0d-41df-babd-ceb372716c6d': 'en',
    '20841bfd-1ae3-4890-8974-b9c392496cd8': 'en',
    'f329a084-f32c-4ae9-9fa1-66e54c02d877': 'ar'
  }

  return (
    <Box
      sx={styles.container}
      className={`style_${styleTypes[config.conversationId]}`}
    >
      <UneeqAvatar />

      {/* Must be present but we want it hidden */}
      <UneeqLocalVideo style={styles.localVideo} />

      <PermissionsGateway
        restart={restart}
        loadingTips={loadingTips}
        video={permissions}
      >
        <OnScreenInfo />
        <Transcript />
        <BottomBar />

        {/* Modals */}
        <Menu />
        <Settings audio={audio} />
        <Timeout />
        <PrivacySummary />
        <EndSessionConfirm restart={restart} />
        <FinalFeedback
          restart={restart}
          close={() => dispatch({ type: 'openFeedback', payload: false })}
          isOpen={feedbackOpen}
        />
        <EscalationForm restart={restart} />

        <Errors />
        <EndSessionButton />
      </PermissionsGateway>
    </Box>
  )
}

interface DigitalHumanProps {
  assets: any
  onTimedOut: () => void
  onSessionEnded: () => void
  config: Partial<UneeqCoreConfig>
  postInit?: (uneeq: Uneeq) => void
  token?: string
  restart: () => void
  loadingTips: Array<LoadingTip>
  CustomFeedback?: any
}

const DigitalHuman: React.FC<DigitalHumanProps> = ({
  assets,
  onTimedOut,
  onSessionEnded,
  restart,
  postInit,
  config,
  token,
  loadingTips,
  CustomFeedback
}) => {
  const {
    video: { permissions },
    audio
  } = assets

  return (
    <UneeqProvider
      config={config}
      token={token}
      postInit={postInit}
      onTimedOut={onTimedOut}
      onSessionEnded={onSessionEnded}
    >
      <DigitalHumanContent
        CustomFeedback={CustomFeedback}
        restart={restart}
        audio={audio}
        permissions={permissions}
        loadingTips={loadingTips}
      />
    </UneeqProvider>
  )
}

export default DigitalHuman
