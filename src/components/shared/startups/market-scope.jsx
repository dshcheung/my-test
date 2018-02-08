import React, { Component } from 'react'
import Element from 'react-scroll/modules/components/Element'

import SharedStartupsTitle from './title'
import SharedStartupsEmpty from './empty'
import MyStartupsSMarketScopeModal from '../../modals/my/startups/s-market-scope'

export default class SharedStartupsMarketScope extends Component {
  constructor(props) {
    super(props)

    this.state = { sMarketScope: false }

    this.open = this.open.bind(this)
    this.close = this.close.bind(this)
  }

  open() {
    this.setState({ sMarketScope: true })
  }

  close() {
    this.setState({ sMarketScope: false })
  }

  render() {
    const { marketScope, editable, routeParams } = this.props
    const { sMarketScope } = this.state
    const title = "Market Scope"

    const description = _.get(marketScope, 'description', null)
    const descriptionExists = !!description

    const attachments = _.get(marketScope, 'attachments', [])
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
            <div className="row">
              <div className="col-xs-12 market-scope-description" dangerouslySetInnerHTML={{ __html: description.decode() }} />
            </div>
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
          sMarketScope && (
            <MyStartupsSMarketScopeModal
              close={this.close}
              params={routeParams}
              editMode={editMode}
              marketScope={marketScope}
            />
          )
        }
      </Element>
    )
  }
}
