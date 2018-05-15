import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Element from 'react-scroll/modules/components/Element'

import { getFileIcon } from '../../../services/utils'

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
    const { data, editable, routeParams, viewDataRoom, requestDataAccessInProcess } = this.props
    const { sAttachments } = this.state
    const nullAttachments = data.data === null
    const emptyAttachments = data.data && data.data.length === 0
    const noAttachments = nullAttachments || emptyAttachments

    return (
      <Element name={data.title} className="section clearfix">
        <SharedStartupsTitle
          title={data.title}
          editable={editable}
          open={() => { this.open() }}
        />

        <SharedStartupsEmpty
          title={data.title}
          condition={noAttachments}
          editable={editable}
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
            <div className="data-room row">
              {
                data.data.map((a, i) => {
                  const file = _.get(a, 'file.original')
                  const cover = _.get(a, 'file.cover')
                  const title = _.get(a, 'title')
                  const extension = _.get(a, 'file.extension')

                  const imgStyle = {
                    "background-image": `url(${cover})`
                  }

                  const icon = getFileIcon(extension)

                  return (
                    <div key={i} className="col-xs-12 col-sm-4 attachment">
                      <div className="cover">
                        {
                          cover ? (
                            <div className="cover-img" style={imgStyle} />
                          ) : (
                            <i className={`far ${icon} cover-icon fa-8x`} />
                          )
                        }
                      </div>
                      <a href={file} target="_blank" className="btn btn-success button">
                        <i className="fa fa-fw fa-download" />
                        {title}
                      </a>
                    </div>
                  )
                })
              }
            </div>
          )
        }

        {
          sAttachments && (
            <MyStartupsSAttachmentsModal
              close={this.close}
              params={routeParams}
              attachments={data.data}
            />
          )
        }
      </Element>
    )
  }
}

// EXCEL
// csv
// xslx
// xsl

// PDF
// pdf

// POWERPOINT
// pptx
// ppt

// WORD
// docx
// doc

// FILE
// anything else


// <ul>
//   {
//     data.data.map((attachment, i) => {
//       const file = _.get(attachment, 'file.original')
//       const title = _.get(attachment, 'title')

//       return (
//         <li key={i}>
//           <a href={file} className="btn btn-success" target="_blank">
//             {title}
//             <i className="fa fa-fw fa-download" />
//           </a>
//         </li>
//       )
//     })
//   }
// </ul>
