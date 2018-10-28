import { genApiUrl, genAxios } from '../services/api-request'
import { getFormData } from '../services/get-form-data'
import { apiContactUsIndex } from '../services/api-path'

import { notySuccess } from '../services/noty'

export const C_CONTACT_US = "C_CONTACT_US"
export const cContactUs = (values, action, form) => {
  const request = genAxios({
    method: "post",
    url: genApiUrl(apiContactUsIndex()),
    data: getFormData({
      email: _.get(values, 'email', null),
      first_name: _.get(values, 'first_name', null),
      last_name: _.get(values, 'last_name', null),
      company: _.get(values, 'company', null),
      message: _.get(values, 'message', null),
      subject: _.get(values, 'subject', null)
    }, 'user')
  })

  return {
    type: C_CONTACT_US,
    request,
    hasRedirection: true,
    successCB: () => {
      notySuccess("Your message have been sent")
      form.reset()
    }
  }
}
