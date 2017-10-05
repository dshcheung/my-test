import React, { Component } from 'react'
import Modal from 'react-bootstrap/lib/Modal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  cuMyStartupProfile, CU_MY_STARTUP_PROFILE
} from '../../../../actions/my/startups/profile'

import MyStartupOverviewForm from '../../../forms/my/startups/overview'

const mapStateToProps = (state) => {
  return {
    cuMyStartupProfileInProcess: _.get(state.requestStatus, CU_MY_STARTUP_PROFILE)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    cuMyStartupProfile: bindActionCreators(cuMyStartupProfile, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class MyStartupsNEOverviewModal extends Component {
  constructor(props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(values) {
    this.props.cuMyStartupProfile(values, this.props.params, () => {
      this.props.close()
    })
  }

  render() {
    const { close, cuMyStartupProfileInProcess, editMode, profile: { overview } } = this.props

    const keyword = editMode ? "Edit" : "Add"
    const initialValues = editMode ? {
      overview: overview || ''
    } : undefined

    return (
      <Modal show onHide={close} className="form-modal">
        <Modal.Header closeButton>
          <Modal.Title>{keyword} Overview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MyStartupOverviewForm
            onSubmit={this.onSubmit}
            submitInProcess={cuMyStartupProfileInProcess}
            initialValues={initialValues}
          />
        </Modal.Body>
      </Modal>
    )
  }
}
