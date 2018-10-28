import { genApiUrl, genAxios } from '../services/api-request'
import { getFormData } from '../services/get-form-data'
import { apiNewsletterIndex } from '../services/api-path'

import { notySuccess } from '../services/noty'

export const C_NEWSLETTER = "C_NEWSLETTER"
export const cNewsletter = (values, action, form) => {
  const request = genAxios({
    method: "post",
    url: genApiUrl(apiNewsletterIndex()),
    data: getFormData({
      email: _.get(values, 'email', null),
      first_name: _.get(values, 'firstName', null),
      last_name: _.get(values, 'lastName', null)
    }, 'user')
  })

  return {
    type: C_NEWSLETTER,
    request,
    hasRedirection: true,
    successCB: () => {
      notySuccess("Succesfully subscribed to our newletter")
      form.reset()
    }
  }
}
