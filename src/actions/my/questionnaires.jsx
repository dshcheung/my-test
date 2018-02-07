import { genApiUrl, genAxios, addParamsToUrl } from '../../services/api-request'
import { getFormData } from '../../services/get-form-data'
import { apiMyQuestionnairesIndex } from '../../services/api-path'

import { setCurrentUser } from '../session'

export const MERGE_MY_QUESTIONNAIRES = "MERGE_MY_QUESTIONNAIRES"
export const mergeMyQuestionnaires = (data, reset) => {
  return {
    type: MERGE_MY_QUESTIONNAIRES,
    data: data.questionnaire_responses,
    reset
  }
}


export const RESET_MY_QUESTIONNAIRES = "RESET_MY_QUESTIONNAIRES"
export const resetMyQuestionnaires = () => {
  return {
    type: RESET_MY_QUESTIONNAIRES
  }
}

export const G_MY_QUESTIONNAIRE = "G_MY_QUESTIONNAIRE"
export const gMyQuestionnaire = ({ queries = {}, nextHref = null } = {}) => {
  const request = genAxios({
    method: "get",
    url: nextHref ? addParamsToUrl(nextHref, queries) : genApiUrl(apiMyQuestionnairesIndex(), queries)
  })

  return {
    type: G_MY_QUESTIONNAIRE,
    request,
    paginate: true,
    successCB: (dispatch, data) => {
      dispatch(mergeMyQuestionnaires(data, !nextHref))
    }
  }
}

export const C_MY_QUESTIONNAIRE = "C_MY_QUESTIONNAIRE"
export const cMyQuestionnaire = (values, cb) => {
  const params = {
    questionnaire_id: _.get(values, 'questionnaire_id', null),
    answers: {}
  }

  for (let i = 0; i < values.answers.length; i += 1) {
    params.answers[i] = {
      question_id: _.get(values.answers, `[${i}].question_id`, null),
      answer_type: _.get(values.answers, `[${i}].answer_type`, null),
      answer: _.get(values.answers, `[${i}].answer[0]`, null) || _.get(values.answers, `[${i}].answer`, null)
    }
  }

  const request = genAxios({
    method: "post",
    url: genApiUrl(apiMyQuestionnairesIndex()),
    data: getFormData(params, 'response')
  })

  return {
    type: C_MY_QUESTIONNAIRE,
    request,
    successCB: (dispatch, data) => {
      if (cb) cb(data)
      dispatch(setCurrentUser(data))
    }
  }
}
