import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  gMyProfileSuitability, G_MY_PROFILE_SUITABILITY,
  uMyProfileSuitability, U_MY_PROFILE_SUITABILITY,
  resetMyProfileSuitability
} from '../../../actions/my/investor-profile-suitability'

import LoadingSpinner from '../../shared/loading-spinner'

import MyProfileSuitabilityForm from '../../forms/my/profile-suitability'

const mapStateToProps = (state) => {
  return {
    gMyProfileSuitabilityInProcess: _.get(state.requestStatus, G_MY_PROFILE_SUITABILITY),
    uMyProfileSuitabilityInProcess: _.get(state.requestStatus, U_MY_PROFILE_SUITABILITY),
    myProfileSuitability: _.get(state, 'myProfileSuitability')
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    gMyProfileSuitability: bindActionCreators(gMyProfileSuitability, dispatch),
    uMyProfileSuitability: bindActionCreators(uMyProfileSuitability, dispatch),
    resetMyProfileSuitability: bindActionCreators(resetMyProfileSuitability, dispatch)
  }
}
@connect(mapStateToProps, mapDispatchToProps)
export default class MyProfileSuitability extends Component {
  componentWillMount() {
    this.props.gMyProfileSuitability()
  }

  componentWillUnmount() {
    this.props.resetMyProfileSuitability()
  }

  render() {
    const {
      myProfileSuitability,
      gMyProfileSuitabilityInProcess, uMyProfileSuitabilityInProcess
    } = this.props

    if (gMyProfileSuitabilityInProcess) return <LoadingSpinner />

    const initialValues = {
      numberOfDependents: _.get(myProfileSuitability, 'number_of_dependents'),
      employmentStatus: _.get(myProfileSuitability, 'employment_status'),
      occupation: _.get(myProfileSuitability, 'occupation'),
      currentNetIncome: _.get(myProfileSuitability, 'current_net_income'),
      bankStatement: _.get(myProfileSuitability, 'bank_statement'),
      aum: _.get(myProfileSuitability, 'aum'),
      educationLevel: _.get(myProfileSuitability, 'education_level'),
      investmentDetails: _.get(myProfileSuitability, 'investment_details'),
      sourceOfFunds: _.get(myProfileSuitability, 'source_of_funds')
    }

    return (
      <div id="pages-my-profile-suitability" className="container">
        <MyProfileSuitabilityForm
          onSubmit={this.props.uMyProfileSuitability}
          submitInProcess={uMyProfileSuitabilityInProcess}
          initialValues={initialValues}
        />
      </div>
    )
  }
}
