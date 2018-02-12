import React, { Component } from 'react'
import Element from 'react-scroll/modules/components/Element'

import SharedStartupsTitle from './title'
import SharedStartupsEmpty from './empty'
import MyStartupsSPitchDeckModal from '../../modals/my/startups/s-pitch-deck'

export default class SharedStartupsPitchDeck extends Component {
  constructor(props) {
    super(props)

    this.state = { sPitchDeck: false }

    this.open = this.open.bind(this)
    this.close = this.close.bind(this)
  }

  open() {
    this.setState({ sPitchDeck: true })
  }

  close() {
    this.setState({ sPitchDeck: false })
  }

  render() {
    const { pitchDeck, editable, routeParams } = this.props
    const { sPitchDeck } = this.state
    const title = "Pitch Deck"

    const description = _.get(pitchDeck, 'description', null)
    const descriptionExists = !!description

    const attachments = _.get(pitchDeck, 'attachments', [])
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
            <div className="pitch-deck-description" dangerouslySetInnerHTML={{ __html: description.decode() }} />
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
          sPitchDeck && (
            <MyStartupsSPitchDeckModal
              close={this.close}
              params={routeParams}
              editMode={editMode}
              pitchDeck={pitchDeck}
            />
          )
        }
      </Element>
    )
  }
}
