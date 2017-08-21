export const MERGE_REQUEST_IN_PROCESS = "MERGE_REQUEST_IN_PROCESS"

export function mergeRequestInProcess(inProcess, requestName) {
  return {
    type: MERGE_REQUEST_IN_PROCESS,
    inProcess,
    requestName
  }
}
