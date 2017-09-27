import React, { Component } from 'react'
import Modal from 'react-bootstrap/lib/Modal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  updateMyEndorsement, UPDATE_MY_ENDORSEMENT
} from '../../../actions/my/endorsements'

import MyEndorsementForm from '../../forms/my/endorsement'

const mapStateToProps = (state) => {
  return {
    updateMyEndorsementInProcess: _.get(state.requestStatus, UPDATE_MY_ENDORSEMENT)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateMyEndorsement: bindActionCreators(updateMyEndorsement, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class EditMyExperienceModal extends Component {
  constructor(props) {
    super(props)

    this.updateMyEndorsement = this.updateMyEndorsement.bind(this)
  }

  updateMyEndorsement(values) {
    this.props.updateMyEndorsement(values, {
      myEndorsementID: _.get(this.props.endorsement, "id")
    }, () => {
      this.props.close()
    })
  }

  render() {
    const { close, updateMyEndorsementInProcess, endorsement } = this.props

    return (
      <Modal show onHide={close} className="form-modal">
        <Modal.Header closeButton>
          <Modal.Title>Edit Endorsement</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MyEndorsementForm
            onSubmit={this.updateMyEndorsement}
            submitInProcess={updateMyEndorsementInProcess}
            initialValues={{
              name: _.get(endorsement, "name", ""),
              description: _.get(endorsement, "description", "")
            }}
          />
        </Modal.Body>
      </Modal>
    )
  }
}
