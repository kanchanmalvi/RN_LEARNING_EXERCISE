import axios from 'axios'
import {store} from '../../redux'
import {getStoreData} from '../Storage/storage'
import {StoreKey} from '../Storage/storageKeys'
import {isValid} from '../utils'
import defaultHttpConfig from './httpConfig'

export default class HttpService {
  // ** apiConfig <= Will be used by this service
  httpConfig = {...defaultHttpConfig}

  subscribers = []

  isAlreadyFetchingAccessToken = false

  constructor(httpConfigOverride: any) {
    this.httpConfig = {...this.httpConfig, ...httpConfigOverride}

    // ** Request Interceptor
    axios.interceptors.request.use(
      config => {
        // ** Get token from localStorage
        const accessToken = store.getState()?.user?.token
        // this.getToken().then(e=> accessToken = e.token)

        // ** If token is present add it to request's Authorization Header
        if (accessToken) {
          // ** eslint-disable-next-line no-param-reassign
          config.headers!.Authorization = `${this.httpConfig.tokenType} ${accessToken}`
        }
        return config
      },
      error => Promise.reject(error),
    )
  }

  // onAccessTokenFetched(accessToken: string) {
  //   this.subscribers = this.subscribers.filter(callback =>
  //     callback(accessToken),
  //   )
  // }

  // addSubscriber(callback: never) {
  //   this.subscribers.push(callback)
  // }
  async getToken() {
    // return localStorage.getItem(this.httpConfig.storageTokenKeyName)
    // let token
    return getStoreData(StoreKey.userDataToken)
    // return token
  }

  isUnauthenticated = (data: any) => {
    // if (data?.code === 401) {
    //   Emitter.emit(Events.Unauthenticated, true)
    //   localStorage.removeItem('AcceussUserData')
    //   localStorage.removeItem('access_token')
    // } else if (data?.code === 422) {
    //   if (!localStorage.getItem('AcceussUserData')) {
    //     Emitter.emit(Events.Unauthenticated, true)
    //   }
    // } else if (data?.code === 400) {
    //   if (!localStorage.getItem('AcceussUserData')) {
    //     Emitter.emit(Events.Unauthenticated, true)
    //   }
    // } else {
    //   Emitter.emit(Events.Unauthenticated, false)
    // }
  }

  getFormData = (data: any) => {
    const formData = new FormData()
    if (data) {
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          formData.append(key, data[key])
        }
      }
    }
    return formData
  }
  request({
    async = false,
    noEntryMode = false,
    showErrorToast = false,
    showSuccessToast = false,
    method = 'post',
    path = '',
    jsonData = null,
    formData = null,
    params = null,
    auth = true,
    success = (e: any) => {},
    error = (e: any) => {},
    loading = (value: boolean) => {},
    ...extra
  }: {
    async?: boolean
    noEntryMode?: boolean
    showErrorToast?: boolean
    showSuccessToast?: boolean
    method: 'post' | 'get' | 'put' | 'delete'
    path: string
    jsonData?: any
    formData?: any
    params?: any
    auth?: boolean
    success?: (e: any) => void
    error?: (e: any) => void
    loading?: (e: any) => void
  }) {
    let data = null
    if (formData) {
      data = formData
    } else if (jsonData) {
      data = jsonData
    }
    loading(true)
    console.log('jsonData', path, jsonData)
    const settings = {
      method,
      baseURL: this.httpConfig.baseUrl,
      url: path,
      params: {...params}, // entry_mode: `web-${WebAppVersion.current}`
      data,
      transformRequest: [
        (dataT: any, headers: any) => {
          // delete auth header
          if (!auth) {
            delete headers.Authorization
          }
          // change content type
          let re: any
          if (jsonData) {
            re = JSON.stringify(dataT)
            headers['Content-Type'] = 'application/json'
            headers.Accept = '*/*'
          } else if (formData) {
            re = this.getFormData(dataT)
            headers['Content-Type'] = 'multipart/form-data'
            headers.Accept = '*/*'
          }
          // add cors headers
          headers['Access-Control-Allow-Origin'] = '*'
          headers['Access-Control-Allow-Headers'] =
            'Origin, X-Requested-With, Content-Type, Accept'

          return re
        },
      ],
      transformResponse: [
        (dataF: any) => {
          data = JSON.parse(dataF)
          // Do whatever you want to transform the data
          // log("transformResponse", data)
          this.isUnauthenticated(data)
          return data
        },
      ],
      ...extra,
    }

    if (async) {
      return axios(settings)
    } else {
      const http = axios(settings)
      console.log('settings', settings)

      http
        .then(res => {
          this.returnSuccessResponse(
            res,
            showSuccessToast,
            showErrorToast,
            success,
            error,
            loading,
          )
        })
        .catch(e => {
          this.returnErrorResponse(e, showErrorToast, error, loading)
        })
    }
  }

  // rex(showSuccessToast, showErrorToast, success = () => { }, error = () => { }, loading = () => { }) {
  //     axios.interceptors.response.use(
  //         response => {
  //             return response
  //         },
  //         err => {
  //             // ** const { config, response: { status } } = error
  //             const { config, response } = err
  //             const originalRequest = config
  //             log("axios.interceptors.response", { response, config })
  //             // ** if (status === 401) {
  //             if (response && response.status === 401) {
  //                 if (!this.isAlreadyFetchingAccessToken) {
  //                     this.isAlreadyFetchingAccessToken = true
  //                     Emitter.on("AuthSuccess", (x) => {
  //                         log("xx", x)
  //                         const http = axios(originalRequest)
  //                         http.then((res) => {
  //                             this.isAlreadyFetchingAccessToken = false
  //                             this.returnSuccessResponse(res, showSuccessToast, showErrorToast, success, error, loading)
  //                         }).catch((e) => {
  //                             this.returnErrorResponse(e, showErrorToast, error, loading)
  //                         })
  //                     })
  //                 }
  //             }
  //             return Promise.reject(err)
  //         }
  //     )
  // }
  // retryOriginalRequest(originalRequest) {
  //     this.isAlreadyFetchingAccessToken = false
  //     const retryOriginalRequest = new Promise(resolve => {
  //         resolve(axios(originalRequest))
  //     })
  //     return retryOriginalRequest
  // }

  returnSuccessResponse = (
    res: any,
    showSuccessToast = false,
    showErrorToast = false,
    success = (e: any) => {},
    error = (e: any) => {},
    loading = (val: boolean) => {},
  ) => {
    loading(false)
    const data = res.data
    // console.log("response", data)
    if (data.success) {
      success(data)
      if (showSuccessToast && res.data?.message) {
        // SuccessToast(res.data?.message)
      }
    } else {
      error({
        error: true,
        data: res.data,
      })
      if (showErrorToast && res.data?.message) {
        // ErrorToast(res.data?.message)
      }
    }
  }
  returnErrorResponse = (
    e: any,
    showErrorToast: boolean,
    error = (val: any) => {},
    loading = (val: boolean) => {},
  ) => {
    loading(false)
    console.log('response error cache', e)
    error({
      error: true,
      data: e?.response?.data,
      ...e,
    })
    if (showErrorToast && e?.response?.data?.message) {
      // ErrorToast(e?.response?.data?.message)
    }
  }
}
