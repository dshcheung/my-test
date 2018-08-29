import { push } from 'react-router-redux'
import { genApiUrl, genAxios } from '../../services/api-request'
import { getFormData } from '../../services/get-form-data'
import { apiMyInvestorQuestionnaireIndex, apiMyInvestorQuestionnaireMarkForReviewIndex } from '../../services/api-path'

import { notySuccess } from '../../services/noty'
import { checkFile } from '../../services/utils'

export const SET_MY_INVESTOR_QUESTIONNAIRE = "SET_MY_INVESTOR_QUESTIONNAIRE"
export const setMyInvestorQuestionnaire = (data) => {
  return {
    type: SET_MY_INVESTOR_QUESTIONNAIRE,
    data
  }
}

export const RESET_MY_INVESTOR_QUESTIONNAIRE = "RESET_MY_INVESTOR_QUESTIONNAIRE"
export const resetMyInvestorQuestionnaire = () => {
  return {
    type: RESET_MY_INVESTOR_QUESTIONNAIRE
  }
}

export const G_MY_INVESTOR_QUESTIONNAIRE = "G_MY_INVESTOR_QUESTIONNAIRE"
export const gMyInvestorQuestionnaire = ({ queries = {} } = {}) => {
  const request = genAxios({
    method: "get",
    url: genApiUrl(apiMyInvestorQuestionnaireIndex(), queries)
  })

  return {
    type: G_MY_INVESTOR_QUESTIONNAIRE,
    request,
    successCB: (dispatch, data) => {
      dispatch(setMyInvestorQuestionnaire(data))
    }
  }
}

export const U_MY_INVESTOR_QUESTIONNAIRE = "U_MY_INVESTOR_QUESTIONNAIRE"
export const uMyInvestorQuestionnaire = (values, cb) => {
  const request = genAxios({
    method: "put",
    url: genApiUrl(apiMyInvestorQuestionnaireIndex()),
    data: getFormData(generateParams(values), 'investor_questionnaire')
  })

  return {
    type: U_MY_INVESTOR_QUESTIONNAIRE,
    request,
    successCB: (dispatch, data) => {
      dispatch(setMyInvestorQuestionnaire(data))
      notySuccess("Saved!")
      if (cb) cb(data)
    }
  }
}

export const D_MY_INVESTOR_QUESTIONNAIRE_ATTRIBUTE = "D_MY_INVESTOR_QUESTIONNAIRE_ATTRIBUTE"
export const dMyInvestorQuestionnaireAttribute = (values, cb) => {
  const request = genAxios({
    method: "put",
    url: genApiUrl(apiMyInvestorQuestionnaireIndex()),
    data: getFormData(generateParams(values), 'investor_questionnaire')
  })

  return {
    type: D_MY_INVESTOR_QUESTIONNAIRE_ATTRIBUTE,
    request,
    noScrollTop: true,
    successCB: (dispatch, data) => {
      if (cb) cb(data)
      dispatch(setMyInvestorQuestionnaire(data, true))
      notySuccess("Deleted!")
    }
  }
}

export const U_MY_INVESTOR_QUESTIONNAIRE_MARK_FOR_REVIEW = "U_MY_INVESTOR_QUESTIONNAIRE_MARK_FOR_REVIEW"
export const uMyInvestorQuestionnaireMarkForReview = () => {
  const request = genAxios({
    method: "put",
    url: genApiUrl(apiMyInvestorQuestionnaireMarkForReviewIndex())
  })

  return {
    type: U_MY_INVESTOR_QUESTIONNAIRE_MARK_FOR_REVIEW,
    request,
    successCB: (dispatch, data) => {
      dispatch(push(`/my/investor-validations`))
      dispatch(setMyInvestorQuestionnaire(data))
      notySuccess("Submitted")
    }
  }
}

const generateParams = (values) => {
  const attachments = _.get(values, "attachments") || []

  attachments.forEach((el) => {
    checkFile(el, 'file')
  })

  const params = {
    investor_source_of_funds_attributes: _.get(values, 'investor_source_of_funds', null),
    income_covers_expense: _.get(values, 'income_covers_expense', null),
    income_covers_expense_reason: _.get(values, 'income_covers_expense_reason', null),
    years_until_retirement: _.get(values, 'years_until_retirement', null),

    occupation: _.get(values, 'occupation', null),
    occupation_industry: _.get(values, 'occupation_industry', null),
    years_of_experience: _.get(values, 'years_of_experience', null),
    investor_type_of_products_attributes: _.get(values, 'investor_type_of_products', null),
    frequency: _.get(values, 'frequency', null),
    scale: _.get(values, 'scale', null),

    portfolio_value: _.get(values, 'portfolio_value', null),
    education_level: _.get(values, 'education_level', null),
    employment_status: _.get(values, 'employment_status', null),
    monthly_income: _.get(values, 'monthly_income', null),
    dependents: _.get(values, 'dependents', null),
    private_equity_experience: _.get(values, 'private_equity_experience', null),
    previous_investments: _.get(values, 'previous_investments', null),
    previous_investment_amount: _.get(values, 'previous_investment_amount', null),

    attachments_attributes: _.get(values, 'attachments', null)
  }

  return params
}
