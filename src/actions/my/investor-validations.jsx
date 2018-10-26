import { push } from 'react-router-redux'
import { genApiUrl, genAxios } from '../../services/api-request'
import { apiMyInvestorValidationsIndex } from '../../services/api-path'

import { notySuccess } from '../../services/noty'

export const U_MY_INVESTOR_VALIDATIONS_MARK_FOR_REVIEW = "U_MY_INVESTOR_VALIDATIONS_MARK_FOR_REVIEW"
export const uMyInvestorValidationsMarkForReview = () => {
  const request = genAxios({
    method: "put",
    url: genApiUrl(apiMyInvestorValidationsIndex())
  })

  return {
    type: U_MY_INVESTOR_VALIDATIONS_MARK_FOR_REVIEW,
    request,
    successCB: (dispatch) => {
      dispatch(push(`/my/investor-validations`))
      notySuccess("Submitted")
    }
  }
}
