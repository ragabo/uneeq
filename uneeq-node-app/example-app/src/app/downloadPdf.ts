import logo1 from './assets/img/logo.png'
import uneeqLogo from './assets/img/UneeQ-logo.png'

const logos = {
  logo1: logo1,
  logo2: uneeqLogo
}

export const downloadPdf = async (
  type: 'transcript' | 'savedItems',
  items: any,
  sessionId: string
) => {
  import('uneeq-download-pdf').then(
    ({ downloadSavedItemsPdf, downloadTranscriptPdf }) => {
      if (type === 'transcript') {
        downloadTranscriptPdf({
          filename: 'uneeq-transcript',
          content: items,
          sessionId,
          ...logos
        })
      } else {
        downloadSavedItemsPdf({
          filename: 'uneeq-information',
          content: items,
          sessionId,
          ...logos
        })
      }
    }
  )
}

export default downloadPdf
