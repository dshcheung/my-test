import React, { Component } from 'react'
import { connect } from 'react-redux'

import SharedOthersSideTitle from '../../../shared/others/side-title'

const mapStateToProps = (state) => {
  return {
    currentUser: _.get(state, 'session')
  }
}

@connect(mapStateToProps, null)
export default class MyInvestorValidationsIndex extends Component {
  constructor(props) {
    super(props)

    this.state = {
      info: [
        {
          dataKey: "verification_approved",
          title: "Verification",
          list: [
            "World Check",
            "Address",
            "National ID Copy",
            "Risk Profile Questionnaire"
          ]
        },
        {
          dataKey: "suitability_approved",
          title: "Suitability",
          permission: "View all Campaigns on AngelHub",
          list: [
            "Source of Funds",
            "Employment Status",
            "Occupation",
            "Current Income",
            "Education",
            "Investment Experience",
            "Assets Questionnaire",
            "Bank Statement"
          ],
        },
        {
          dataKey: "aml_approved",
          title: "AML",
          permission: "Fund Campaigns",
          list: [
            "Certified Document",
            "Signed Agreement",
            "Bank Transfer / Cheque"
          ]
        }
      ]
    }
  }

  iconCheck(status) {
    switch (status) {
      case true:
        return "fa-check"
      case "accepted":
        return "fa-check"
      case "pending":
        return "fa-hourglass-half"
      default:
        return "fa-times"
    }
  }

  checkCompleted(status) {
    switch (status) {
      case true:
        return "completed"
      case "accepted":
        return "completed"
      case "pending":
        return "pending"
      default:
        return "incomplete"
    }
  }

  generateHeads() {
    const { currentUser: { investor } } = this.props
    const { info } = this.state

    return (
      <div className="row">
        {
          info.map((item, i) => {
            const status = investor[item.dataKey]
            const { title, permission } = item

            return (
              <div key={i} className={`col-xs-4 ${this.checkCompleted(status)}`}>
                <div className="status-icon">
                  <i className={`fas fa-2x ${this.iconCheck(status)}`} />
                </div>

                <h1 className="section-title">{title}</h1>

                { permission && <p className="section-permission">{permission}</p> }
              </div>
            )
          })
        }
      </div>
    )
  }

  generateLists() {
    const { currentUser: { investor } } = this.props
    const { info } = this.state


    return (
      <div className="row">
        {
          info.map((item, i) => {
            const status = investor[item.dataKey]
            const { list } = item
            const iconClass = this.iconCheck(status)

            return (
              <div key={i} className={`col-xs-4 ${this.checkCompleted(status)}`}>
                <ul className="list">
                  {
                    list.map((lItem, j) => {
                      return (
                        <li key={j}><i className={`fas ${iconClass}`} /> {lItem}</li>
                      )
                    })
                  }
                </ul>
              </div>
            )
          })
        }
      </div>
    )
  }

  render() {
    return (
      <div id="page-my-investor-validations-index">
        <SharedOthersSideTitle
          title="investor"
          optClass="hidden-xs col-sm-3 col-md-offset-1 col-md-2"
        />

        <div className="col-xs-12 col-sm-6 validations">
          <h1 className="form-title fw-500">Validation Steps</h1>

          { this.generateHeads() }
          { this.generateLists() }
        </div>
      </div>
    )
  }
}
