import React, { Component } from 'react'
import Modal from 'react-bootstrap/lib/Modal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  cuMyStartupProfile, CU_MY_STARTUP_PROFILE
} from '../../../../actions/my/startups/profile'

import MyStartupsTextForm from '../../../forms/my/startups/text'

const mapStateToProps = (state) => {
  return {
    cuMyStartupProfile: _.get(state.requestStatus, CU_MY_STARTUP_PROFILE)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    cuMyStartupProfile: bindActionCreators(cuMyStartupProfile, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class MyStartupsETextModal extends Component {
  constructor(props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(values) {
    this.props.cuMyStartupProfile({
      [this.props.data.key]: values.text
    }, this.props.params, () => {
      this.props.close()
    })
  }

  render() {
    const { close, cuMyStartupProfileInProcess, data } = this.props

    const keyword = "Edit"
    const initialValues = {
      text: data.data || ''
    }

    return (
      <Modal show onHide={close} className="form-modal" bsSize="large">
        <Modal.Header closeButton>
          <Modal.Title>{keyword} {data.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MyStartupsTextForm
            onSubmit={this.onSubmit}
            submitInProcess={cuMyStartupProfileInProcess}
            initialValues={initialValues}
          />
        </Modal.Body>
      </Modal>
    )
  }
}
