import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './translations/en.json'
import ar from './translations/ar.json'

const _en = {
  name: 'en',
  file: en
}

const _ar = {
  name: 'ar',
  file: ar
}

const styleTypes: any = {
  '407e29c5-32e0-4fb6-a29c-e1bcdbe9ddbd': _ar,
  'f700e02b-7e0d-41df-babd-ceb372716c6d': _en,
  '20841bfd-1ae3-4890-8974-b9c392496cd8': _en,
  'f329a084-f32c-4ae9-9fa1-66e54c02d877': _ar
}
const _pid: string =
  process.env.REACT_APP_UNEEQ_PERSONA_ID ||
  '407e29c5-32e0-4fb6-a29c-e1bcdbe9ddbd'
const _lang = styleTypes[_pid]

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    lng: _lang.name,
    interpolation: {
      escapeValue: false // react already safes from xss
    },
    debug: process.env.NODE_ENV === 'development',
    resources: {}
  })
i18n.addResourceBundle(_lang.name, 'translation', _lang.file)

export default i18n
