import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Element from 'react-scroll/modules/components/Element'

import { dMyStartupFund, D_MY_STARTUP_FUND } from '../../../actions/my/startups/funds'

import SharedStartupsTitle from './title'
import SharedStartupsEmpty from './empty'
import MyStartupsNEFundModal from '../../modals/my/startups/ne-fund'

const mapStateToProps = (state) => {
  return {
    requestStatus: _.get(state, 'requestStatus')
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dMyStartupFund: bindActionCreators(dMyStartupFund, dispatch)
  }
}
@connect(mapStateToProps, mapDispatchToProps)
export default class SharedStartupsFunds extends Component {
  constructor(props) {
    super(props)

    this.state = { neFund: false, editMode: false, fund: null }

    this.dMyStartupFund = this.dMyStartupFund.bind(this)
    this.open = this.open.bind(this)
    this.close = this.close.bind(this)
  }

  dMyStartupFund(fundID) {
    const { routeParams } = this.props
    this.props.dMyStartupFund({ ...routeParams, fundID })
  }

  open(editMode, fund) {
    this.setState({ neFund: true, editMode, editInfo: fund })
  }

  close() {
    this.setState({ neFund: false, editMode: false, editInfo: null })
  }

  render() {
    const { funds, editable, requestStatus, routeParams } = this.props
    const { neFund, editMode, editInfo } = this.state
    const title = "Use of Funds"
    const emptyFunds = funds.length === 0

    return (
      <Element name={title} className="section">
        <SharedStartupsTitle
          title={title}
          editable={editable}
          open={() => { this.open(false, null) }}
        />

        <SharedStartupsEmpty
          title={title}
          condition={emptyFunds}
          editable={editable}
        />

        {
          !emptyFunds && (
            <ul className="funds">
              {
                funds.map((fund, i) => {
                  const dInProcess = _.get(requestStatus, `${D_MY_STARTUP_FUND}_${fund.id}`)

                  return (
                    <div className="fund" key={i}>
                      {
                        editable && (
                          <button
                            className="btn btn-info edit pull-right"
                            onClick={() => { this.open(true, fund) }}
                          ><i className="fa fa-pencil" /></button>
                        )
                      }
                      {
                        editable && (
                          <button
                            className="btn btn-danger delete pull-right"
                            disabled={dInProcess}
                            onClick={() => { this.dMyStartupFund(fund.id) }}
                          ><i className="fa fa-trash" /></button>
                        )
                      }
                      <div className="h3">{moment(fund.received_at).format('MMMM YYYY')}</div>
                      <p><b>{fund.company}</b> ${fund.amount}</p>
                    </div>
                  )
                })
              }
            </ul>
          )
        }

        {
          neFund && (
            <MyStartupsNEFundModal
              close={this.close}
              params={routeParams}
              editMode={editMode}
              fund={editInfo}
            />
          )
        }
      </Element>
    )
  }
}
