import React, { Component } from 'react'
import Modal from 'react-bootstrap/lib/Modal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  dMyStartupRiskAttachment, D_MY_STARTUP_RISK_ATTACHMENT
} from '../../../../actions/my/startups/risk'

import MyStartupsNERiskDescriptionModal from './ne-risk-description'
import MyStartupsNERiskAttachmentModal from './ne-risk-attachment'

const mapStateToProps = (state) => {
  return {
    requestStatus: _.get(state, 'requestStatus')
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dMyStartupRiskAttachment: bindActionCreators(dMyStartupRiskAttachment, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class MyStartupsSRiskModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      sRisk: true
    }

    this.open = this.open.bind(this)
    this.close = this.close.bind(this)
  }

  open(modalName, stateEditMode, editInfo, editIndex) {
    this.setState({ sRisk: false, [modalName]: true, stateEditMode, editInfo, editIndex })
  }

  close(modalName) {
    this.setState({ sRisk: true, [modalName]: false, stateEditMode: false, editInfo: null, editIndex: null })
  }

  dMyStartupRiskAttachment(id) {
    this.props.dMyStartupRiskAttachment({
      attachments: [
        {
          id,
          _destroy: true
        }
      ]
    }, this.props.params)
  }


  render() {
    const { close, editMode, risk, params, requestStatus } = this.props
    const { stateEditMode, editInfo } = this.state

    const description = _.get(risk, 'description', '')
    const attachments = _.get(risk, 'attachments', [])

    const hasDescription = !!description
    const hasAttachments = attachments.length > 0

    const descriptionIconClass = hasDescription ? "fa-pencil" : "fa-plus"
    const keyword = editMode ? "Edit" : "Add"

    return (
      <Modal show onHide={close} className={`form-modal ${!this.state.sRisk && 'hide'}`} id="modals-my-startups-s-risk">
        <Modal.Header closeButton>
          <Modal.Title>{keyword} Risk</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <section className="description">
            <div className="h3 margin-top-0">
              Description
              <button
                className="btn btn-info pull-right"
                onClick={() => { this.open('neRiskDescription', hasDescription, description) }}
              ><i className={`fa ${descriptionIconClass}`} /></button>
            </div>
            {
              hasDescription ? (
                <div dangerouslySetInnerHTML={{ __html: htmlDecode(description) }} />
              ) : (
                <div>Click Add Icon To Add Description</div>
              )
            }
          </section>

          <hr />

          <section className="attachments">
            <div className="h3 margin-top-0">
              Attachments
              <button
                className="btn btn-info pull-right"
                onClick={() => { this.open('neRiskAttachment', false) }}
              ><i className="fa fa-plus" /></button>
            </div>
            {
              hasAttachments ? (
                <ul className="attachment-list">
                  {
                    attachments.map((attachment, i) => {
                      const file = _.get(attachment, 'file.original')
                      const title = _.get(attachment, 'title')

                      return (
                        <li key={i} className="attachment">
                          <button
                            className="btn btn-info edit pull-right"
                            disabled={_.get(requestStatus, `${D_MY_STARTUP_RISK_ATTACHMENT}_${attachment.id}`)}
                            onClick={() => { this.open("neRiskAttachment", true, attachment, i) }}
                          >
                            <i className="fa fa-pencil" />
                          </button>
                          <button
                            className="btn btn-danger btn-outline delete pull-right"
                            disabled={_.get(requestStatus, `${D_MY_STARTUP_RISK_ATTACHMENT}_${attachment.id}`)}
                            onClick={() => { this.dMyStartupRiskAttachment(attachment.id) }}
                          >
                            <i className="fa fa-trash" />
                          </button>
                          <a href={file} className="btn btn-success">
                            {title}
                            <i className="fa fa-fw fa-download" />
                          </a>
                        </li>
                      )
                    })
                  }
                </ul>
              ) : (
                <div>Click Add Icon To Add Attachment</div>
              )
            }
          </section>
        </Modal.Body>

        {this.state.neRiskDescription && <MyStartupsNERiskDescriptionModal close={() => { this.close("neRiskDescription") }} params={params} editMode={stateEditMode} description={editInfo} /> }
        {this.state.neRiskAttachment && <MyStartupsNERiskAttachmentModal close={() => { this.close("neRiskAttachment") }} params={params} editMode={stateEditMode} attachment={editInfo} />}
      </Modal>
    )
  }
}

const htmlDecode = (input) => {
  const e = document.createElement('div')
  e.innerHTML = input
  return e.innerHTML
}