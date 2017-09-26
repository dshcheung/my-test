import { mergeRequestInProcess } from './actions/request-status'
import { mergePaginate } from './actions/pagination'
import { resetAllState } from './actions/session'

export default function promiseMiddleware() {
  return next => (action) => {
    const { request, type, successCB, errorCB, paginate, preRequestCB } = action

    if (!request) { return next(action) }

    next((dispatch, getState) => {
      const requestInProcess = getState().requestStatus[type]

      if (requestInProcess) { return }

      if (preRequestCB) { preRequestCB(dispatch) }

      dispatch({ type: `FROM ${type}` })
      dispatch(mergeRequestInProcess(true, type))

      return request.then((resp) => {
        if (successCB) { successCB(dispatch, resp.data.data, resp.data) }
        if (paginate) { dispatch(mergePaginate(resp.data.links, type)) }
        dispatch(mergeRequestInProcess(false, type))
      }).catch((error) => {
        if (error && error.response) {
          if (error.response.status === 401) { dispatch(resetAllState(dispatch)) }

          if (errorCB) { errorCB(dispatch, error.response) }
        }
        if (paginate) { dispatch(mergePaginate(null, type)) }
        dispatch(mergeRequestInProcess(false, type))
      })
    })
  }
}
