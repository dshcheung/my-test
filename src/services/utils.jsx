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

export const getFullName = (user) => {
  const firstName = _.get(user, 'profile.first_name')
  const lastName = _.get(user, 'profile.last_name')

  let fullName = ""

  if (firstName && lastName) {
    fullName = `${firstName} ${lastName}`
  } else if (firstName && !lastName) {
    fullName = firstName
  } else if (!firstName && lastName) {
    fullName = lastName
  }

  return fullName
}

export const getType = (v) => {
  return toString.call(v).slice(8, -1)
}
