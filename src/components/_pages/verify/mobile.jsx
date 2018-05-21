import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  uMyVerifications, U_MY_VERIFICATIONS
} from '../../../actions/my/verifications'

import VerifyMobileForm from '../../forms/verify/mobile'

const mapStateToProps = (state) => {
  return {
    uMyVerificationsInProcess: _.get(state.requestStatus, U_MY_VERIFICATIONS)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    uMyVerifications: bindActionCreators(uMyVerifications, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class VerifyEmail extends Component {
  constructor(props) {
    super(props)

    this.uMyVerifications = this.uMyVerifications.bind(this)
  }

  uMyVerifications(values) {
    this.props.uMyVerifications({
      ...values,
      type: "mobile"
    })
  }

  render() {
    return (
      <div id="page-verify-mobile" className="container padding-top-20 padding-bottom-20">
        <div className="row">
          <VerifyMobileForm
            optClass="col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3"
            onSubmit={this.uMyVerifications}
            submitInProcess={this.props.uMyVerificationsInProcess}
            initialValues={{
              code: _.get(this.props, 'location.query.code', '')
            }}
          />
        </div>
      </div>
    )
  }
}
