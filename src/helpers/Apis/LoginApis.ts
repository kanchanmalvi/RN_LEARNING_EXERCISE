import {Alert} from 'react-native'
import ApiEndpoints from '../http/ApiEndpoints'
import http from '../http/useHttp'

export const LoginUser = ({
  jsonData,
  success,
  error,
}: {
  jsonData: any
  success: (e: any) => void
  error: (e: any) => void
}) => {
  http.request({
    method: 'post',
    auth: true,
    path: 'user-login',
    jsonData,
    success: e => {
      success(e)
      console.log('success', e)
    },
    error: e => {
      error(e)
      // console.log('error', e)
    },
  })
}

export const LogoutUser = ({
  // jsonData,
  success,
  error,
}: {
  // jsonData: any
  success: (e: any) => void
  error: (e: any) => void
}) => {
  http.request({
    method: 'post',
    auth: false,
    path: ApiEndpoints.logout,
    //   jsonData,
    success: e => {
      success(e)
      console.log('success', e)
    },
    error: e => {
      error(e)
      // console.log('error', e)
    },
  })
}
