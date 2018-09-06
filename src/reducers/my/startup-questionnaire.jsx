import {
  SET_MY_STARTUP_QUESTIONNAIRE,
  RESET_MY_STARTUP_QUESTIONNAIRE
} from '../../actions/my/startup-questionnaires'

import Validators from '../../services/form-validators'

const initialState = null
const formatFormula = {
  startup_questionnaire_basic: (q) => {
    const year = _.get(q, 'founded_year')
    const nq = {
      ...q,
      company_name: _.get(q, 'company_name') || '',
      country_of_incorporation: _.get(q, 'country_of_incorporation') || '',
      founded_year: year ? moment(year, "YYYY").toDate() : '',
      hashtags: _.get(q, 'hashtags') || '',
      tagline: _.get(q, 'tagline') || '',
      vertical: _.get(q, 'vertical') || '',
      attachments: _.get(q, 'attachments') || []
    }

    return nq
  },
  startup_questionnaire_teaser: (q) => {
    const startup_questionnaire_highlights = _.get(q, 'startup_questionnaire_highlights') || []
    const startup_questionnaire_media = _.get(q, 'startup_questionnaire_media') || []

    const nq = {
      ...q,
      make_money: _.get(q, 'make_money') || '',
      problem: _.get(q, 'problem') || '',
      solution: _.get(q, 'solution') || '',
      solution_benchmark: _.get(q, 'solution_benchmark') || '',
      startup_questionnaire_highlights: startup_questionnaire_highlights.map((h) => {
        const occurred_on = _.get(h, "occurred_on")

        return {
          ...h,
          occurred_on: occurred_on ? moment(occurred_on).toDate() : ''
        }
      }),
      startup_questionnaire_media,
      attachments: _.get(q, 'attachments') || []
    }

    return nq
  },
  startup_questionnaire_product: (q) => {
    const startup_questionnaire_patents = _.get(q, 'startup_questionnaire_patents') || []

    const nq = {
      ...q,
      product: _.get(q, 'product') || '',
      startup_questionnaire_patents: startup_questionnaire_patents.map((p) => {
        const registration_date = _.get(p, 'registration_date')
        return {
          ...p,
          registration_date: registration_date ? moment(registration_date).toDate() : ''
        }
      })
    }

    return nq
  },
  startup_questionnaire_market: (q) => {
    const startup_questionnaire_go_to_market_strategies = _.get(q, 'startup_questionnaire_go_to_market_strategies') || []

    const nq = {
      ...q,
      barriers_to_entry: _.get(q, 'barriers_to_entry') || '',
      competition_landscape: _.get(q, 'competition_landscape') || '',
      global_market: _.get(q, 'global_market') || '',
      solution_benchmark: _.get(q, 'solution_benchmark') || '',
      target_market: _.get(q, 'target_market') || '',
      traction: _.get(q, 'traction') || '',
      startup_questionnaire_go_to_market_strategies: startup_questionnaire_go_to_market_strategies.map((s) => {
        const occurs_on = _.get(s, 'occurs_on')
        return {
          ...s,
          occurs_on: occurs_on ? moment(occurs_on).toDate() : ''
        }
      })
    }

    return nq
  },
  startup_questionnaire_financial: (q) => {
    const startup_questionnaire_previous_funds = _.get(q, 'startup_questionnaire_previous_funds') || []
    const startup_questionnaire_cap_tables = _.get(q, 'startup_questionnaire_cap_tables') || []
    const startup_questionnaire_break_even = _.get(q, 'startup_questionnaire_break_even')
    const year = _.get(startup_questionnaire_break_even, 'year')
    _.set(startup_questionnaire_break_even, 'year', year ? moment(year).toDate() : '')

    const nq = {
      ...q,
      startup_questionnaire_previous_funds: startup_questionnaire_previous_funds.map((pf) => {
        const occurred_on = _.get(pf, 'occurred_on')
        return {
          ...pf,
          occurred_on: occurred_on ? moment(occurred_on).toDate() : ''
        }
      }),
      startup_questionnaire_cap_tables: startup_questionnaire_cap_tables.map((ct) => {
        const date_of_investment = _.get(ct, 'date_of_investment')
        return {
          ...ct,
          date_of_investment: date_of_investment ? moment(date_of_investment).toDate() : ''
        }
      }),
      startup_questionnaire_break_even,
      cash_burn: {
        ..._.get(q, 'cash_burn'),
        amount: _.get(q, 'cash_burn.amount') || ''
      }
    }

    return nq
  },
  startup_questionnaire_campaign: (q) => {
    const nq = {
      ...q,
      maturity_date: _.get(q, 'maturity_date') ? moment(_.get(q, 'maturity_date')).toDate() : '',
      pre_money_valuation: {
        ..._.get(q, 'pre_money_valuation'),
        amount: _.get(q, 'pre_money_valuation.amount') || ''
      },
      raised: {
        ..._.get(q, 'raised'),
        amount: _.get(q, 'raised.amount') || ''
      },
      valuation_cap: {
        ..._.get(q, 'valuation_cap'),
        amount: _.get(q, 'valuation_cap.amount') || ''
      }
    }

    return nq
  },
  attachments: (q) => {
    const nq = {
      attachments: q || []
    }
    return nq
  }
}
const errorFormula = {
  startup_questionnaire_basic: (values) => {
    return Validators({
      company_name: ["presences"],
      founded_year: ["presences"],
      country_of_incorporation: ["presences"],
      tagline: ["presences"],
      hashtags: [{ type: "amount", opts: { min: 1 } }],
      attachments: [{
        type: "complexArrOfObj",
        opts: {
          selfPresences: true
        }
      }]
    }, values, ["attachments"])
  },
  startup_questionnaire_teaser: (values) => {
    return Validators({
      problem: ["presences"],
      solution: ["presences"],
      make_money: ["presences"],
      solution_benchmark: ["presences"],
      startup_questionnaire_highlights: [{
        type: "complexArrOfObj",
        opts: {
          selfPresences: true
        }
      }]
    }, values, ["startup_questionnaire_highlights"])
  },
  startup_questionnaire_product: (values) => {
    return Validators({
      product: ["presences"]
    }, values)
  },
  startup_questionnaire_market: (values) => {
    return Validators({
      global_market: ["presences"],
      target_market: ["presences"],
      traction: ["presences"],
      barriers_to_entry: ["presences"],
      competition_landscape: ["presences"],
      competitors: [{
        type: "complexArrOfObj",
        opts: {
          selfPresences: true
        }
      }],
      go_to_market_strategies: [{
        type: "complexArrOfObj",
        opts: {
          selfPresences: true
        }
      }]
    }, values, ["competitors", "go_to_market_strategies"])
  },
  startup_questionnaire_team: (values) => {
    return Validators({
      story: ["presences"],
      startup_questionnaire_team_members: [{
        type: "complexArrOfObj",
        opts: {
          selfPresences: true
        }
      }]
    }, values, ["startup_questionnaire_team_members"])
  },
  startup_questionnaire_financial: (values) => {
    return Validators({
      income_statement: ["filePresences"],
      cash_flow_statement: ["filePresences"],
      cash_burn: ["currencyPresences"],
      quarter: ["presences"],
      year: ["presences"],
      startup_questionnaire_use_of_funds: [{
        type: "complexArrOfObj",
        opts: {
          selfPresences: true
        }
      }],
      startup_questionnaire_cap_tables: [{
        type: "complexArrOfObj",
        opts: {
          selfPresences: true
        }
      }]
    }, values, ["startup_questionnaire_use_of_funds", "startup_questionnaire_cap_tables"])
  },
  startup_questionnaire_campaign: (values) => {
    return Validators({
      campaign_type: ["presences"],
      raised: ["currencyPresences"],
      pre_money_valuation: values.campaign_type === "equity" ? ["currencyPresences"] : [],
      interest_rate: values.campaign_type === "convertible" ? ["presences"] : [],
      maturity_date: values.campaign_type === "convertible" ? ["presences"] : []
    }, values)
  }
}

const order = [
  "startup_questionnaire_basic",
  "startup_questionnaire_teaser",
  "startup_questionnaire_product",
  "startup_questionnaire_market",
  "startup_questionnaire_team",
  "startup_questionnaire_financial",
  "startup_questionnaire_campaign",
  "attachments"
]

const formatData = (data) => {
  const obj = {}
  order.forEach((dataKey) => {
    const dataPiece = _.get(data, dataKey)
    const formatFormulaPiece = _.get(formatFormula, dataKey)

    obj[dataKey] = formatFormulaPiece ? formatFormulaPiece(dataPiece) : dataPiece
  })

  return obj
}

const checkErrors = (data) => {
  const obj = {}
  order.forEach((dataKey) => {
    const dataPiece = _.get(data, dataKey)
    const errorFormulaPiece = _.get(errorFormula, dataKey)
    const errors = errorFormulaPiece ? errorFormulaPiece(dataPiece) : null

    if (errors && Object.keys(errors).length > 0) {
      obj[dataKey] = errors
    }
  })

  return obj
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_MY_STARTUP_QUESTIONNAIRE: {
      const formattedData = formatData(action.data)
      const errors = checkErrors(formattedData)
      return {
        ...action.data,
        ...formattedData,
        errors
      }
    }
    case RESET_MY_STARTUP_QUESTIONNAIRE:
      return initialState
  }
  return state
}
