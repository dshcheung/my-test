import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Element from 'react-scroll/modules/components/Element'

import { dMyStartupHighlight, D_MY_STARTUP_HIGHLIGHT } from '../../../actions/my/startups/highlights'

import SharedStartupsTitle from './title'
import SharedStartupsEmpty from './empty'
import MyStartupsNEHighlightModal from '../../modals/my/startups/ne-highlight'

const mapStateToProps = (state) => {
  return {
    requestStatus: _.get(state, 'requestStatus')
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dMyStartupHighlight: bindActionCreators(dMyStartupHighlight, dispatch)
  }
}
@connect(mapStateToProps, mapDispatchToProps)
export default class SharedStartupsHighlights extends Component {
  constructor(props) {
    super(props)

    this.state = { neHighlight: false, editMode: false, highlight: null }

    this.dMyStartupHighlight = this.dMyStartupHighlight.bind(this)
    this.open = this.open.bind(this)
    this.close = this.close.bind(this)
  }

  dMyStartupHighlight(highlightID) {
    const { routeParams } = this.props
    this.props.dMyStartupHighlight({ ...routeParams, highlightID })
  }

  open(editMode, highlight) {
    this.setState({ neHighlight: true, editMode, editInfo: highlight })
  }

  close() {
    this.setState({ neHighlight: false, editMode: false, editInfo: null })
  }

  render() {
    const { highlights, editable, requestStatus, routeParams } = this.props
    const { neHighlight, editMode, editInfo } = this.state
    const title = "Highlights"
    const emptyHighlights = highlights.length === 0

    return (
      <Element name={title} className="section">
        <SharedStartupsTitle
          title={title}
          editable={editable}
          open={() => { this.open(false, null) }}
        />

        <SharedStartupsEmpty
          title={title}
          condition={emptyHighlights}
          editable={editable}
        />

        {
          !emptyHighlights && (
            <div className="row">
              <ul className="col-xs-12 list highlights">
                {
                  highlights.map((highlight, i) => {
                    const dInProcess = _.get(requestStatus, `${D_MY_STARTUP_HIGHLIGHT}_${highlight.id}`)

                    return (
                      <li key={i}>
                        {
                          editable && (
                            <button
                              className="btn btn-info edit pull-right"
                              onClick={() => { this.open(true, highlight) }}
                            ><i className="fa fa-pencil" /></button>
                          )
                        }
                        {
                          editable && (
                            <button
                              className="btn btn-danger delete pull-right"
                              disabled={dInProcess}
                              onClick={() => { this.dMyStartupHighlight(highlight.id) }}
                            ><i className="fa fa-trash" /></button>
                          )
                        }
                        <span dangerouslySetInnerHTML={{ __html: highlight.detail.decode() }} />
                      </li>
                    )
                  })
                }
              </ul>
            </div>
          )
        }

        {
          neHighlight && (
            <MyStartupsNEHighlightModal
              close={this.close}
              params={routeParams}
              editMode={editMode}
              highlight={editInfo}
            />
          )
        }
      </Element>
    )
  }
}
