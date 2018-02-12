import React, { Component } from 'react'
import Element from 'react-scroll/modules/components/Element'

import SharedStartupsTitle from './title'
import SharedStartupsEmpty from './empty'
import MyStartupsSRiskModal from '../../modals/my/startups/s-risk'

export default class SharedStartupsRisk extends Component {
  constructor(props) {
    super(props)

    this.state = { sRisk: false }

    this.open = this.open.bind(this)
    this.close = this.close.bind(this)
  }

  open() {
    this.setState({ sRisk: true })
  }

  close() {
    this.setState({ sRisk: false })
  }

  render() {
    const { risk, editable, routeParams } = this.props
    const { sRisk } = this.state
    const title = "Risk"

    const description = _.get(risk, 'description', null)
    const descriptionExists = !!description

    const attachments = _.get(risk, 'attachments', [])
    const emptyAttachments = attachments.length === 0

    const isEmpty = !descriptionExists && emptyAttachments
    const editMode = !isEmpty

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
          condition={isEmpty}
          editable={editable}
          editMode={editMode}
        />

        {
          description && (
            <div className="risk-description" dangerouslySetInnerHTML={{ __html: description.decode() }} />
          )
        }

        {
          !emptyAttachments && (
            <div>
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
          sRisk && (
            <MyStartupsSRiskModal
              close={this.close}
              params={routeParams}
              editMode={editMode}
              risk={risk}
            />
          )
        }
      </Element>
    )
  }
}
