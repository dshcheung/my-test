import axios from 'axios'
import Cookies from 'js-cookie'

import { isEmpty } from './utils'
import { BASE_URL, AUTH_TOKEN } from '../constants'

export function generateQueryString(params, startStr) {
  let queries = ""

  if (!isEmpty(params)) {
    queries += startStr
    _.forOwn(params, (value, key) => {
      if (value) {
        queries += `${key}=${value}&`
      }
    })
  }

  return queries
}

export function genApiUrl(url, params) {
  const queries = generateQueryString(params, '?')
  return `${BASE_URL}${url}${queries}`
}

export function addParamsToUrl(url, params) {
  const queries = generateQueryString(params, '&')
  return `${url}${queries}`
}

export function genAxios(config) {
  const authToken = Cookies.get(AUTH_TOKEN)
  const authHeaderConfig = {
    headers: {}
  }
  if (authToken) {
    authHeaderConfig.headers['X-Authorization'] = authToken
  }

  const newConfig = { ...config, ...authHeaderConfig }

  return axios.request(newConfig)
}
