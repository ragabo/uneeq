import React from 'react'
import { Flex, Text } from 'rebass'
import styles from './styles'

interface UserQuestionProps {
  children: React.ReactNode
}
const UserQuestion: React.FC<UserQuestionProps> = React.forwardRef(
  ({ children }, ref): any => {
    if (!children) return null
    return (
      <Flex sx={styles.container}>
        <Flex sx={styles.inner} ref={ref}>
          <div className="loader loader--style2" title="1">
            <svg
              version="1.1"
              id="loader-1"
              width="40px"
              height="40px"
              viewBox="0 0 50 50"
              xmlSpace="preserve"
            >
              <path
                fill="#000"
                d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z"
              >
                <animateTransform
                  attributeType="xml"
                  attributeName="transform"
                  type="rotate"
                  from="0 25 25"
                  to="360 25 25"
                  dur="0.6s"
                  repeatCount="indefinite"
                />
              </path>
            </svg>
          </div>
          <Text as="span">{children}</Text>
        </Flex>
      </Flex>
    )
  }
)

export default UserQuestion
