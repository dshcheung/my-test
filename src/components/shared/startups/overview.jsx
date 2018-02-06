import React, { Component } from 'react'
import Element from 'react-scroll/modules/components/Element'

import SharedStartupsTitle from './title'
import SharedStartupsEmpty from './empty'
import MyStartupsNEOverviewModal from '../../modals/my/startups/ne-overview'

export default class SharedStartupsOverview extends Component {
  constructor(props) {
    super(props)

    this.state = { neOverview: false, editMode: false, overview: null }

    this.open = this.open.bind(this)
    this.close = this.close.bind(this)
  }

  open(editMode, overview) {
    this.setState({ neOverview: true, editInfo: overview })
  }

  close() {
    this.setState({ neOverview: false, editInfo: null })
  }

  render() {
    const { overview, editable, routeParams } = this.props
    const { neOverview, editInfo } = this.state
    const title = "Overview"
    const overviewExist = !!overview
    const editMode = overviewExist

    return (
      <Element name={title} className="section">
        <SharedStartupsTitle
          title={title}
          editable={editable}
          open={() => { this.open(false, overview) }}
          editMode={editMode}
        />

        <SharedStartupsEmpty
          title={title}
          condition={!overviewExist}
          editable={editable}
          editMode={editMode}
        />

        {
          overview && (
            <div><p dangerouslySetInnerHTML={{ __html: overview.decode() }} /></div>
          )
        }

        {
          neOverview && (
            <MyStartupsNEOverviewModal
              close={this.close}
              params={routeParams}
              editMode={editMode}
              overview={editInfo}
            />
          )
        }
      </Element>
    )
  }
}
