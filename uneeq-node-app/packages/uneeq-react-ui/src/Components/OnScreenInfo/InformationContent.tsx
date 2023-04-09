import React, { createElement, useRef, useContext } from 'react'
// import ReactHtmlParser from 'react-html-parser'
import { Image, Link, Text, Heading } from 'rebass'
import { UneeqContext, useUneeqState } from 'uneeq-react-core'
import { debounce } from 'lodash'
import Carousel from '../Carousel/index'
import { closeRefWindow } from '../Carousel/index'
import HigriCalendarComponent from '../HigriCalendar/index'
import CalendarComponent from '../Calendar/index'
import { CarouselCard } from '../Carousel/index'

// @ts-ignores
import marksy from 'marksy'

const headingStyles = {
  fontSize: 2,
  fontWeight: 'bold',
  m: 0,
  p: 0
}

export const getUtteranceFromURI = (uri: string) => {
  const match = uri.match(/^say\:(.*)$/)
  console.log(match)
  if (!match) {
    return undefined
  }
  return match[1]
}

const showWidget = () => {
  var informationElement: HTMLElement | null
  informationElement = document.getElementById('onscreeninfo-container')

  if (informationElement) informationElement.style.display = 'flex'
}

const compile = (
  markdown: string,
  send: (text: string) => void,
  sendCallback: (text: string) => void
) => {
  const parser = marksy({
    elements: {
      a: (props: any) => {
        const utterance = getUtteranceFromURI(props.href)
        return utterance ? (
          <a
            {...props}
            rel="noopener noreferrer"
            onClick={(event: Event) => {
              event.preventDefault()
              send(utterance)
              sendCallback(utterance)
            }}
          />
        ) : (
          <a {...props} rel="noopener noreferrer" />
        )
      },
      h1: ({ children }: any) => (
        <Heading sx={headingStyles}>{children}</Heading>
      ),
      h2: ({ children }: any) => (
        <Heading sx={headingStyles}>{children}</Heading>
      ),
      h3: ({ children }: any) => (
        <Heading sx={headingStyles}>{children}</Heading>
      ),
      h4: ({ children }: any) => (
        <Heading sx={headingStyles}>{children}</Heading>
      )
    },
    createElement
  })

  return parser(markdown, {})
}

interface HeadingInformation {
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
interface MarkdownInformation {
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
  | CarouselInformation
  | DatePickerInformation

interface ListInformation {
  type: 'list'
  items: InformationItemWithoutList[]
}

interface CarouselInformation {
  type: 'carousel'
  text: string
}

interface DatePickerInformation {
  type: 'datepicker'
  text: string
}

type InformationItem =
  | ListInformation
  | HeadingInformation
  | TextInformation
  | HTMLInformation
  | ImageInformation
  | VideoInformation
  | LinkInformation
  | MarkdownInformation
  | CarouselInformation
  | DatePickerInformation

const renderInformationItem = (item: InformationItem, index: number): any => {
  closeRefWindow()
  switch (item.type) {
    case 'html':
      console.warn('HTML type used')
      return null //ReactHtmlParser(item.html)
    case 'text':
      return <Text key={index}>{item.text}</Text>
    case 'heading':
      return (
        <Text fontSize={3} key={index}>
          {item.text}
        </Text>
      )

    case 'datepicker':
      var itemObj = JSON.parse(item.text)
      console.log(itemObj)
      if (itemObj?.ComponentOptions?.Type === 'Hijri') {
        return (
          <HigriCalendarComponent
            params=""
            isArabicLoca={itemObj?.ComponentOptions?.locale== 'ar' ? true : false }
          ></HigriCalendarComponent>
        )
      } else {
        return <CalendarComponent params=""></CalendarComponent>
      }
    case 'carousel':
      //console.log(item.text);

      var itemObj = JSON.parse(item.text)
      if (itemObj?.attachment?.payload?.elements) {
        return (
          <Carousel
            messages={itemObj?.attachment?.payload?.elements}
          ></Carousel>
        )
      } else {
        console.error('Nothing to print')
        return null
      }

    case 'markdown':
      const { sendText, dispatch } = useContext(UneeqContext)
      const debouncedSend = useRef(
        debounce((text: string) => sendText(text), 2000)
      ).current
      const compiled = compile(item.markdown, debouncedSend, (text: string) => {
        dispatch({ type: 'suggestedResponseSent', payload: text })
      })
      return compiled.tree
    case 'list':
      return (
        <ul key={index}>
          {item.items.map((child, index) =>
            renderInformationItem(child, index)
          )}
        </ul>
      )
    case 'link':
      return (
        <Link href={item.href} rel="external" target="_blank" key={index}>
          <Text>{item.label}</Text>
        </Link>
      )
    case 'image':
      return <Image src={item.source} alt={item.label} key={index} />
    case 'video':
      return (
        <iframe
          src={item.source}
          width={item.width || '100%'}
          height={item.height || '375'}
          key={index}
          frameBorder={0}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      )
  }
}

interface InformationProps {
  information: InformationItem[]
}

const InformationContent: React.FC<InformationProps> = ({ information }) => {
  if (!information?.length) return null

  return (
    <>
      {information.map((item: InformationItem, index: number) => {
        return renderInformationItem(item, index)
      })}
    </>
  )
}

export default InformationContent
