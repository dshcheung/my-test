export const scrollTop = () => {
  const element = document.getElementsByTagName("html")[0]

  if (element) {
    element.scrollTop = 0
  }
}

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

export const checkFile = (x, key) => {
  const value = _.get(x, key)
  const valueType = getType(value)

  _.set(x, key, null)

  switch (valueType) {
    case "Object": {
      _.set(x, key, null)
      break
    }
    case "FileList": {
      const file = _.get(value, "[0]")
      if (file) {
        _.set(x, key, file)
      }
      break
    }
    case "File": {
      _.set(x, key, value)
    }
  }
}

export const mergeAttribute = (base, { data, targetPath, overrideTargetType }) => {
  if (base === null) return base

  const target = _.get(base, targetPath)
  const targetType = overrideTargetType || getType(target)
  // const dataType = getType(data)

  if (targetType === "Array") {
    _.set(base, targetPath, mergeData(target, [data]))
  }

  if (targetType === "Object") {
    _.set(base, targetPath, data)
  }

  if (targetType === "Null") {
    _.set(base, targetPath, data)
  }

  return { ...base }
}

export const deleteAttribute = (base, { id, targetPath }) => {
  let target = _.get(base, targetPath)

  target = _.filter(target, (a) => {
    return a.id !== id
  })

  _.set(base, targetPath, target)

  return { ...base }
}

export const extractAttrFromRoutes = (routes, key) => {
  const reversedRoutes = []
  let value

  routes.forEach((r) => {
    reversedRoutes.unshift(r)
  })

  reversedRoutes.forEach((r) => {
    if (_.get(r, key)) {
      value = _.get(r, key)
    }
  })

  return value
}

export const getQuestionnaire = (myQuestionnaires, myCampaignID) => {
  return _.find(myQuestionnaires, (q) => {
    return q && q.campaign && q.campaign.id && q.campaign.id === myCampaignID
  })
}

export const formatQuestionnaire = (questionnaires, startupID) => {
  const myQuestionnaires = {}

  for (let i = 0; i < questionnaires.length; i += 1) {
    const question = questionnaires[i]
    const questionnaireID = question.questionnaire_id
    const questionID = question.question_id

    if (!myQuestionnaires[questionnaireID]) {
      myQuestionnaires[questionnaireID] = {}
    }

    const updatedAt = _.get(myQuestionnaires[questionnaireID][questionID], 'updated_at')
    if (!updatedAt || updatedAt < question.updated_at) {
      let update = false

      if (startupID) {
        if (startupID === question.startup_id) {
          update = true
        }
      } else {
        update = true
      }

      if (update) {
        myQuestionnaires[questionnaireID][questionID] = {
          question_id: questionID,
          answer_type: question.answer_type,
          updated_at: question.updated_at
        }

        switch (question.answer_type) {
          case "datetime":
            myQuestionnaires[questionnaireID][questionID].answer = moment(question.answer).toDate()
            break
          case "date":
            myQuestionnaires[questionnaireID][questionID].answer = moment(question.answer).toDate()
            break
          case "file":
            myQuestionnaires[questionnaireID][questionID].answer = ""
            myQuestionnaires[questionnaireID][questionID].answer_file = question.answer
            break
          default:
            myQuestionnaires[questionnaireID][questionID].answer = question.answer
        }
      }
    }
  }

  return myQuestionnaires
}

export const getFileIcon = (ext) => {
  const excel = "fa-file-excel"
  const pdf = "fa-file-pdf"
  const powerpoint = "fa-file-powerpoint"
  const word = "fa-file-word"
  const alt = "fa-file-alt"

  switch (ext) {
    case "csv":
      return excel
    case "xslx":
      return excel
    case "xsl":
      return excel
    case "pdf":
      return pdf
    case "pptx":
      return powerpoint
    case "ppt":
      return powerpoint
    case "docx":
      return word
    case "doc":
      return word
    default:
      return alt
  }
}
