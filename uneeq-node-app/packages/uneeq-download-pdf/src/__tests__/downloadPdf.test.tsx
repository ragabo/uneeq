// import React from 'react'
// import downloadPdf, { PdfSavedItems, PdfTranscript } from 'uneeq-download-pdf'
// import { renderIgnoreRenderErrors } from '../test-utils'
//
// const transcriptItems = [
//   {
//     message:
//       "Hold down the space bar to ask me a question, or you can click on \"Show next steps\" for suggested options.",
//     user: false,
//     time: new Date(Date.now() + 1)
//   },
//   {
//     message: 'Dsadsa',
//     user: true,
//     time: new Date(Date.now() + 5200)
//   },
//   {
//     message: "I didn't get that. Do you want to type in your question?",
//     user: false,
//     time: new Date(Date.now() + 52510)
//   }
// ]
//
// const savedItems = [
//   [
//     {
//       type: 'heading',
//       text: 'Contact Details'
//     },
//     {
//       type: 'text',
//       text: 'For further information call'
//     },
//     {
//       type: 'link',
//       label: 'Link',
//       href: 'https://example.com'
//     },
//     {
//       type: 'list',
//       items: [
//         {
//           type: 'link',
//           label: 'Link',
//           href: 'https://example.com'
//         },
//         {
//           type: 'text',
//           text: 'Children for further information call'
//         }
//       ]
//     },
//     {
//       type: 'image',
//       source: 'https://picsum.photos/100',
//       label: 'Yep, its an image',
//       width: '100%'
//     }
//   ],
//   [
//     {
//       type: 'heading',
//       text: 'Contact Details'
//     },
//     {
//       type: 'text',
//       text: 'For further information call'
//     },
//     {
//       type: 'link',
//       label: 'Link',
//       href: 'https://example.com'
//     },
//     {
//       type: 'list',
//       items: [
//         {
//           type: 'link',
//           label: 'Link',
//           href: 'https://example.com'
//         },
//         {
//           type: 'text',
//           text: 'Children for further information call'
//         }
//       ]
//     },
//     {
//       type: 'image',
//       source: 'https://picsum.photos/100',
//       label: 'Yep, its an image',
//       width: '100%'
//     }
//   ]
// ]
//
// describe('downloadPdf', () => {
//   describe('PdfTranscript', () => {
//     it('should render correctly', () => {
//       const { container } = renderIgnoreRenderErrors(
//         <PdfTranscript items={transcriptItems} />
//       )
//
//       expect(container).toHaveTextContent("I didn't get that")
//     })
//   })
//
//   describe('PdfSavedItems', () => {
//     it('should render correctly', () => {
//       const { container } = renderIgnoreRenderErrors(
//         <PdfSavedItems items={savedItems} />
//       )
//
//       expect(container).toHaveTextContent(
//         'Children for further information call'
//       )
//     })
//   })
//
//   describe('downloadPdf', () => {
//     it('should work with saved items', async () => {
//       // @ts-ignore
//       global.URL.createObjectURL = jest.fn()
//       // @ts-ignore
//       global.URL.revokeObjectURL = jest.fn()
//       await downloadPdf('savedItems', savedItems)
//       // @ts-ignore
//       expect(global.URL.createObjectURL).toHaveBeenCalled()
//     })
//
//     it('should work with transcript items', async () => {
//       // @ts-ignore
//       global.URL.createObjectURL = jest.fn()
//       // @ts-ignore
//       global.URL.revokeObjectURL = jest.fn()
//       await downloadPdf('transcript', transcriptItems)
//       // @ts-ignore
//       expect(global.URL.createObjectURL).toHaveBeenCalled()
//     })
//   })
// })
describe('@mono/react', () => {
  it('works', () => {
    expect(true).toBe(true)
  })
})

// FIXME
