import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  gImmovable, resetImmovable,
  G_IMMOVABLE_INVESTOR_RISK_ASSESSMENT
} from '../../../../actions/immovables'

import { scrollTop } from '../../../../services/utils'

import { updateMyProfile, UPDATE_MY_PROFILE } from '../../../../actions/my/profile'

import ProfileInvestorUpdateForm from '../../../forms/profile/investor-update'
import InvestorValidationsDummyTestForm from '../../../forms/investor-validations/dummy-test'

import SharedOthersSideTitle from '../../../shared/others/side-title'
import LoadingSpinner from '../../../shared/others/loading-spinner'

const mapStateToProps = (state) => {
  const sir = _.get(state, 'immovables.investor_risk_assessment.startup_investing_risks.questions', [])
  const ip = _.get(state, 'immovables.investor_risk_assessment.investing_process.questions', [])
  const ayi = _.get(state, 'immovables.investor_risk_assessment.after_you_invest.questions', [])

  const dummyTestQuestions = [...sir, ...ip, ...ayi]

  return {
    currentUser: _.get(state, 'session'),
    updateMyProfileInProcess: _.get(state.requestStatus, UPDATE_MY_PROFILE),
    gInvestorRiskAssessment: _.get(state.requestStatus, G_IMMOVABLE_INVESTOR_RISK_ASSESSMENT),
    dummyTestQuestions
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateMyProfile: bindActionCreators(updateMyProfile, dispatch),
    gImmovable: bindActionCreators(gImmovable, dispatch),
    resetImmovable: bindActionCreators(resetImmovable, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class MyInvestorValidationsVerification extends Component {
  constructor(props) {
    super(props)

    this.state = {
      sideTitleNumber: 1,
      updateUserStep: true,
      dummyTest: false,
      failureRetry: false,
      successContinue: false,
      photoUpload: false
    }

    this.onUpdateMyProfile = this.onUpdateMyProfile.bind(this)
    this.onDummyTestSubmit = this.onDummyTestSubmit.bind(this)
    this.onFailureRetryClick = this.onFailureRetryClick.bind(this)
    this.onSuccessContinueClick = this.onSuccessContinueClick.bind(this)
    this.onPhotoUploadClick = this.onPhotoUploadClick.bind(this)
  }

  componentWillMount() {
    this.props.gImmovable({ immovableID: "investor_risk_assessment" })
  }

  componentWillUnmount() {
    this.props.resetImmovable()
  }

  onUpdateMyProfile(values) {
    this.props.updateMyProfile(values, () => {
      this.setState({ sideTitleNumber: 2, updateUserStep: false, dummyTest: true })
      scrollTop()
    })
  }

  onDummyTestSubmit(values) {
    const { dummyTestQuestions } = this.props

    let score = 0

    dummyTestQuestions.forEach((q, i) => {
      if (q.answer === _.get(values, `q${i}`)) {
        score++
      }
    })

    if (score < 6) {
      this.setState({ dummyTest: false, failureRetry: true })
    } else {
      this.setState({ dummyTest: false, successContinue: true })
    }

    scrollTop()
  }

  onFailureRetryClick() {
    this.setState({ dummyTest: true, failureRetry: false })
    scrollTop()
  }

  onSuccessContinueClick() {
    this.setState({ successContinue: false, photoUpload: true, sideTitleNumber: 3 })
    scrollTop()
  }

  onPhotoUploadClick() {
    this.props.router.push("/my/investor-validations")
    scrollTop()
  }

  updateUserRender() {
    const profile = _.get(this.props.currentUser, 'profile', {})
    const initialValues = {
      ...profile,
      dob: profile.dob ? moment(profile.dob).toDate() : null
    }

    return (
      <ProfileInvestorUpdateForm
        optClass="col-xs-12 col-sm-6"
        onSubmit={this.onUpdateMyProfile}
        initialValues={initialValues}
        submitInProcess={this.props.updateMyProfileInProcess}
      />
    )
  }

  dummyTestRender() {
    return (
      <InvestorValidationsDummyTestForm
        optClass="col-xs-12 col-sm-6"
        onSubmit={this.onDummyTestSubmit}
        dummyTest={this.props.dummyTestQuestions || []}
      />
    )
  }

  failureRetryRender() {
    return (
      <div className="col-xs-12 col-sm-6">
        <div className="status-icon">
          <i className="ahub-lock ahub-6x text-" />
        </div>

        <div className="margin-top-20 text-center">
          <h1 className="text-uppercase">THANK YOU FOR TAKING THE ASSESMENT</h1>
          <h3>
            You haven't reach the minimun requires <br />
            Have a look at the education material to learn about the risk associated to startup investment and please retake the quiz
          </h3>
          <button
            className="btn btn-primary text-uppercase margin-top-20"
            onClick={this.onFailureRetryClick}
          >Learn More</button>
        </div>
      </div>
    )
  }

  successContinueRender() {
    return (
      <div className="col-xs-12 col-sm-6">
        <div className="status-icon margin-bottom-40">
          <i className="ahub-unlock ahub-6x text-gold" />
        </div>

        <div className="text-center">
          <h1>CONGRATULATIONS</h1>
          <h3>You have passed the Rick Assessment</h3>
        </div>
        <div className="margin-top-40">
          <button
            className="btn btn-primary text-uppercase margin-top-20"
            onClick={this.onSuccessContinueClick}
          >Continue</button>
        </div>
      </div>
    )
  }

  photoUploadRender() {
    return (
      <div className="col-xs-12 col-sm-6 photo-upload">
        <h1 className="form-title fw-500">upload your photo</h1>
        <div className="help-text margin-bottom-20">For the purposes of Know Your Client requirements under the SFC rules, we require that you submit a photo through the mobile number you have submitted to us. This enables us to confirm your identity and complete your registration as an investor on our platform.</div>

        <div className="row clearfix">
          <div className="col-xs-12">
            <div className="col-xs-4 text-center">
              <p>Need Image Here</p>
              <p className="big-number">1</p>
              <p>Check Your SMS</p>
            </div>
            <div className="col-xs-4 text-center">
              <p>Need Image Here</p>
              <p className="big-number">2</p>
              <p>Take Photo</p>
            </div>
            <div className="col-xs-4 text-center">
              <p>Need Image Here</p>
              <p className="big-number">3</p>
              <p>Come Back Here To Continue</p>
            </div>
          </div>
        </div>

        <button
          className="btn btn-primary btn-outline text-uppercase pull-right margin-top-20"
          onClick={this.onPhotoUploadClick}
        >Continue</button>
      </div>
    )
  }

  render() {
    const { gInvestorRiskAssessment } = this.props
    const { sideTitleNumber, updateUserStep, dummyTest, failureRetry, successContinue, photoUpload } = this.state

    if (gInvestorRiskAssessment) return <LoadingSpinner />

    return (
      <div id="page-my-investor-validations-verification">
        <SharedOthersSideTitle title="investor" number={sideTitleNumber} optClass="hidden-xs col-sm-3 col-md-offset-1 col-md-2" />

        { updateUserStep && this.updateUserRender() }

        { dummyTest && this.dummyTestRender() }

        { failureRetry && this.failureRetryRender() }

        { successContinue && this.successContinueRender() }

        { photoUpload && this.photoUploadRender() }
      </div>
    )
  }
}
