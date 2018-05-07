import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { injectStripe, CardElement } from 'react-stripe-elements'

import Validators from '../../../services/form-validators'

import TextField from '../../shared/form-elements/text-field'
import LoadingSpinner from '../../shared/loading-spinner'

import {
  gImmovable, G_IMMOVABLE_LEGAL_AGREEMENT
} from '../../../actions/immovables'

const mapStateToProps = (state) => {
  return {
    gLegalAgreementInProcess: _.get(state.requestStatus, G_IMMOVABLE_LEGAL_AGREEMENT),
    disclaimer: _.find(_.get(state.immovables, 'legal_agreement.legal_agreements', []), (la) => {
      return la.id === "investor-disclaimer"
    })
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    gImmovable: bindActionCreators(gImmovable, dispatch)
  }
}

@injectStripe
@connect(mapStateToProps, mapDispatchToProps)
@reduxForm({
  form: "CampaignPledgeForm",
  validate: (values) => {
    return Validators({
      amount: ["presences"]
    }, values)
  },
  enableReinitialize: true
})
export default class CampaignPledgeForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      paymentMode: null
    }
  }

  componentWillMount() {
    this.props.gImmovable({ immovableID: "legal_agreement" })
  }

  renderForm() {
    const { handleSubmit, submitInProcess, step, min, gLegalAgreementInProcess, disclaimer } = this.props
    const { paymentMode } = this.state

    if (paymentMode) {
      if (gLegalAgreementInProcess) return <LoadingSpinner />

      return (
        <div className="row">
          <form onSubmit={handleSubmit} className="col-xs-12 col-sm-6 col-sm-offset-3">
            {
              paymentMode === "stripe" && <CardElement style={{ base: { fontSize: '18px' } }} />
            }

            <div className="margin-top-15">
              <Field
                name="amount"
                component={TextField}
                opts={{
                  type: "number",
                  label: "Amount *",
                  step,
                  min, // TODO: change to validator
                  placeholder: `Minimum Amount Is $${min}`
                }}
              />
            </div>

            <button
              className={`btn btn-info btn-lg btn-block ${submitInProcess && "m-progress"}`}
              type="submit"
              disabled={submitInProcess}
            >
              Submit
            </button>
          </form>

          <div className="col-xs-12">
            {
              !_.get(disclaimer, 'content') ? <LoadingSpinner /> : (
                <div className="margin-top-15" dangerouslySetInnerHTML={{ __html: disclaimer.content.decode() }} />
              )
            }
          </div>
        </div>
      )
    }

    return null
  }

  render() {
    const { optClass } = this.props
    const { paymentMode } = this.state

    return (
      <div id="forms-campaigns-pledge" className={optClass}>
        <div className="row text-center padding-left-15 padding-right-15 margin-bottom-15">
          <div
            className={`col-xs-4 pointer padding-15 ${paymentMode === "bank" && "bg-info"}`}
            onClick={() => { this.setState({ paymentMode: "bank" }) }}
          >Bank Transfer</div>
          <div
            className={`col-xs-4 pointer padding-15 ${paymentMode === "stripe" && "bg-info"}`}
            onClick={() => { this.setState({ paymentMode: "stripe" }) }}
          >Stripe</div>
          <div
            className={`col-xs-4 pointer padding-15 ${paymentMode === "token" && "bg-info"}`}
            onClick={() => { this.setState({ paymentMode: "token" }) }}
          >Token Transfer</div>
        </div>
        {
          this.renderForm()
        }
      </div>
    )
  }
}
