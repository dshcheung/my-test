import React, { Component } from 'react'
import Modal from 'react-bootstrap/lib/Modal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  createMyStartupMedia, CREATE_MY_STARTUP_MEDIA
} from '../../../../actions/my/startups/media'

import MyStartupMediaForm from '../../../forms/my/startups/media'

const mapStateToProps = (state) => {
  return {
    createMyStartupMediaInProcess: _.get(state.requestStatus, CREATE_MY_STARTUP_MEDIA)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createMyStartupMedia: bindActionCreators(createMyStartupMedia, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class MyStartupsAddMediaModal extends Component {
  constructor(props) {
    super(props)

    this.createMyStartupMedia = this.createMyStartupMedia.bind(this)
  }

  createMyStartupMedia(values) {
    this.props.createMyStartupMedia(values, this.props.params, () => {
      this.props.close()
    })
  }

  render() {
    const { close, createMyStartupMediaInProcess } = this.props

    return (
      <Modal show onHide={close} className="form-modal">
        <Modal.Header closeButton>
          <Modal.Title>Add Media</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MyStartupMediaForm
            onSubmit={this.createMyStartupMedia}
            submitInProcess={createMyStartupMediaInProcess}
          />
        </Modal.Body>
      </Modal>
    )
  }
}
