import React from 'react'
import { Text } from 'rebass'
import { FatalError } from 'uneeq-react-ui'

interface SessionTimedOutProps {
  restart: () => void
}
const SessionTimedOut: React.FC<SessionTimedOutProps> = ({ restart }) => {
  return (
    <FatalError
      clearError={restart}
      errorTitle="Your session has timed out due to inactivity"
    >
      <Text />
    </FatalError>
  )
}

export default SessionTimedOut
