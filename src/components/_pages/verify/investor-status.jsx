import React, { Component } from 'react'
// import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'

// import {
//   verifyInvestorStatus, VERIFY_INVESTOR_STATUS
// } from '../../../actions/my/profile'

import VerifyInvestorStatusForm from '../../forms/verify/investor-status'

// const mapStateToProps = (state) => {
//   return {
//     verifyInvestorStatusInProcess: _.get(state.requestStatus, VERIFY_INVESTOR_STATUS)
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     verifyInvestorStatus: bindActionCreators(verifyInvestorStatus, dispatch)
//   }
// }

// @connect(mapStateToProps, mapDispatchToProps)
export default class VerifyInvestorStatus extends Component {
  render() {
    return (
      <div id="page-verify-investor-status" className="container padding-top-20 padding-bottom-20">
        <div className="row">
          <VerifyInvestorStatusForm
            optClass="col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3"
            onSubmit={this.props.verifyInvestorStatus}
            submitInProcess={this.props.verifyInvestorStatusInProcess}
          />
        </div>
      </div>
    )
  }
}
