import {Alert} from 'react-native'
import ApiEndpoints from '../http/ApiEndpoints'
import http from '../http/useHttp'
// import { useNavigation } from '@react-navigation/native'

export const LoadUsers = ({
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
    path: ApiEndpoints.loadUserList,
    jsonData,
    success: e => {
      success(e)
      // console.log('success q', (e))
    },
    error: e => {
      error(e)
      // console.log('error', e)
    },
  })
}

export const CreateUsers = ({
  jsonData,
  success,
  error,
  loading,
}: {
  jsonData: any
  success: (e: any) => void
  GotoList: (e: any) => void
  error: (e: any) => void
  loading?: (e: boolean) => void
}) => {
  http.request({
    loading,
    method: 'post',
    path: ApiEndpoints.userManagementUser,
    jsonData,
    success: e => {
      success(e)
      console.log('success create user', e)
      Alert.alert('user created successfully')
    },
    // GotoList : e=>{
    //     GotoList(e)
    //     console.log('first', e)
    // },
    error: e => {
      error(e)
      // console.log('error', e)
    },
  })
}

export const updateUsers = ({
  jsonData,
  id,
  success,
  error,
}: {
  id: number
  jsonData: any
  success: (e: any) => void
  error: (e: any) => void
}) => {
  http.request({
    method: 'put',
    path: ApiEndpoints.userManagementUser + '/' + id,
    jsonData,

    success: e => {
      success(e)
      console.log('success update user', e)
      Alert.alert('user Updated successfully')
    },
    error: e => {
      error(e)
      // console.log('error', e)
    },
  })
}

export const DeleteUsers = ({
  jsonData,
  id,
  success,
  error,
}: {
  id: number
  jsonData: any
  success: (e: any) => void
  error: (e: any) => void
}) => {
  http.request({
    method: 'delete',
    path: ApiEndpoints.userManagementUser + '/' + id,
    jsonData,
    success: e => {
      success(e)
      console.log('success delete user', e)
      Alert.alert('user Deleted successfully')
    },
    error: e => {
      error(e)
      // console.log('error', e)
    },
  })
}

export const ViewUsers = ({
  jsonData,
  id,
  success,
  error,
}: {
  id: number
  jsonData: any
  success: (e: any) => void
  error: (e: any) => void
}) => {
  http.request({
    method: 'post',
    path: ApiEndpoints.userManagementUser + '/' + id,
    jsonData,
    success: e => {
      success(e)
      console.log('success update user', e)
    },
    error: e => {
      error(e)
      // console.log('error', e)
    },
  })
}
