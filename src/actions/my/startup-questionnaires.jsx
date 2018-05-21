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
      // debugger
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

  const founders = _.get(values, 'team.startup_questionnaire_team_founders') || []
  founders.forEach(checkAvatar)
  const members = _.get(values, 'team.startup_questionnaire_team_members') || []
  members.forEach(checkAvatar)
  const advisors = _.get(values, 'team.startup_questionnaire_team_advisors') || []
  advisors.forEach(checkAvatar)

  const attachments = _.get(values, 'attachments.attachments') || []
  attachments.forEach(checkFile)

  // const teamAdvisors = {} // TODO: change to this format?
  // _.get(values, 'team.startup_questionnaire_team_advisors', []).forEach((x, i) => {
  //   teamAdvisors[i] = {
  //     id: _.get(x, 'id', null),
  //     name: _.get(x, 'name', null),
  //     expertise: _.get(x, 'expertise', null),
  //     _destroy: _.get(x, '_destroy', null),
  //     avatar: _.get(x, 'avatar[0]', null)
  //   }
  // })

  const params = {
    startup_questionnaire_highlight_attributes: {
      id: _.get(values, 'highlight.id', null),
      tagline: _.get(values, 'highlight.tagline', null),
      mission: _.get(values, 'highlight.mission', null),
      achievements: _.get(values, 'highlight.achievements', null)
    },
    startup_questionnaire_overview_attributes: {
      id: _.get(values, 'overview.id', null),
      problem: _.get(values, 'overview.problem', null),
      value_proposition: _.get(values, 'overview.value_proposition', null),
      revenue_model: _.get(values, 'overview.revenue_model', null),
      key_kpis: _.get(values, 'overview.key_kpis', null),
      business_model: _.get(values, 'overview.business_model', null),
      startup_questionnaire_past_milestones_attributes: _.get(values, 'overview.startup_questionnaire_past_milestones', null)
    },
    startup_questionnaire_market_attributes: {
      id: _.get(values, 'market.id', null),
      define_market: _.get(values, 'market.define_market', null),
      market_metrics: _.get(values, 'market.market_metrics[0]', null),
      customer_persona: _.get(values, 'market.customer_persona', null),
      timing: _.get(values, 'market.timing', null),
      risk_factors: _.get(values, 'market.risk_factors', null),
      competitors: _.get(values, 'market.competitors', null),
      barriers: _.get(values, 'market.barriers', null)
    },
    startup_questionnaire_strategy_attributes: {
      id: _.get(values, 'strategy.id', null),
      strategic_positioning: _.get(values, 'strategy.strategic_positioning', null),
      unique_selling_point: _.get(values, 'strategy.unique_selling_point', null),
      customer_acquisition_cost: _.get(values, 'strategy.customer_acquisition_cost', null),
      customer_life_value: _.get(values, 'strategy.customer_life_value', null),
      startup_questionnaire_market_strategies_attributes: _.get(values, 'strategy.startup_questionnaire_market_strategies', null)
    },
    startup_questionnaire_team_attributes: {
      id: _.get(values, 'team.id', null),
      story: _.get(values, 'team.story', null),
      next_hires: _.get(values, 'team.next_hires', null),
      startup_questionnaire_team_founders_attributes: _.get(values, 'team.startup_questionnaire_team_founders', null),
      startup_questionnaire_team_members_attributes: _.get(values, 'team.startup_questionnaire_team_members', null),
      // startup_questionnaire_team_advisors_attributes: teamAdvisors // TODO Remove
      startup_questionnaire_team_advisors_attributes: _.get(values, 'team.startup_questionnaire_team_advisors', null)
    },
    startup_questionnaire_financial_attributes: {
      id: _.get(values, 'financial.id', null),
      three_kpis: _.get(values, 'financial.three_kpis', null),
      break_even: _.get(values, 'financial.break_even', null),
      income_statements: _.get(values, 'financial.income_statements[0]', null),
      cash_flow_statements: _.get(values, 'financial.cash_flow_statements[0]', null),
      current_fund: _.get(values, 'financial.current_fund', null),
      startup_questionnaire_financial_fund_histories_attributes: _.get(values, 'financial.startup_questionnaire_financial_fund_histories', null),
      startup_questionnaire_financial_use_of_funds_attributes: _.get(values, 'financial.startup_questionnaire_financial_use_of_funds', null)
    },
    startup_questionnaire_investment_attributes: {
      id: _.get(values, 'investment.id', null),
      fund_amount: _.get(values, 'investment.fund_amount', null),
      exit_strategy: _.get(values, 'investment.exit_strategy', null)
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
