import { genApiUrl, genAxios } from '../../services/api-request'
import { getFormData } from '../../services/get-form-data'
import { apiMyQuestionnairesIndex } from '../../services/api-path'

export const C_MY_QUESTIONNAIRE = "C_MY_QUESTIONNAIRE"
export const cMyQuestionnaire = (values) => {
  const answers = []
  for (const v in values) {
    if (Object.prototype.hasOwnProperty.call(values, v)) {
      answers.push({
        question_id: _.get(values[v], 'question_id', null),
        answer: _.get(values[v], 'answer', null),
        answer_type: _.get(values[v], 'answer_type', null),
      })
    }
  }

  const params = {
    questionnaire_id: _.get(values, 'questionnaire_id', null),
    ...answers[0]
  }

  console.log(params)

  const request = genAxios({
    method: "post",
    url: genApiUrl(apiMyQuestionnairesIndex()),
    data: getFormData(params, 'response')
  })

  return {
    type: C_MY_QUESTIONNAIRE,
    request,
    successCB: (dispatch, data) => {
      console.log(data)
    }
  }
}
