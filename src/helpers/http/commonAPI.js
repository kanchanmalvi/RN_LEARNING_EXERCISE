import axios from 'axios'

export const getData = async (endPoint, body, token) => {
  let url = Constants.base_url + endPoint
  let headers = {
    Accept: '*/*',
    'Content-Type': 'application/json',
  }
  if (token) headers['Authorization'] = 'Bearer ' + token

  let configObject = {
    headers: headers,
  }

  if (Array.isArray(body)) {
    body.map(obj => {
      if (!Array.isArray(obj)) obj['entry_mode'] = Constants.entry_mode
    })
  } else body['entry_mode'] = Constants.entry_mode

  // //console.log('token', token)
  // console.log('url-post', url)
  // console.log('params', JSON.stringify(body))

  let response = {}

  try {
    response = await axios.post(url, body, configObject)
  } catch (e) {}
}
