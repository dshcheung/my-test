export const mergeData = (currentList, targetList) => {
  targetList.forEach((tl) => {
    const index = _.findIndex(currentList, (cl) => {
      return cl.id === tl.id
    })

    if (index < 0) {
      currentList.push(tl)
    } else {
      currentList.splice(index, 1, tl)
    }
  })

  return [...currentList]
}

export const isEmpty = (obj) => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false
    }
  }
  return true
}
