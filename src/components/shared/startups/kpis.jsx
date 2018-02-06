import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Element from 'react-scroll/modules/components/Element'

import { dMyStartupKPI, D_MY_STARTUP_KPI } from '../../../actions/my/startups/kpis'

import SharedStartupsTitle from './title'
import SharedStartupsEmpty from './empty'
import MyStartupsNEKPIModal from '../../modals/my/startups/ne-kpi'

const mapStateToProps = (state) => {
  return {
    requestStatus: _.get(state, 'requestStatus')
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dMyStartupKPI: bindActionCreators(dMyStartupKPI, dispatch)
  }
}
@connect(mapStateToProps, mapDispatchToProps)
export default class SharedStartupsKPIs extends Component {
  constructor(props) {
    super(props)

    this.state = { neKPI: false, editMode: false, kpi: null }

    this.dMyStartupKPI = this.dMyStartupKPI.bind(this)
    this.open = this.open.bind(this)
    this.close = this.close.bind(this)
  }

  dMyStartupKPI(kpiID) {
    const { routeParams } = this.props
    this.props.dMyStartupKPI({ ...routeParams, kpiID })
  }

  open(editMode, kpi) {
    this.setState({ neKPI: true, editMode, editInfo: kpi })
  }

  close() {
    this.setState({ neKPI: false, editMode: false, editInfo: null })
  }

  render() {
    const { kpis, editable, requestStatus, routeParams } = this.props
    const { neKPI, editMode, editInfo } = this.state
    const title = "KPIs"
    const emptyKPIs = kpis.length === 0

    return (
      <Element name={title} className="section">
        <SharedStartupsTitle
          title={title}
          editable={editable}
          open={() => { this.open(false, null) }}
        />

        <SharedStartupsEmpty
          title={title}
          condition={emptyKPIs}
          editable={editable}
        />

        {
          !emptyKPIs && (
            <div className="row">
              <ul className="col-xs-12 list kpis">
                {
                  kpis.map((kpi, i) => {
                    const dInProcess = _.get(requestStatus, `${D_MY_STARTUP_KPI}_${kpi.id}`)

                    return (
                      <li key={i}>
                        {
                          editable && (
                            <button
                              className="btn btn-info edit pull-right"
                              onClick={() => { this.open(true, kpi) }}
                            ><i className="fa fa-pencil" /></button>
                          )
                        }
                        {
                          editable && (
                            <button
                              className="btn btn-danger delete pull-right"
                              disabled={dInProcess}
                              onClick={() => { this.dMyStartupKPI(kpi.id) }}
                            ><i className="fa fa-trash" /></button>
                          )
                        }
                        <span dangerouslySetInnerHTML={{ __html: kpi.detail.decode() }} />
                      </li>
                    )
                  })
                }
              </ul>
            </div>
          )
        }

        {
          neKPI && (
            <MyStartupsNEKPIModal
              close={this.close}
              params={routeParams}
              editMode={editMode}
              kpi={editInfo}
            />
          )
        }
      </Element>
    )
  }
}
