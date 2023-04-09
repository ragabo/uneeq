import downloadPdf from './app/downloadPdf'

let environment = {}
// You can override default settings for different environments
// by setting REACT_APP_CONFIG environment variable
if (process.env.REACT_APP_CONFIG === 'EXAMPLE') {
  console.info('config: example')
  environment = {
    conversationId: 'OTHER'
  }
} else {
  console.info('config: default')
}

const config = {
  debug: true,

  url: process.env.REACT_APP_UNEEQ_URL!,
  conversationId: process.env.REACT_APP_UNEEQ_PERSONA_ID!,
  tokenUrl: process.env.REACT_APP_UNEEQ_TOKEN_URL!,

  // Is a passcode needed to obtain a token? Show a passcode screen so the user can provide it.
  usePasscode: false,
  // Recaptcha - if used with passcode
  recaptchaSiteKey: process.env.REACT_APP_RECAPTCHA_SITE_KEY!,

  // welcome can be suppressed during dev with REACT_APP_NO_WELCOME=1
  playWelcome: !process.env.REACT_APP_NO_WELCOME,

  sendLocalVideo: false,
  customData: {},

  // When holding down spacebar, durations shorter that this will trigger
  // a message like "Keep holding spacebar while you talk"
  tapThreshold: 700, // ms

  // How long can the user be inactive before timeout
  timeout: 480 * 1000, // ms
  // How close to the end of the timeout should we show the warning
  timeoutWarning: 180 * 1000, // ms
  // e.g. timeout=90sec, timeoutWarning=30sec - after 60 secs of inactivity warning will show, after 90 secs sessions ends

  // If the avatar is not centred within the video avatarPosition needs to be changed.
  // This will ensure correct positioning narrow (mobile) screens
  avatarAspect: 16 / 9, // video aspect ratio
  avatarPosition: 0.5, // Where is the avatar in the video frame (0.5 = center, 0.33 = 1/3 from the left)

  informationInTranscript: false,

  // show we show the contact form after Feedback?
  showEscalationForm: false,

  // How many empty transcripts before an error is shown
  emptyTranscriptThreshold: 3,
  avatarName: 'a Digital Human',

  //downloadPdf,

  // Optional - track events
  // analytics: (label: string, action?: string) => {
  //   console.info('analytics event:', { label, action })
  //   // Send the event to your analytics backend
  //   // Example Google Universal Analytics (gtag.js)
  //   // https://developers.google.com/analytics/devguides/collection/gtagjs
  //   gtag('event', 'action', {
  //     event_category: 'my-category',
  //     event_label: label
  //   })
  // },

  ...environment
}

export default config
