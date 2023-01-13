import ApiEndpoints from '../http/ApiEndpoints'
import http from '../http/useHttp'

//list
export const LoadStock = ({
  success,
  error,
  loading,
}: {
  success: (e: any) => void
  error: (e: any) => void
  loading: (e: boolean) => void
}) => {
  http.request({
    method: 'post',
    path: ApiEndpoints.loadStockList,
    loading,
    success: e => {
      success(e)
      console.log('success q', e)
    },
    error: e => {
      error(e)
      // console.log('error', e)
    },
  })
}

//post
export const CreateStock = ({
  jsonData,
  success,
  error,
  loading,
}: {
  jsonData: any
  success: (e: any) => void
  error: (e: any) => void
  loading: (e: boolean) => void
}) => {
  http.request({
    method: 'post',
    path: ApiEndpoints.createStock,
    jsonData,
    loading,
    success: e => {
      success(e)
      console.log('success q', e)
    },
    error: e => {
      error(e)
      // console.log('error', e)
    },
  })
}

// details
export const stockdetailspage = ({
  id,
  success,
  error,
  loading,
}: {
  id: number | string
  success: (e: any) => void
  error: (e: any) => void
  loading: (e: boolean) => void
}) => {
  http.request({
    method: 'get',
    path: ApiEndpoints.stockdetails + id,
    loading,
    success: e => {
      success(e)
      // console.log('success q', e)
    },
    error: e => {
      error(e)
      // console.log('error', e)
    },
  })
}

// delete
export const DeleteStock = ({
  id,
  success,
  error,
}: {
  id: any
  success: (e: any) => void
  error: (e: any) => void
}) => {
  http.request({
    method: 'delete',
    path: ApiEndpoints.stockDelete + id,

    success: e => {
      success(e)
      // console.log('success q', e)
    },
    error: e => {
      error(e)
      // console.log('error', e)
    },
  })
}

//post
export const updateStock = ({
  id,
  jsonData,
  success,
  error,
  loading,
}: {
  id: number | string
  jsonData: any
  success: (e: any) => void
  error: (e: any) => void
  loading: (e: boolean) => void
}) => {
  http.request({
    method: 'put',
    path: ApiEndpoints.updatestock + id,
    jsonData,
    loading,
    success: e => {
      success(e)
      console.log('success q', e)
    },
    error: e => {
      error(e)
      console.log('error', e)
    },
  })
}
