import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Element from 'react-scroll/modules/components/Element'

import { dMyStartupMedia, D_MY_STARTUP_MEDIA } from '../../../actions/my/startups/media'

import SharedStartupsTitle from './title'
import SharedStartupsEmpty from './empty'
import MyStartupsNEMediaModal from '../../modals/my/startups/ne-media'

const mapStateToProps = (state) => {
  return {
    requestStatus: _.get(state, 'requestStatus')
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dMyStartupMedia: bindActionCreators(dMyStartupMedia, dispatch)
  }
}
@connect(mapStateToProps, mapDispatchToProps)
export default class SharedStartupsMedia extends Component {
  constructor(props) {
    super(props)

    this.state = { neMedia: false, editMode: false, highlight: null }

    this.dMyStartupMedia = this.dMyStartupMedia.bind(this)
    this.open = this.open.bind(this)
    this.close = this.close.bind(this)
  }

  dMyStartupMedia(highlightID) {
    const { routeParams } = this.props
    this.props.dMyStartupMedia({ ...routeParams, highlightID })
  }

  open(editMode, highlight) {
    this.setState({ neMedia: true, editMode, editInfo: highlight })
  }

  close() {
    this.setState({ neMedia: false, editMode: false, editInfo: null })
  }

  render() {
    const { media, editable, requestStatus, routeParams } = this.props
    const { neMedia, editMode, editInfo } = this.state
    const title = "Media"
    const emptyMedia = media.length === 0

    return (
      <Element name={title} className="section">
        <SharedStartupsTitle
          title={title}
          editable={editable}
          open={() => { this.open(false, null) }}
        />

        <SharedStartupsEmpty
          title={title}
          condition={emptyMedia}
          editable={editable}
        />

        {
          !emptyMedia && (
            <div className="row">
              {
                media.map((post, i) => {
                  const dInProcess = _.get(requestStatus, `${D_MY_STARTUP_MEDIA}_${post.id}`)

                  return (
                    <div key={i} className="col-md-2 col-sm-3 col-xs-6">
                      <a href={post.link} target="_blank">
                        <img className="img-responsive" key={i} src={post.banner.original} alt={post.title} />
                      </a>
                      {
                        editable && (
                          <button
                            className="btn btn-info edit pull-right"
                            onClick={() => { this.open(true, post) }}
                          ><i className="fa fa-pencil" /></button>
                        )
                      }
                      {
                        editable && (
                          <button
                            className="btn btn-danger delete pull-right"
                            disabled={dInProcess}
                            onClick={() => { this.dMyStartupMedia(post.id) }}
                          ><i className="fa fa-trash" /></button>
                        )
                      }
                    </div>
                  )
                })
              }
            </div>
          )
        }

        {
          neMedia && (
            <MyStartupsNEMediaModal
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
