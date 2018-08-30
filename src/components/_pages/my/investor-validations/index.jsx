import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

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
          ],
          linkTo: "/my/investor-validations/verfications",
          linkTitle: "Update Verification"
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
          linkTo: "/my/investor-validations/Suitability",
          linkTitle: "Update Suitability"
        },
        {
          dataKey: "aml_approved",
          title: "AML",
          permission: "Fund Campaigns",
          list: [
            "Certified Document",
            "Signed Agreement",
            "Bank Transfer / Cheque"
          ],
          linkTo: "/my/investor-validations/aml/certified_documents",
          linkTitle: "Update AML"
        }
      ]
    }
  }

  iconCheck(status) {
    switch (status) {
      case true:
        return "ahub-unlock text-gold"
      case "accepted":
        return "ahub-unlock text-gold"
      case "pending":
        return "fa-hourglass-half"
      default:
        return "ahub-lock text-dark"
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
              <div key={i} className={`col-xs-12 col-md-4 ${this.checkCompleted(status)}`}>
                <i className={`ahub-3x ${this.iconCheck(status)}`} />

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

  genereteNavButtons() {
    const { currentUser: { investor } } = this.props
    const { info } = this.state

    return (
      <div className="row nav-buttons">
        {
          info.map((item, i) => {
            const status = investor[item.dataKey]

            const incomplete = this.checkCompleted(status) === "incomplete"

            return (
              <div key={i} className="col-xs-4 text-center">
                { incomplete && <Link className="btn btn-primary text-uppercase" to={item.linkTo}>{item.linkTitle}</Link> }
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
          { this.genereteNavButtons() }
        </div>
      </div>
    )
  }
}
