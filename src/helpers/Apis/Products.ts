import ApiEndpoints from '../http/ApiEndpoints'
import http from '../http/useHttp'

//list
export const LoadProducts = ({
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
    path: ApiEndpoints.loadProductsList,
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

// post
export const CreateProduct = ({
  success,
  error,
  formData,
  loading,
}: {
  success: (e: any) => void
  error: (e: any) => void
  formData: any
  loading?: (e: boolean) => void
}) => {
  http.request({
    method: 'post',
    path: ApiEndpoints.createProduct,
    formData,
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
export const ProductDetails = ({
  id,
  success,
  error,
  loading,
}: {
  id: number | string
  success: (e: any) => void
  error: (e: any) => void
  loading?: (e: boolean) => void
}) => {
  http.request({
    method: 'get',
    path: ApiEndpoints.productsdetailspage + id,
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
export const DeleteProduct = ({
  id,
  success,
  error,
  loading,
}: {
  id: any
  success: (e: any) => void
  error: (e: any) => void
  loading?: (e: boolean) => void
}) => {
  http.request({
    method: 'delete',
    path: ApiEndpoints.productDelete + id,
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

// Update
export const ProductUpdate = ({
  id,
  formData,
  success,
  error,
  loading,
}: {
  id: number | string
  success: (e: any) => void
  error: (e: any) => void
  formData: any
  loading?: (e: boolean) => void
}) => {
  http.request({
    method: 'post',
    path: ApiEndpoints.updateProduct + id,
    formData,
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
