import Cookies from 'js-cookie'

import { AUTH_TOKEN } from '../constants'

export const RESET_ALL_STATE = "RESET_ALL_STATE"

export const resetAllState = () => {
  Cookies.remove(AUTH_TOKEN)
  return {
    type: RESET_ALL_STATE
  }
}
