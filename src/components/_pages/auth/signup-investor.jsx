import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { scrollTop } from '../../../services/utils'

import SharedOthersSideTitle from '../../shared/others/side-title'
import SharedOthersIntro from '../../shared/others/intro'
import AuthSigupInvestorCreateForm from '../../forms/auth/signup-investor-create'

import {
  gImmovable, resetImmovable, G_IMMOVABLE_LEGAL_AGREEMENT
} from '../../../actions/immovables'
import { createUser, CREATE_USER } from '../../../actions/users'

import LoadingSpinner from '../../shared/others/loading-spinner'

const mapStateToProps = (state) => {
  return {
    legalAgreement: _.get(state, 'immovables.legal_agreement.legal_agreements', []),
    gLegalAgreementInProcess: _.get(state.requestStatus, G_IMMOVABLE_LEGAL_AGREEMENT),
    createUserInProcess: _.get(state.requestStatus, CREATE_USER)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    gImmovable: bindActionCreators(gImmovable, dispatch),
    resetImmovable: bindActionCreators(resetImmovable, dispatch),
    createUser: bindActionCreators(createUser, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class SignupInvestor extends Component {
  constructor(props) {
    super(props)

    this.state = {
      sideTitleNumber: null,
      pickInvestor: true,
      resultSelected: 0,
      pickerResults: {
        0: ["I am a Professional Investor, because I have individual net worth, or joint net worth with my spouse, that exceeds $8 million HKD."],
        1: ["We are only offering sign-ups for Professional Investors at this time."],
        2: [
          "I am a Professional Investor because I had income exceeding $1,500,000 HKD, or income with my spouse exceeding $2,250,000 HKD, each of the past two years and expect the same this year.",
          "I am a Professional Investor because I have individual investable assets, or joint investable assets with my spouse, that exceeds $8 million HKD.",
          "I am a Professional Investor because I invest on behalf of an entity with at least $35M in assets or an entity in which all the owners are Professional Investors (e.g. a venture capital fund, LLC).",
          "I am a Professional Investor because I invest on behalf of a trust with at least $35M in assets and I have sufficient knowledge to evaluate the merits and risks of startup investing.",
          "I am not a Professional Investor because none of the above apply to me."
        ]
      },
      termsAgreement: false,
      intro: false,
      warningAgreement: false,
      read: false,
      termsAgreed: false,
      createUserStep: false
    }

    this.onPickInvestorContinue = this.onPickInvestorContinue.bind(this)
    this.onIntroContinue = this.onIntroContinue.bind(this)
    this.onWarningAgreed = this.onWarningAgreed.bind(this)
    this.onCreateUser = this.onCreateUser.bind(this)
  }

  componentWillMount() {
    this.props.gImmovable({ immovableID: "legal_agreement" })
  }

  componentWillUnmount() {
    this.props.resetImmovable()
  }

  onPickInvestorContinue() {
    this.setState({ pickInvestor: false, intro: true })
    scrollTop()
  }

  onIntroContinue() {
    this.setState({ intro: false, sideTitleNumber: 1, warningAgreement: true })
    scrollTop()
  }

  onWarningAgreed() {
    this.setState({ warningAgreement: false, createUserStep: true })
    scrollTop()
  }

  onCreateUser(values) {
    this.props.createUser({
      ...values,
      role: "Investor"
    })
  }

  pickerInvestor() {
    const { resultSelected, pickerResults, termsAgreement } = this.state

    return (
      <div className="col-sm-6 pick-investor">
        <h1 className="page-title-l fw-500 fs-28">I am a professional investor</h1>
        <p className="margin-bottom-20">We are required by the SFC to collect this information to determine if you are able to access. Note, most people are not Professional Investors</p>
        <div className="picker margin-bottom-20">
          <div
            className={`text-uppercase btn ${resultSelected === 0 ? "btn-dark" : "btn-default"}`}
            onClick={() => { this.setState({ resultSelected: 0 }) }}
          >Yes, I AM</div>
          <div
            className={`text-uppercase btn ${resultSelected === 1 ? "btn-dark" : "btn-default"}`}
            onClick={() => { this.setState({ resultSelected: 1 }) }}
          >NO, I AM NOT</div>
          <div
            className={`text-uppercase btn ${resultSelected === 2 ? "btn-dark" : "btn-default"}`}
            onClick={() => { this.setState({ resultSelected: 2 }) }}
          >I DON'T KNOW YET</div>
        </div>

        <div className="picker-result margin-top-50">
          {
            pickerResults[resultSelected].map((r, i) => {
              return (
                <div key={i}>{r}</div>
              )
            })
          }
        </div>

        <div className="terms-agreement margin-top-50">
          <input type="checkbox" id="agreement" onChange={(e) => { this.setState({ termsAgreement: e.target.checked }) }} className="margin-right-5" />
          <label htmlFor="agreement">By joining AngelHub, I am agreeing to AngelHub's Terms of Use and Privacy Policy. I furthermore acknowledge that Issuse that successfully raise on AngelHub may pay affiliates of AngelHub fees in the form of cash or securities. Learn more on our FAQs</label>
        </div>

        <button
          className="btn btn-primary pull-right text-uppercase"
          onClick={this.onPickInvestorContinue}
          disabled={resultSelected !== 0 || !termsAgreement}
        >Continue</button>
      </div>
    )
  }

  intro() {
    return (
      <SharedOthersIntro
        optClass="col-xs-12 col-md-6"
        onContinue={this.onIntroContinue}
        title="what we need from you"
        content={[
          {
            title: "Tell us about yourself",
            body: "important warning and your details"
          },
          {
            title: "Ask you a few questions",
            body: "risk assessment"
          },
          {
            title: "Take a photo",
            body: "use your mobile to send us a photo"
          }
        ]}
      />
    )
  }

  warningAgreement() {
    const { read, termsAgreed } = this.state
    const { legalAgreement, gLegalAgreementInProcess } = this.props
    const investorWarningStatement = _.find(legalAgreement, { id: "investor-warning-statement" }) || {}

    return (
      <div className="col-sm-6">
        <h1 className="page-title-l fw-500 fs-28">important warning</h1>
        <p className="margin-bottom-40">To view the opportunities on AngelHub, read, and agree to the text below</p>

        {
          gLegalAgreementInProcess ? (
            <LoadingSpinner optClass="margin-bottom-20" />
          ) : (
            <div
              onScroll={(e) => {
                const target = e.target
                const clientHeight = target.clientHeight
                const scrollT = target.scrollTop
                const scrollHeight = target.scrollHeight

                if (scrollT + clientHeight === scrollHeight) {
                  this.setState({ read: true })
                }
              }}
              className="statement-scroll margin-bottom-40"
              dangerouslySetInnerHTML={{ __html: investorWarningStatement.content }}
            />
          )
        }

        <div className="warning-agreement">
          <label className="warning-label" htmlFor="agreement">Acknowledgement</label>
          <div className="warning-input">
            <input type="checkbox" id="agreement" onChange={(e) => { this.setState({ termsAgreed: e.target.checked }) }} className="margin-right-5" />
            <label htmlFor="agreement">I have read and understood the above "Important Warning"</label>
          </div>
        </div>

        <button
          className="btn btn-primary text-uppercase pull-right"
          onClick={this.onWarningAgreed}
          disabled={!read || !termsAgreed}
        >Continue</button>
      </div>
    )
  }

  createUserRender() {
    return (
      <AuthSigupInvestorCreateForm
        optClass="col-sm-6"
        onSubmit={this.onCreateUser}
        submitInProcess={this.props.createUserInProcess}
      />
    )
  }

  render() {
    const { sideTitleNumber, pickInvestor, intro, warningAgreement, createUserStep } = this.state

    return (
      <div id="page-auth-signup-investor">
        <div className="row">
          <SharedOthersSideTitle title="investor" number={sideTitleNumber} optClass="hidden-xs col-sm-3 col-md-offset-1 col-md-2" />

          { pickInvestor && this.pickerInvestor() }
          { intro && this.intro() }
          { warningAgreement && this.warningAgreement() }
          { createUserStep && this.createUserRender() }
        </div>
      </div>
    )
  }
}
