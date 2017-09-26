import React, { Component } from 'react'
import Modal from 'react-bootstrap/lib/Modal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  createMyEndorsement, CREATE_MY_ENDORSEMENT
} from '../../../actions/my/endorsements'

import MyEndorsementForm from '../../forms/my/endorsement'

const mapStateToProps = (state) => {
  return {
    createMyEndorsementInProcess: _.get(state.requestStatus, CREATE_MY_ENDORSEMENT)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createMyEndorsement: bindActionCreators(createMyEndorsement, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class AddMyExperienceModal extends Component {
  constructor(props) {
    super(props)

    this.createMyEndorsement = this.createMyEndorsement.bind(this)
  }

  createMyEndorsement(values) {
    this.props.createMyEndorsement(values, () => {
      this.props.close()
    })
  }

  render() {
    const { close, createMyEndorsementInProcess } = this.props

    return (
      <Modal show onHide={close} className="form-modal">
        <Modal.Header closeButton>
          <Modal.Title>Add Endorsement</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MyEndorsementForm
            onSubmit={this.createMyEndorsement}
            submitInProcess={createMyEndorsementInProcess}
          />
        </Modal.Body>
      </Modal>
    )
  }
}
