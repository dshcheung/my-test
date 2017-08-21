export const MERGE_PAGINATE = "MERGE_PAGINATE"

export const mergePaginate = (links, requestName) => {
  const link = links && links.next ? links.next : null

  return {
    type: MERGE_PAGINATE,
    requestName,
    link
  }
}
