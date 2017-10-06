import { genApiUrl, addParamsToUrl, genAxios } from '../../services/api-request'
import { getFormData } from '../../services/get-form-data'
import { apiMyConversationsIndex, apiMyConversationsShow, apiMyMessagesIndex } from '../../services/api-path'

export const MERGE_MY_CONVERSATIONS = "MERGE_MY_CONVERSATIONS"
export const mergeMyConversations = (data, reset) => {
  return {
    type: MERGE_MY_CONVERSATIONS,
    data: data.conversations,
    reset
  }
}

export const G_MY_CONVERSATIONS = "G_MY_CONVERSATIONS"
export const gMyConversations = ({ queries = {}, nextHref = null } = {}) => {
  const request = genAxios({
    method: "get",
    url: nextHref ? addParamsToUrl(nextHref, queries) : genApiUrl(apiMyConversationsIndex(), queries)
  })

  return {
    type: G_MY_CONVERSATIONS,
    request,
    paginate: true,
    successCB: (dispatch, data) => {
      dispatch(mergeMyConversations(data, !nextHref))
    }
  }
}

export const G_MY_CONVERSATION = "G_MY_CONVERSATION"
export const gMyConversation = ({ params = {}, nextHref = null } = {}) => {
  const request = genAxios({
    method: "get",
    url: genApiUrl(apiMyConversationsShow(params))
  })

  return {
    type: G_MY_CONVERSATION,
    request,
    paginate: true,
    successCB: (dispatch, data) => {
      dispatch(mergeMyConversations(data, !nextHref))
    }
  }
}

export const C_MY_MESSAGE = "C_MY_MESSAGE"
export const cMyMessage = (values) => {
  const request = genAxios({
    method: "post",
    url: genApiUrl(apiMyMessagesIndex()),
    data: getFormData(values, 'message')
  })

  return {
    type: C_MY_MESSAGE,
    request,
    // successCB: (dispatch, data) => {
    //
    // }
  }
}
