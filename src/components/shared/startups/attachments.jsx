import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Element from 'react-scroll/modules/components/Element'

import { REQUEST_DATA_ACCESS, requestDataAccess } from '../../../actions/campaigns'

import SharedStartupsTitle from './title'
import SharedStartupsEmpty from './empty'
import MyStartupsSAttachmentsModal from '../../modals/my/startups/s-attachments'

const mapStateToProps = (state) => {
  return {
    requestDataAccessInProcess: _.get(state.requestStatus, REQUEST_DATA_ACCESS)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestDataAccess: bindActionCreators(requestDataAccess, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class SharedStartupsAttachments extends Component {
  constructor(props) {
    super(props)

    this.state = { sAttachments: false }

    this.open = this.open.bind(this)
    this.close = this.close.bind(this)
  }

  open() {
    this.setState({ sAttachments: true })
  }

  close() {
    this.setState({ sAttachments: false })
  }

  render() {
    const { attachments, editable, routeParams, viewDataRoom, requestDataAccessInProcess } = this.props
    const { sAttachments } = this.state
    const title = "Data Room"
    const nullAttachments = attachments === null
    const emptyAttachments = attachments && attachments.length === 0
    const noAttachments = nullAttachments || emptyAttachments
    const editMode = !emptyAttachments

    return (
      <Element name={title} className="section">
        <SharedStartupsTitle
          title={title}
          editable={editable}
          open={() => { this.open() }}
          editMode={editMode}
        />

        <SharedStartupsEmpty
          title={title}
          condition={noAttachments}
          editable={editable}
          editMode={editMode}
        />

        {
          emptyAttachments && viewDataRoom !== "accepted" && (
            <div className="data-room text-center">
              <button
                onClick={() => { this.props.requestDataAccess(routeParams) }}
                className={`btn ${viewDataRoom === "rejected" ? "btn-danger" : "btn-info"} ${requestDataAccessInProcess && "m-progress"}`}
                type="submit"
                disabled={requestDataAccessInProcess || viewDataRoom === "rejected" || viewDataRoom === "pending"}
              >
                {(viewDataRoom === null || viewDataRoom === false) && "Request Dataroom Access"}
                {viewDataRoom === "pending" && "Request Access Sent"}
                {viewDataRoom === "rejected" && "Your Request Has Been Rejected"}
              </button>
            </div>
          )
        }

        {
          !emptyAttachments && viewDataRoom === "accepted" && (
            <div className="data-room">
              <ul>
                {
                  attachments.map((attachment, i) => {
                    return (
                      <li key={i}>
                        <a href={attachment.file.original} className="btn btn-success" target="_blank">
                          {attachment.title}
                          <i className="fa fa-fw fa-download" />
                        </a>
                      </li>
                    )
                  })
                }
              </ul>
            </div>
          )
        }

        {
          sAttachments && (
            <MyStartupsSAttachmentsModal
              close={this.close}
              params={routeParams}
              editMode={editMode}
              attachments={attachments}
            />
          )
        }
      </Element>
    )
  }
}
