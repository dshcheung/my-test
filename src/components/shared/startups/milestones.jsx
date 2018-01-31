import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Element from 'react-scroll/modules/components/Element'

import { dMyStartupMilestone, D_MY_STARTUP_MILESTONE } from '../../../actions/my/startups/milestones'

import SharedStartupsTitle from './title'
import SharedStartupsEmpty from './empty'
import MyStartupNEMilestoneModal from '../../modals/my/startups/ne-milestone'

const mapStateToProps = (state) => {
  return {
    requestStatus: _.get(state, 'requestStatus')
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dMyStartupMilestone: bindActionCreators(dMyStartupMilestone, dispatch)
  }
}
@connect(mapStateToProps, mapDispatchToProps)
export default class SharedStartupsMilestones extends Component {
  constructor(props) {
    super(props)

    this.state = { neMilestone: false, editMode: false, milestone: null }

    this.dMyStartupMilestone = this.dMyStartupMilestone.bind(this)
    this.open = this.open.bind(this)
    this.close = this.close.bind(this)
  }

  dMyStartupMilestone(milestoneID) {
    const { routeParams } = this.props
    this.props.dMyStartupMilestone({ ...routeParams, milestoneID })
  }

  open(editMode, milestone) {
    this.setState({ neMilestone: true, editMode, editInfo: milestone })
  }

  close() {
    this.setState({ neMilestone: false, editMode: false, editInfo: null })
  }

  render() {
    const { milestones, editable, requestStatus, routeParams } = this.props
    const { neMilestone, editMode, editInfo } = this.state
    const title = "Milestones"
    const emptyMilestones = milestones.length === 0

    return (
      <Element name={title} className="section">
        <SharedStartupsTitle
          title={title}
          editable={editable}
          open={() => { this.open(false, null) }}
        />

        <SharedStartupsEmpty
          title={title}
          condition={emptyMilestones}
          editable={editable}
        />

        {
          !emptyMilestones && (
            <div className="row">
              <ul className="col-xs-12 milestones">
                {
                  milestones.map((milestone, i) => {
                    const dInProcess = _.get(requestStatus, `${D_MY_STARTUP_MILESTONE}_${milestone.id}`)

                    return (
                      <div className="milestone" key={i}>
                        {
                          editable && (
                            <button
                              className="btn btn-info edit pull-right"
                              onClick={() => { this.open(true, milestone) }}
                            ><i className="fa fa-pencil" /></button>
                          )
                        }
                        {
                          editable && (
                            <button
                              className="btn btn-danger delete pull-right"
                              disabled={dInProcess}
                              onClick={() => { this.dMyStartupMilestone(milestone.id) }}
                            ><i className="fa fa-trash" /></button>
                          )
                        }
                        <div className="h3">{moment(milestone.completed_on).format('MMMM YYYY')}</div>
                        <p dangerouslySetInnerHTML={{ __html: milestone.detail.decode() }} />
                      </div>
                    )
                  })
                }
              </ul>
            </div>
          )
        }

        {
          neMilestone && (
            <MyStartupNEMilestoneModal
              close={this.close}
              params={routeParams}
              editMode={editMode}
              milestone={editInfo}
            />
          )
        }
      </Element>
    )
  }
}
