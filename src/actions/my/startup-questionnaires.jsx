import { genApiUrl, genAxios, addParamsToUrl } from '../../services/api-request'
import { getFormData } from '../../services/get-form-data'
import { apiMyStartupQuestionnairesShow, apiMyStartupQuestionnairesIndex } from '../../services/api-path'

import { notySuccess } from '../../services/noty'

export const MERGE_MY_STARTUP_QUESTIONNAIRES = "MERGE_MY_STARTUP_QUESTIONNAIRES"
export const mergeMyStartupQuestionnaires = (data, reset) => {
  return {
    type: MERGE_MY_STARTUP_QUESTIONNAIRES,
    data,
    reset
  }
}

export const RESET_MY_STARTUP_QUESTIONNAIRES = "RESET_MY_STARTUP_QUESTIONNAIRES"
export const resetMyStartupQuestionnaire = () => {
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
      dispatch(resetMyStartupQuestionnaire())
    }
  }
}

// TODO: add a delete one for deleting members, founders...etc
export const U_MY_STARTUP_QUESTIONNAIRE = "U_MY_STARTUP_QUESTIONNAIRE"
export const uMyStartupQuestionnaire = (values, cb, routeParams) => {
  const checkAvatar = (x) => {
    const file = _.get(x, 'avatar[0]')
    if (file) {
      _.set(x, 'avatar', file)
    } else {
      _.set(x, 'avatar', null)
    }
  }

  const checkFile = (x) => {
    const file = _.get(x, 'file[0]')
    if (file) {
      _.set(x, 'file', file)
    } else {
      _.set(x, 'file', null)
    }
  }

  const checkAvatarList = [
    'team.startup_questionnaire_team_founders',
    'team.startup_questionnaire_team_members',
    'team.startup_questionnaire_team_advisors'
  ]

  checkAvatarList.forEach((c) => {
    const arr = _.get(values, c) || []
    arr.forEach(checkAvatar)
  })

  const checkFileList = [
    'attachments.attachments',
    'teaser.attachments',
    'market.attachments',
    'strategy.attachments',
    'team.attachments',
    'financial.attachments',
    'investment.attachments'
  ]

  checkFileList.forEach((c) => {
    const arr = _.get(values, c) || []
    arr.forEach(checkFile)
  })

  console.log(params)

  const params = {
    startup_questionnaire_basic_attributes: {
      id: _.get(values, 'basic.id', null),
      company_name: _.get(values, 'basic.company_name', null),
      founded_year: _.get(values, 'basic.founded_year', null),
      country_of_incorporation: _.get(values, 'basic.country_of_incorporation', null),
      vertical: _.get(values, 'basic.vertical', null),
      tagline: _.get(values, 'basic.tagline', null),
      hashtags: _.get(values, 'basic.hashtags', null),
      logo: _.get(values, 'basic.logo', null),
      banner: _.get(values, 'basic.banner', null)
    },
    startup_questionnaire_teaser_attributes: {
      id: _.get(values, 'teaser.id', null),
      problem: _.get(values, 'teaser.problem', null),
      solution: _.get(values, 'teaser.solution', null),
      make_money: _.get(values, 'teaser.make_money', null),
      unique_selling_point: _.get(values, 'teaser.unique_selling_point', null),
      pitch_deck: _.get(values, 'teaser.pitch_deck', null),
      business_plan: _.get(values, 'teaser.business_plan', null),
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
      unique_selling_point: _.get(values, 'market.unique_selling_point', null),
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
      three_kpis: _.get(values, 'financial.three_kpis', null),
      break_even: _.get(values, 'financial.break_even', null),
      income_statements: _.get(values, 'financial.income_statements[0]', null),
      cash_flow_statements: _.get(values, 'financial.cash_flow_statements[0]', null),
      current_fund: _.get(values, 'financial.current_fund', null),
      monthly_cash_burn: _.get(values, 'financial.monthly_cash_burn', null),
      startup_questionnaire_financial_fund_histories_attributes: _.get(values, 'financial.startup_questionnaire_financial_fund_histories', null),
      startup_questionnaire_financial_use_of_funds_attributes: _.get(values, 'financial.startup_questionnaire_financial_use_of_funds', null),
      attachments_attributes: _.get(values, 'financial.attachments', null)
    },
    startup_questionnaire_investment_attributes: {
      id: _.get(values, 'investment.id', null),
      exit_strategy: _.get(values, 'investment.exit_strategy', null),
      attachments_attributes: _.get(values, 'investment.attachments', null)
    },
    attachments_attributes: _.get(values, 'attachments.attachments', null)
  }

  const request = genAxios({
    method: "put",
    url: genApiUrl(apiMyStartupQuestionnairesShow(routeParams)),
    data: getFormData(params, 'startup_questionnaire')
  })

  return {
    type: U_MY_STARTUP_QUESTIONNAIRE,
    request,
    successCB: (dispatch, data) => {
      dispatch(mergeMyStartupQuestionnaires({ startup_questionnaires: [data] }))
      notySuccess("Saved!")
      if (cb) cb(data)
    }
  }
}
