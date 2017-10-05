import React, { Component } from 'react'
import Modal from 'react-bootstrap/lib/Modal'
import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'

// import {
//   cuMyStartupMarketScope, CU_MY_STARTUP_MARKET_SCOPE
// } from '../../../../actions/my/startups/market-scope'

import MyStartupsNEMarketScopeDescriptionModal from './ne-market-scope-description'
import MyStartupsNEMarketScopeAttachmentModal from './ne-market-scope-attachment'

const mapStateToProps = () => {
  return {
    // cuMyStartupMarketScopeInProcess: _.get(state.requestStatus, CU_MY_STARTUP_MARKET_SCOPE)
  }
}

const mapDispatchToProps = () => {
  return {
    // cuMyStartupMarketScope: bindActionCreators(cuMyStartupMarketScope, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class MyStartupsSMarketScopeModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      sMarketScope: true
    }

    this.open = this.open.bind(this)
    this.close = this.close.bind(this)
  }

  open(modalName, stateEditMode, editInfo, editIndex) {
    this.setState({ sMarketScope: false, [modalName]: true, stateEditMode, editInfo, editIndex })
  }

  close(modalName) {
    this.setState({ sMarketScope: true, [modalName]: false, stateEditMode: false, editInfo: null, editIndex: null })
  }

  render() {
    const { close, editMode, marketScope, params } = this.props
    const { stateEditMode, editInfo } = this.state

    const description = _.get(marketScope, 'description', '')
    const attachments = _.get(marketScope, 'attachments', [])

    const hasDescription = !!description
    const hasAttachments = attachments.length > 0

    const descriptionIconClass = hasDescription ? "fa-pencil" : "fa-plus"
    const keyword = editMode ? "Edit" : "Add"

    return (
      <Modal show onHide={close} className={`form-modal ${!this.state.sMarketScope && 'hide'}`} id="modals-my-startups-s-market-scope">
        <Modal.Header closeButton>
          <Modal.Title>{keyword} Market Scope</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <section className="description">
            <div className="h3 margin-top-0">
              Description
              <button
                className="btn btn-info pull-right"
                onClick={() => { this.open('neMarketScopeDescription', hasDescription, description) }}
              ><i className={`fa ${descriptionIconClass}`} /></button>
            </div>
            {
              hasDescription ? (
                <div>{description}</div>
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
                onClick={() => { this.open('neMarketScopeAttachment', false) }}
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
                            onClick={() => { this.open("neMarketScopeAttachment", true, attachment, i) }}
                          >
                            <i className="fa fa-pencil" />
                          </button>
                          <button
                            className="btn btn-danger btn-outline delete pull-right"
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

        {this.state.neMarketScopeDescription && <MyStartupsNEMarketScopeDescriptionModal close={() => { this.close("neMarketScopeDescription") }} params={params} editMode={stateEditMode} description={editInfo} /> }
        {this.state.neMarketScopeAttachment && <MyStartupsNEMarketScopeAttachmentModal close={() => { this.close("neMarketScopeAttachment") }} params={params} editMode={stateEditMode} attachment={editInfo} />}
      </Modal>
    )
  }
}
