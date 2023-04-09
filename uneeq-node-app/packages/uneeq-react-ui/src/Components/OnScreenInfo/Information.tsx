import React, { useContext, useEffect, useState } from 'react'
import {
  trackHandler,
  UneeqContext,
  useIsSmallScreen,
  useUneeqSpaceToTalk,
  useUneeqState
} from 'uneeq-react-core'

import { Box, Button, Flex, Image, Text } from 'rebass'
import { motion, AnimatePresence } from 'framer-motion'
import InformationContent from './InformationContent'
import { ReactComponent as ExpandIcon } from '../../assets/img/expand.svg'
import { ReactComponent as HeartIcon } from '../../assets/img/heart.svg'
import { ReactComponent as HeartFullIcon } from '../../assets/img/heart-full.svg'
import { styles as s } from './styles'
import { ReactComponent as CloseIcon } from '../../assets/img/close.svg'
import { useTranslation } from 'react-i18next'
import hash from 'hash-sum'

const styles = s.information

export interface HeadingInformation {
  type: 'heading'
  text: string
}
interface TextInformation {
  type: 'text'
  text: string
}
interface HTMLInformation {
  type: 'html'
  html: string
}
export interface MarkdownInformation {
  type: 'markdown'
  markdown: string
}
interface ImageInformation {
  type: 'image'
  source: string
  label: string
  width: string
}
interface VideoInformation {
  type: 'video'
  source: string
  width: string
  height: string
}
export interface LinkInformation {
  type: 'link'
  href: string
  label: string
}

export type InformationItemWithoutList =
  | HeadingInformation
  | TextInformation
  | HTMLInformation
  | ImageInformation
  | VideoInformation
  | LinkInformation
  | MarkdownInformation

interface ListInformation {
  type: 'list'
  items: InformationItemWithoutList[]
}

export type InformationItem =
  | ListInformation
  | HeadingInformation
  | TextInformation
  | HTMLInformation
  | ImageInformation
  | VideoInformation
  | LinkInformation
  | MarkdownInformation

interface InformationProps {
  information: InformationItem[]
}

const Information: React.FC<InformationProps> = ({ information }) => {
  const { dispatch } = useContext(UneeqContext)
  const expand = () => dispatch({ type: 'expandInformation' })
  const { t } = useTranslation()

  const save = () => {
    dispatch({
      type: 'saveInformation'
    })
  }

  const hide = () => {
    console.log('yeee')
    dispatch({ type: 'openMobileInformation', payload: false })
  }

  return (
    <>
      {/* <Flex sx={styles.closeButtonContainer}>
        <Button sx={styles.closeButton} variant="unstyled" onClick={hide}>
          <Image as={CloseIcon} alt="" />
        </Button>
      </Flex> */}
      <Box sx={styles.content}>
        {/* <Flex sx={styles.topFade} /> */}
        <Box sx={styles.scroll}>
          <InformationContent information={information} />
        </Box>
        {/* <Flex sx={styles.bottomFade} /> */}
      </Box>
    </>
  )
}

export default Information
