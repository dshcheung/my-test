import React, { Component } from 'react'
import Modal from 'react-bootstrap/lib/Modal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  cMyStartupProfile, C_MY_STARTUP_PROFILE,
  uMyStartupProfile, U_MY_STARTUP_PROFILE
} from '../../../../actions/my/startups/profile'

import MyStartupOverviewForm from '../../../forms/my/startups/overview'

const mapStateToProps = (state) => {
  return {
    cMyStartupProfileInProcess: _.get(state.requestStatus, C_MY_STARTUP_PROFILE),
    uMyStartupProfile: _.get(state.requestStatus, U_MY_STARTUP_PROFILE)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    cMyStartupProfile: bindActionCreators(cMyStartupProfile, dispatch),
    uMyStartupProfile: bindActionCreators(uMyStartupProfile, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class MyStartupsNEOverviewModal extends Component {
  constructor(props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(values) {
    if (this.props.editMode) {
      this.props.uMyStartupProfile(values, this.props.params, () => {
        this.props.close()
      })
    } else {
      this.props.cMyStartupProfile(values, this.props.params, () => {
        this.props.close()
      })
    }
  }

  render() {
    const { close, cMyStartupProfileInProcess, editMode, overview } = this.props

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
            submitInProcess={cMyStartupProfileInProcess}
            initialValues={initialValues}
          />
        </Modal.Body>
      </Modal>
    )
  }
}
