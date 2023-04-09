//@ts-nocheck
import {
  Document,
  Page,
  pdf,
  StyleSheet,
  Text,
  View,
  Image,
  Link
} from '@react-pdf/renderer'
import React from 'react'
import { isMobileSafari } from 'react-device-detect'
import { format } from 'date-fns'
import marked from 'marked'
import he from 'he'

const headingSizes = {
  1: 20,
  2: 18,
  3: 16
}

const styles = StyleSheet.create({
  page: {
    padding: 40,
    paddingTop: 100
  },
  logo1: {
    width: '33%',
    marginBottom: 40,
    position: 'absolute',
    top: 40,
    left: 36
  },
  logo2: {
    width: '33%',
    marginBottom: 40,
    position: 'absolute',
    top: 40,
    right: 40
  },
  sessionId: {
    width: '100%',
    marginTop: 40,
    position: 'absolute',
    bottom: 40,
    left: 40,
    fontSize: 11
  },
  date: {
    fontSize: 14,
    color: '#666'
  },
  containerSavedItems: {
    marginTop: 20,
    width: '90%',
    fontSize: 14
  },
  message: {
    marginTop: 20,
    width: '60%'
  },
  sender: { color: '#666', fontSize: 10 },
  text: { marginTop: 8, fontSize: 14, lineHeight: 1.4 },
  link: { fontSize: 14, color: '#333' }
})

const renderMarkdownToken = (token, index) => {
  switch (token.type) {
    case 'heading':
      return (
        <Text
          style={{
            fontSize: headingSizes[token.depth],
            marginBottom: headingSizes[token.depth]
          }}
        >
          {he.decode(token.text)}
        </Text>
      )
    case 'text':
      return he.decode(token.text)
    case 'strong':
      return (
        <Text style={{ fontFamily: 'Helvetica-Bold' }}>
          {he.decode(token.text)}
        </Text>
      )
    case 'em':
      return (
        <Text style={{ fontFamily: 'Helvetica-Oblique' }}>
          {he.decode(token.text)}
        </Text>
      )
    case 'list':
      return (
        <View style={{ marginLeft: 20 }}>
          {token.items.map(renderMarkdownToken)}
        </View>
      )
    case 'list_item':
      const orderedList = token.raw.match(/^\d/)
      return (
        <Text>
          {orderedList ? index + 1 : '•'} {he.decode(token.text)}
        </Text>
      )
    case 'link':
      return (
        <Link src={token.href}>{token.tokens.map(renderMarkdownToken)}</Link>
      )
    case 'paragraph':
      return (
        <Text style={{ marginBottom: '16' }}>
          {token.tokens.map(renderMarkdownToken)}
        </Text>
      )
    case 'image':
      return <Image src={token.href} />
    case 'space':
      return null
    default:
      console.warn('unrecongnised token', token)
      return null
  }
}

const renderItemForPDF = (item: InformationItem): any => {
  let output
  switch (item.type) {
    case 'html':
      break
    case 'text':
      output = <Text>{item.text}</Text>
      break
    case 'heading':
      output = <Text>{item.text}</Text>
      break
    case 'list':
      output = item.items.map(child => {
        return renderItemForPDF(child)
      })
      break
    case 'markdown':
      const tokens = marked.lexer(item.markdown)
      output = tokens.map(renderMarkdownToken)
      break
    case 'link':
      output = (
        <Link src={item.href}>
          <Text>{item.label}</Text>
        </Link>
      )
      break
    case 'image':
      output = <Image src={item.source} />
      break
  }
  return output
}

export const PdfTemplate = ({ children, logo1, logo2, sessionId = '' }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {logo1 && <Image src={logo1} style={styles.logo1} alt="Logo" />}
      {logo2 && <Image src={logo2} style={styles.logo2} alt="Logo" />}
      {children}
      {!!sessionId && (
        <Text style={styles.sessionId}>SessionID: {sessionId}</Text>
      )}
    </Page>
  </Document>
)

export const PdfSavedItems = ({ items, logo1, logo2, sessionId = '' }) => (
  <PdfTemplate logo1={logo1} logo2={logo2} sessionId={sessionId}>
    {(items as InformationItemWithoutList[][]).map((item, index: number) => (
      <View style={styles.containerSavedItems} key={index}>
        {(item as InformationItemWithoutList[]).map((childItem, indexChild) => (
          <View key={indexChild}>{renderItemForPDF(childItem)}</View>
        ))}
      </View>
    ))}
  </PdfTemplate>
)

export const PdfTranscript = ({
  avatarName,
  items,
  logo1,
  logo2,
  sessionId = ''
}) => (
  <PdfTemplate logo1={logo1} logo2={logo2} sessionId={sessionId}>
    {(items as TranscriptItem[]).map(message => (
      <View style={styles.message} key={message.time}>
        {message.link ? (
          <Link src={message.link.href} style={styles.link}>
            {message.link.label}
          </Link>
        ) : (
          <>
            <Text style={styles.sender}>
              {message.user ? 'You' : avatarName}{' '}
              {format(message.time, 'HH:mm')}
            </Text>
            <Text style={styles.text}>{message.message}</Text>
          </>
        )}
      </View>
    ))}
  </PdfTemplate>
)

// TranscriptItem[]
// InformationItemWithoutList[][]

export const downloadTranscriptPdf = async ({
  avatarName,
  filename = '',
  content,
  logo1,
  logo2,
  sessionId = ''
}: any) => {
  const blob = await pdf(
    <PdfTranscript
      avatarName={avatarName}
      items={content}
      logo1={logo1}
      logo2={logo2}
      sessionId={sessionId}
    />
  ).toBlob()
  const url = URL.createObjectURL(blob)
  if (isMobileSafari) {
    window.open(url, '_blank')
  } else {
    var xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.responseType = 'blob'
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status == 200) {
        var blob = new Blob([xhr.response], { type: 'application/pdf' })
        const url = window.URL.createObjectURL(blob)
        window.open(url, '_blank')
        setTimeout(function() {
          // For Firefox it is necessary to delay revoking the ObjectURL
          URL.revokeObjectURL(url)
        }, 500)
      }
    }
    xhr.send()
  }
}

export const downloadSavedItemsPdf = async ({
  filename = '',
  content,
  logo1,
  logo2,
  sessionId = ''
}) => {
  const blob = await pdf(
    <PdfSavedItems
      items={content}
      logo1={logo1}
      logo2={logo2}
      sessionId={sessionId}
    />
  ).toBlob()

  const url = URL.createObjectURL(blob)
  if (isMobileSafari) {
    window.open(url, '_blank')
  } else {
    var xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.responseType = 'blob'
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status == 200) {
        var blob = new Blob([xhr.response], { type: 'application/pdf' })
        const url = window.URL.createObjectURL(blob)
        window.open(url, '_blank')
        setTimeout(function() {
          // For Firefox it is necessary to delay revoking the ObjectURL
          URL.revokeObjectURL(url)
        }, 500)
      }
    }
    xhr.send()
  }
}
