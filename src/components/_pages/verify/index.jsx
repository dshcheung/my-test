import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  uMyVerifications, U_MY_VERIFICATIONS
} from '../../../actions/my/verifications'

import VerifyForm from '../../forms/verify/index'

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
export default class Verify extends Component {
  constructor(props) {
    super(props)

    this.uMyVerifications = this.uMyVerifications.bind(this)
  }

  uMyVerifications(values) {
    this.props.uMyVerifications(values)
  }

  render() {
    return (
      <div id="page-verify" className="margin-top-50">
        <VerifyForm
          optClass="col-sm-6 col-sm-offset-3"
          onSubmit={this.uMyVerifications}
          submitInProcess={this.props.uMyVerificationsInProcess}
          initialValues={{
            code: _.get(this.props, 'location.query.code', '')
          }}
        />
      </div>
    )
  }
}
