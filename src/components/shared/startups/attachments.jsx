import React, { Component } from 'react'
import Element from 'react-scroll/modules/components/Element'

import SharedStartupsTitle from './title'
import SharedStartupsEmpty from './empty'
import MyStartupSAttachmentsModal from '../../modals/my/startups/s-attachments'

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
    const { attachments, editable, routeParams } = this.props
    const { sAttachments } = this.state
    const title = "Documents"
    const emptyAttachments = attachments === null || attachments.length === 0
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
          condition={emptyAttachments}
          editable={editable}
          editMode={editMode}
        />

        {
          !emptyAttachments && (
            <div className={`documents ${blur}`}>
              <ul>
                {
                  attachments.map((attachment, i) => {
                    return (
                      <li key={i}>
                        <a href={attachment.file.original} className="btn btn-success">
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
            <MyStartupSAttachmentsModal
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
