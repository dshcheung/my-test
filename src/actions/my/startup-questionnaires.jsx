import { genApiUrl, genAxios, addParamsToUrl } from '../../services/api-request'
import { getFormData } from '../../services/get-form-data'
import { apiMyStartupQuestionnairesShow, apiMyStartupQuestionnairesIndex } from '../../services/api-path'

import { notySuccess } from '../../services/noty'
import { getType } from '../../services/utils'

export const MERGE_MY_STARTUP_QUESTIONNAIRES = "MERGE_MY_STARTUP_QUESTIONNAIRES"
export const mergeMyStartupQuestionnaires = (data, reset) => {
  return {
    type: MERGE_MY_STARTUP_QUESTIONNAIRES,
    data,
    reset
  }
}

export const RESET_MY_STARTUP_QUESTIONNAIRES = "RESET_MY_STARTUP_QUESTIONNAIRES"
export const resetMyStartupQuestionnaires = () => {
  return {
    type: RESET_MY_STARTUP_QUESTIONNAIRES
  }
}

export const G_MY_STARTUP_QUESTIONNAIRES = "G_MY_STARTUP_QUESTIONNAIRES"
export const gMyStartupQuestionnaires = ({ queries = {}, nextHref = null } = {}) => {
  const request = genAxios({
    method: "get",
    url: nextHref ? addParamsToUrl(nextHref, queries) : genApiUrl(apiMyStartupQuestionnairesIndex(), queries)
  })

  return {
    type: G_MY_STARTUP_QUESTIONNAIRES,
    request,
    paginate: true,
    successCB: (dispatch, data) => {
      dispatch(mergeMyStartupQuestionnaires(data, !nextHref))
      dispatch(resetMyStartupQuestionnaires())
    }
  }
}

export const SET_MY_STARTUP_QUESTIONNAIRE = "SET_MY_STARTUP_QUESTIONNAIRE"
export const setMyStartupQuestionnaire = (data) => {
  return {
    type: SET_MY_STARTUP_QUESTIONNAIRE,
    data
  }
}

export const RESET_MY_STARTUP_QUESTIONNAIRE = "RESET_MY_STARTUP_QUESTIONNAIRE"
export const resetMyStartupQuestionnaire = () => {
  return {
    type: RESET_MY_STARTUP_QUESTIONNAIRE
  }
}

export const G_MY_STARTUP_QUESTIONNAIRE = "G_MY_STARTUP_QUESTIONNAIRE"
export const gMyStartupQuestionnaire = ({ queries = {}, params = {} } = {}) => {
  const request = genAxios({
    method: "get",
    url: genApiUrl(apiMyStartupQuestionnairesShow(params), queries)
  })

  return {
    type: G_MY_STARTUP_QUESTIONNAIRE,
    request,
    successCB: (dispatch, data) => {
      dispatch(setMyStartupQuestionnaire(data))
    }
  }
}

export const C_MY_STARTUP_QUESTIONNAIRE = "C_MY_STARTUP_QUESTIONNAIRE"
export const cMyStartupQuestionnaire = (values, cb) => {
  const params = generateParams(values)

  const request = genAxios({
    method: "post",
    url: genApiUrl(apiMyStartupQuestionnairesIndex()),
    data: getFormData(params, 'startup_questionnaire')
  })

  return {
    type: C_MY_STARTUP_QUESTIONNAIRE,
    request,
    successCB: (dispatch, data) => {
      dispatch(setMyStartupQuestionnaire(data))
      notySuccess("Saved!")
      if (cb) cb(data)
    }
  }
}

// TODO2: add a delete one for deleting members, founders...etc
export const U_MY_STARTUP_QUESTIONNAIRE = "U_MY_STARTUP_QUESTIONNAIRE"
export const uMyStartupQuestionnaire = (values, cb, routeParams) => {
  const params = generateParams(values)

  const request = genAxios({
    method: "put",
    url: genApiUrl(apiMyStartupQuestionnairesShow(routeParams)),
    data: getFormData(params, 'startup_questionnaire')
  })

  return {
    type: U_MY_STARTUP_QUESTIONNAIRE,
    request,
    successCB: (dispatch, data) => {
      dispatch(setMyStartupQuestionnaire(data))
      notySuccess("Saved!")
      if (cb) cb(data)
    }
  }
}

const checkFile = (x, key) => {
  const value = _.get(x, key)
  const valueType = getType(value)

  _.set(x, key, null)

  console.log(valueType)
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

  // if (file) {
  //   _.set(x, key, file)
  // } else {
  // }
}

const generateParams = (values) => {
  // console.log(values)

  const checkFileList = [
    { target: 'teaser.startup_questionnaire_media', key: 'logo' },
    { target: 'team.startup_questionnaire_team_founders', key: 'avatar' },
    { target: 'team.startup_questionnaire_team_members', key: 'avatar' },
    { target: 'team.startup_questionnaire_team_advisors', key: 'avatar' },
    { target: 'basic.attachments', key: 'file' },
    { target: 'teaser.attachments', key: 'file' },
    { target: 'product.attachments', key: 'file' },
    { target: 'market.attachments', key: 'file' },
    { target: 'team.attachments', key: 'file' },
    { target: 'financial.attachments', key: 'file' },
    { target: 'campaign.attachments', key: 'file' },
    { target: 'dataroom.attachments', key: 'file' },
  ]

  checkFileList.forEach((c) => {
    const arr = _.get(values, c.target) || []

    arr.forEach((el) => {
      checkFile(el, c.key)
    })
  })

  let startup_questionnaire_previous_funds_attributes = _.get(values, 'financial.startup_questionnaire_previous_funds', null)
  if (startup_questionnaire_previous_funds_attributes) {
    startup_questionnaire_previous_funds_attributes = startup_questionnaire_previous_funds_attributes.map((pf) => {
      return {
        id: _.get(pf, 'id', null),
        occurred_on: _.get(pf, 'occurred_on', null),
        fund_type: _.get(pf, 'fund_type', null),
        money_attributes: _.get(pf, 'money', null)
      }
    })
  }

  const params = {
    startup_questionnaire_basic_attributes: {
      id: _.get(values, 'basic.id', null),
      company_name: _.get(values, 'basic.company_name', null),
      founded_year: _.get(values, 'basic.founded_year', null),
      country_of_incorporation: _.get(values, 'basic.country_of_incorporation', null),
      vertical: _.get(values, 'basic.vertical', null),
      tagline: _.get(values, 'basic.tagline', null),
      hashtags_attributes: _.get(values, 'basic.hashtags', null),
      attachments_attributes: _.get(values, 'basic.attachments', null)
    },
    startup_questionnaire_teaser_attributes: {
      id: _.get(values, 'teaser.id', null),
      problem: _.get(values, 'teaser.problem', null),
      solution: _.get(values, 'teaser.solution', null),
      make_money: _.get(values, 'teaser.make_money', null),
      solution_benchmark: _.get(values, 'teaser.solution_benchmark', null),
      pitch_deck: _.get(values, 'teaser.pitch_deck[0]', null),
      business_plan: _.get(values, 'teaser.business_plan[0]', null),
      startup_questionnaire_highlights_attributes: _.get(values, 'teaser.startup_questionnaire_highlights', null),
      startup_questionnaire_media_attributes: _.get(values, 'teaser.startup_questionnaire_media', null),
      attachments_attributes: _.get(values, 'teaser.attachments', null)
    },
    startup_questionnaire_product_attributes: {
      id: _.get(values, 'product.id', null),
      product: _.get(values, 'product.product', null),
      startup_questionnaire_patents_attributes: _.get(values, 'product.startup_questionnaire_patents', null),
      attachments_attributes: _.get(values, 'product.attachments', null)
    },
    startup_questionnaire_market_attributes: {
      id: _.get(values, 'market.id', null),
      global_market: _.get(values, 'market.global_market', null),
      global_market_metrics: _.get(values, 'market.global_market_metrics[0]', null),
      target_market: _.get(values, 'market.target_market', null),
      target_market_metrics: _.get(values, 'market.target_market_metrics[0]', null),
      solution_benchmark: _.get(values, 'market.solution_benchmark', null),
      barriers_to_entry: _.get(values, 'market.barriers_to_entry', null),
      traction: _.get(values, 'market.traction', null),
      competition_landscape: _.get(values, 'market.competition_landscape', null),
      competitors_attributes: _.get(values, 'market.competitors', null),
      go_to_market_strategies_attributes: _.get(values, 'market.go_to_market_strategies', null),
      attachments_attributes: _.get(values, 'market.attachments', null)
    },
    startup_questionnaire_team_attributes: {
      id: _.get(values, 'team.id', null),
      story: _.get(values, 'team.story', null),
      startup_questionnaire_team_founders_attributes: _.get(values, 'team.startup_questionnaire_team_founders', null),
      startup_questionnaire_team_members_attributes: _.get(values, 'team.startup_questionnaire_team_members', null),
      startup_questionnaire_team_advisors_attributes: _.get(values, 'team.startup_questionnaire_team_advisors', null),
      attachments_attributes: _.get(values, 'team.attachments', null)
    },
    startup_questionnaire_financial_attributes: {
      id: _.get(values, 'financial.id', null),
      income_statement: _.get(values, 'financial.income_statement[0]', null),
      cash_flow_statement: _.get(values, 'financial.cash_flow_statement[0]', null),
      cash_burn_attributes: _.get(values, 'financial.cash_burn', null),
      startup_questionnaire_break_even_attributes: _.get(values, 'financial.startup_questionnaire_break_even', null),
      startup_questionnaire_use_of_funds_attributes: _.get(values, 'financial.startup_questionnaire_use_of_funds', null),
      startup_questionnaire_previous_funds_attributes,
      startup_questionnaire_cap_tables_attributes: _.get(values, 'financial.startup_questionnaire_cap_tables', null),
      attachments_attributes: _.get(values, 'financial.attachments', null)
    },
    startup_questionnaire_campaign_attributes: {
      id: _.get(values, 'campaign.id', null),
      raised_attributes: _.get(values, 'campaign.raised', null),
      campaign_type: _.get(values, 'campaign.campaign_type', null),
      equity_percentage: _.get(values, 'campaign.equity_percentage', null),
      pre_money_valuation_attributes: _.get(values, 'campaign.pre_money_valuation', null),
      discount_rate: _.get(values, 'campaign.discount_rate', null),
      interest_rate: _.get(values, 'campaign.interest_rate', null),
      maturity_date: _.get(values, 'campaign.maturity_date', null),
      valuation_cap_attributes: _.get(values, 'campaign.valuation_cap', null),
      attachments_attributes: _.get(values, 'campaign.attachments', null)
    },
    attachments_attributes: _.get(values, 'dataroom.attachments', null)
  }

  // console.log(params)

  return params
}
