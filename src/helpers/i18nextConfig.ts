import React from 'react'
import i18n from 'i18next'
import {initReactI18next} from 'react-i18next'
import HttpApi from 'i18next-http-backend'
import {getStoreData} from './Storage/storage'
import english from './english/index.json'
import httpConfig from './http/httpConfig'
let token = ''
getStoreData('access_token').then(val => {
  token = val
})
console.log(token)

i18n
  // Enables the i18next backend
  .use(HttpApi)
  // passes i18n down to react-i18next
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    // save missing?
    saveMissing: false,
    backend: {
      /* translation file path */
      //   loadPath: '/assets/data/locales/{{lng}}.json',
      loadPath: `${httpConfig.baseUrl}get-label-by-language-id/{{lng}}`,
      // addPath: `${httpConfig.baseUrl}administration/label`,
      // parsePayload: (namespace, key, fallbackValue) => {
      //     return {
      //         entry_mode: "web-auto-save",
      //         language_id: 1,
      //         label_name: key,
      //         label_value: isValid(json[key]) ? json[key] : capitalize(String(fallbackValue).replaceAll("-", " "))
      //     }
      // },
      customHeaders: {
        authorization: `Bearer ${token ?? ''}`,
      },
      // request: (options, url, payload, callback) => {
      //     // callback()
      //     log(options)
      // }
    },
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      en: {
        translation: english,
      },
    },
    lng: 'en', // if you're using a language detector, do not define the lng option
    fallbackLng: 'en',

    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  })
export default i18n
