import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  gImmovable, resetImmovable, G_IMMOVABLE_LEGAL_AGREEMENT
} from '../../../actions/immovables'

import { createUser, CREATE_USER } from '../../../actions/users'
import { updateMyProfile, UPDATE_MY_PROFILE } from '../../../actions/my/profile'

import { scrollTop } from '../../../services/utils'

import AuthSigupInvestorCreate from '../../forms/auth/signup-investor-create'
import AuthSigupInvestorUpdate from '../../forms/auth/signup-investor-update'

import SharedOthersSideTitle from '../../shared/others/side-title'
import LoadingSpinner from '../../shared/others/loading-spinner'

const mapStateToProps = (state) => {
  return {
    currentUser: _.get(state, 'session'),
    legalAgreement: _.get(state, 'immovables.legal_agreement.legal_agreements', []),
    gLegalAgreementInProcess: _.get(state.requestStatus, G_IMMOVABLE_LEGAL_AGREEMENT),
    createUserInProcess: _.get(state.requestStatus, CREATE_USER),
    updateMyProfileInProcess: _.get(state.requestStatus, UPDATE_MY_PROFILE)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    gImmovable: bindActionCreators(gImmovable, dispatch),
    resetImmovable: bindActionCreators(resetImmovable, dispatch),
    createUser: bindActionCreators(createUser, dispatch),
    updateMyProfile: bindActionCreators(updateMyProfile, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class SignupInvestorStep1 extends Component {
  constructor(props) {
    super(props)

    // TODO: Gram - add status for me to judge which to set true/false
    // if (currentUser.hkid) { updateUserStep true }

    this.state = {
      warningAgreement: true,
      read: false,
      termsAgreed: false,
      createUserStep: false,
      updateUserStep: false
    }

    this.createUser = this.createUser.bind(this)
    this.updateMyProfile = this.updateMyProfile.bind(this)
  }

  componentWillMount() {
    this.props.gImmovable({ immovableID: "legal_agreement" })
  }

  createUser(values) {
    this.props.createUser({
      ...values,
      role: "Investor"
    }, () => {
      this.setState({ createUserStep: false, updateUserStep: true })
    })
  }

  updateMyProfile(values) {
    this.props.updateMyProfile(values, () => {
      this.props.router.push("/auth/signup-investor-step-2")
    })
  }

  render() {
    const { legalAgreement, gLegalAgreementInProcess } = this.props
    const investorWarningStatement = _.find(legalAgreement, { id: "investor-warning-statement" })

    if (gLegalAgreementInProcess || !investorWarningStatement) return <LoadingSpinner />
    const { warningAgreement, read, termsAgreed, createUserStep, updateUserStep } = this.state

    return (
      <div id="page-auth-signup-investor-step-1">
        <SharedOthersSideTitle title="investor" number="1" optClass="hidden-xs col-sm-3 col-md-offset-1 col-md-2" />

        {
          warningAgreement && (
            <div className="col-sm-6">
              <h1 className="page-title-l fw-500 fs-28">important warning</h1>
              <p className="margin-bottom-40">To view the opportunities on AngelHub, read, and agree to the text below</p>

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
                className="statement-scroll"
                dangerouslySetInnerHTML={{ __html: investorWarningStatement.content }}
              />

              <div className="warning-agreement">
                <label className="warning-label" htmlFor="agreement">Acknowledgement</label>
                <div className="warning-input">
                  <input type="checkbox" id="agreement" onChange={(e) => { this.setState({ termsAgreed: e.target.checked }) }} />
                  <label htmlFor="agreement">I have read and understood the above "Important Warning"</label>
                </div>
              </div>

              <button
                className="btn btn-danger pull-right"
                onClick={() => {
                  this.setState({ warningAgreement: false, createUserStep: true })
                  scrollTop()
                }}
                disabled={!read || !termsAgreed}
              >Continue</button>
            </div>
          )
        }

        {
          createUserStep && (
            <AuthSigupInvestorCreate
              optClass="col-sm-6"
              onSubmit={this.createUser}
              submitInProcess={this.props.createUserInProcess}
            />
          )
        }

        {
          updateUserStep && (
            <AuthSigupInvestorUpdate
              optClass="col-sm-6"
              onSubmit={this.updateMyProfile}
              submitInProcess={this.props.updateMyProfileInProcess}
            />
          )
        }
      </div>
    )
  }
}
