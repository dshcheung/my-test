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

export const mergeAttribute = (base, { data, attribute, sortBy }) => {
  if (base === null) return base

  let attr = base[attribute]
  const attrType = getType(attr)
  const dataType = getType(data)

  if (attrType === "Array") {
    attr = mergeData(attr, [data])
  }

  if (attrType === "Object") {
    attr = data
  }

  if (attrType === "Null" && dataType === "Object") {
    attr = data
  }

  if (sortBy) {
    attr = _.sortBy(attr, [sortBy]).reverse()
  }

  return { ...base, [attribute]: attr }
}
