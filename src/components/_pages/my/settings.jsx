import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Panel from 'react-bootstrap/lib/Panel'
import { Link } from 'react-router'

import {
  updatePassword, UPDATE_PASSWORD,
  updateMyProfile, UPDATE_MY_PROFILE,
  signoutAll, SIGNOUT_ALL
} from '../../../actions/my/profile'
import { uMyPreferences } from '../../../actions/my/preferences'
import {
  G_MY_INVESTOR_BANK_DETAIL, gMyInvestorBankDetail,
  U_MY_INVESTOR_BANK_DETAIL, uMyInvestorBankDetail,
  resetMyInvestorBankDetail
} from '../../../actions/my/investor-bank-details'

import MyProfileUpdatePasswordForm from '../../forms/profile/update-password'
import MyProfileNameForm from '../../forms/profile/settings-name'
import MyProfileAddressForm from '../../forms/profile/settings-address'
import MyProfileContactForm from '../../forms/profile/settings-contact'

import InvestorAMLBankDetailsForm from '../../forms/investor-validations/aml-bank-details'

const mapStateToProps = (state) => {
  return {
    currentUser: _.get(state, 'session'),
    updatePasswordInProcess: _.get(state.requestStatus, UPDATE_PASSWORD),
    updateMyProfileInProcess: _.get(state.requestStatus, UPDATE_MY_PROFILE),
    signoutAllInProcess: _.get(state.requestStatus, SIGNOUT_ALL),
    myInvestorBankDetail: _.get(state, 'myInvestorBankDetail'),
    gMyInvestorBankDetailInProcess: _.get(state.requestStatus, G_MY_INVESTOR_BANK_DETAIL),
    uMyInvestorBankDetailInProcess: _.get(state.requestStatus, U_MY_INVESTOR_BANK_DETAIL)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updatePassword: bindActionCreators(updatePassword, dispatch),
    updateMyProfile: bindActionCreators(updateMyProfile, dispatch),
    uMyPreferences: bindActionCreators(uMyPreferences, dispatch),
    signoutAll: bindActionCreators(signoutAll, dispatch),
    gMyInvestorBankDetail: bindActionCreators(gMyInvestorBankDetail, dispatch),
    uMyInvestorBankDetail: bindActionCreators(uMyInvestorBankDetail, dispatch),
    resetMyInvestorBankDetail: bindActionCreators(resetMyInvestorBankDetail, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Settings extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tab: "general",
      editingForm: null
    }

    this.change = this.change.bind(this)
    this.changeEdit = this.changeEdit.bind(this)
    this.updateMyProfile = this.updateMyProfile.bind(this)
    this.updatePassword = this.updatePassword.bind(this)
    this.signoutAll = this.signoutAll.bind(this)
    this.uMyInvestorBankDetail = this.uMyInvestorBankDetail.bind(this)
  }

  componentWillMount() {
    const { location, currentUser } = this.props
    if (location.hash) { this.setState({ tab: location.hash.replace("#", '') }) }
    if (currentUser.role === "Investor") this.props.gMyInvestorBankDetail()
  }

  componentWillUnmount() {
    this.props.resetMyInvestorBankDetail()
  }

  change(tab) {
    const { router, location } = this.props
    router.replace(`${location.pathname}#${tab}`)
    this.setState({ tab })
  }

  changeEdit(value) {
    this.setState({ editingForm: value })
  }

  updateMyProfile(values) {
    this.props.updateMyProfile(values, () => {
      this.changeEdit(null)
    })
  }

  updatePassword(values) {
    this.props.updatePassword(values, () => {
      this.props.reset()
    })
  }

  signoutAll() {
    this.props.signoutAll()
  }

  uMyInvestorBankDetail(values) {
    this.props.uMyInvestorBankDetail(values, () => {
      this.changeEdit(null)
    })
  }

  render() {
    const { currentUser, myInvestorBankDetail } = this.props

    const { email, mobile, verified_email, verified_mobile, role } = currentUser

    const isInvestor = currentUser.is_investor

    const kyc_aml_approved = _.get(currentUser, 'investor.kyc_aml_approved', false)

    const { first_name, last_name, country_of_residence, address } = currentUser.profile

    const { notify, locale, show_email, show_mobile } = currentUser.preferences

    return (
      <div id="page-my-settings" className="container">
        <div className="sidebar">
          <ul>
            <li className={this.state.tab === "general" ? "selected" : ""}>
              <Link onClick={() => { this.change("general") }}>General</Link>
            </li>
            <li className={this.state.tab === "privacy" ? "selected" : ""}>
              <Link onClick={() => { this.change("privacy") }}>Privacy</Link>
            </li>
            <li className={this.state.tab === "notification" ? "selected" : ""}>
              <Link onClick={() => { this.change("notification") }}>Notification</Link>
            </li>
            <li className={this.state.tab === "language" ? "selected" : ""}>
              <Link onClick={() => { this.change("language") }}>Language</Link>
            </li>
            <li className={this.state.tab === "security" ? "selected" : ""}>
              <Link onClick={() => { this.change("security") }}>Security</Link>
            </li>
            <li className={this.state.tab === "bank_details" ? "selected" : ""}>
              <Link onClick={() => { this.change("bank_details") }}>Bank Details</Link>
            </li>
          </ul>
        </div>
        <div className="content">
          {
            this.state.tab === "general" && (
              <div className="tab general">
                <Panel header="Name">
                  {
                    this.state.editingForm !== "name" && (
                      <div>
                        <button
                          className="btn pull-right"
                          onClick={() => { this.changeEdit("name") }}
                        >Edit</button>
                        {first_name} {last_name}
                      </div>
                    )
                  }
                  {
                    this.state.editingForm === "name" && (
                      <MyProfileNameForm
                        optclass="col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3"
                        onSubmit={this.updateMyProfile}
                        submitInProcess={this.props.updateMyProfileInProcess}
                        initialValues={{ first_name, last_name }}
                      />
                    )
                  }
                </Panel>
                <Panel header="Contact">
                  {
                    this.state.editingForm !== "contact" && (
                      <div>
                        <button
                          className="btn pull-right"
                          onClick={() => { this.changeEdit("contact") }}
                        >Edit</button>
                        {
                          email && (
                            <div>
                              Email - {email || "Null"} <span
                                className={verified_email ? "label label-success" : "pointer btn btn-xs btn-warning"}
                                onClick={() => { if (!verified_email) this.props.router.push("verify") }}
                              >{ verified_email ? "Verifed" : "Verify" }</span>
                            </div>
                          )
                        }
                        {
                          mobile && (
                            <div className="margin-top-15">
                              Mobile - {mobile || "Null"} <span
                                className={verified_mobile ? "label label-success" : "pointer btn btn-xs btn-warning"}
                                onClick={() => { if (!verified_mobile) this.props.router.push("verify") }}
                              >{ verified_mobile ? "Verified" : "Verify" }</span>
                            </div>
                          )
                        }
                      </div>
                    )
                  }
                  {
                    this.state.editingForm === "contact" && (
                      <MyProfileContactForm
                        optclass="col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3"
                        onSubmit={this.updateMyProfile}
                        submitInProcess={this.props.updateMyProfileInProcess}
                        initialValues={{
                          email,
                          mobile
                        }}
                      />
                    )
                  }
                </Panel>
                <Panel header="Address">
                  {
                    this.state.editingForm !== "address" && (
                      <div>
                        <button
                          className="btn pull-right"
                          onClick={() => { this.changeEdit("address") }}
                        >Edit</button>
                        <div>Country Of Residency - { country_of_residence || "Null" }</div>
                        <div>Address - { address || "Null" }</div>
                      </div>
                    )
                  }
                  {
                    this.state.editingForm === "address" && (
                      <MyProfileAddressForm
                        optclass="col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3"
                        onSubmit={this.updateMyProfile}
                        submitInProcess={this.props.updateMyProfileInProcess}
                        initialValues={{ address, country_of_residence }}
                      />
                    )
                  }
                </Panel>
                {
                  isInvestor && (
                    <Panel header="KYC & AML Status">
                      <div><strong>KYC & AML Status -</strong> <span className={`${kyc_aml_approved ? "text-success" : "text-warning"}`}>{kyc_aml_approved ? "Approved" : "Pending"}</span></div>
                    </Panel>
                  )
                }
              </div>
            )
          }
          {
            this.state.tab === "privacy" && (
              <div className="tab privacy">
                <Panel header="Display Email/Mobile On Profile">
                  <div>
                    <div>
                      <label htmlFor="email">Show Email On Profile</label>
                    </div>
                    <label className="switch" htmlFor="email">
                      <input
                        id="email"
                        type="checkbox"
                        name="email"
                        checked={show_email}
                        onChange={(e) => {
                          this.props.uMyPreferences({ showEmail: e.target.checked })
                        }}
                      />
                      <span className="slider round" />
                    </label>
                  </div>
                  <div>
                    <div>
                      <label htmlFor="mobile">Show Mobile On Profile</label>
                    </div>
                    <label className="switch" htmlFor="mobile">
                      <input
                        id="mobile"
                        type="checkbox"
                        name="mobile"
                        checked={show_mobile}
                        onChange={(e) => {
                          this.props.uMyPreferences({ showMobile: e.target.checked })
                        }}
                      />
                      <span className="slider round" />
                    </label>
                  </div>
                </Panel>
              </div>
            )
          }
          {
            this.state.tab === "notification" && (
              <div className="tab notification">
                <Panel header="Notifications">
                  <div className="settings-section">
                    <button
                      className={`btn ${notify === "email" ? "btn-primary" : "btn-default"}`}
                      onClick={() => { this.props.uMyPreferences({ notify: "email" }) }}
                    >Email</button>
                    <button
                      className={`btn ${notify === "sms" ? "btn-primary" : "btn-default"}`}
                      onClick={() => { this.props.uMyPreferences({ notify: "sms" }) }}
                    >SMS</button>
                    <button
                      className={`btn ${notify === "none" ? "btn-primary" : "btn-default"}`}
                      onClick={() => { this.props.uMyPreferences({ notify: "none" }) }}
                    >None</button>
                  </div>
                </Panel>
              </div>
            )
          }
          {
            this.state.tab === "language" && (
              <div className="tab language">
                <Panel header="Languages">
                  <div className="settings-section">
                    <button
                      className={`btn ${locale === "en" ? "btn-primary" : "btn-default"}`}
                      onClick={() => { this.props.uMyPreferences({ locale: "en" }) }}
                    >English</button>
                    <button
                      className={`btn ${locale === "zh" ? "btn-primary" : "btn-default"}`}
                      onClick={() => { this.props.uMyPreferences({ locale: "zh" }) }}
                    >中文</button>
                  </div>
                </Panel>
              </div>
            )
          }
          {
            this.state.tab === "security" && (
              <div className="tab security">
                <Panel header="Update Password">
                  <MyProfileUpdatePasswordForm
                    optclass="col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3"
                    onSubmit={this.updatePassword}
                    submitInProcess={this.props.updatePasswordInProcess}
                  />
                </Panel>

                <Panel header="Signout All Devices">
                  <button
                    className="btn btn-primary"
                    onClick={this.signoutAll}
                  >Signout All</button>
                </Panel>
              </div>
            )
          }
          {
            this.state.tab === "bank_details" && role === "Investor" && (
              <div className="tab bank-details">
                <Panel header="Update Bank Details">
                  {
                    this.state.editingForm !== "bank" && (
                      <div>
                        <button
                          className="btn pull-right"
                          onClick={() => { this.changeEdit("bank") }}
                        >Edit</button>
                        <div>Name - {_.get(myInvestorBankDetail, 'name', null)}</div>
                        <div className="margin-top-15">Account Number - {_.get(myInvestorBankDetail, 'account_number', null)}</div>
                        <div className="margin-top-15">Address - {_.get(myInvestorBankDetail, 'address', null)}</div>
                        <div className="margin-top-15">Country - {_.get(myInvestorBankDetail, 'country', null)}</div>
                      </div>
                    )
                  }
                  {
                    this.state.editingForm === "bank" && (
                      <InvestorAMLBankDetailsForm
                        optclass="col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3"
                        onSubmit={this.uMyInvestorBankDetail}
                        submitInProcess={this.props.uMyInvestorBankDetailInProcess}
                        initialValues={myInvestorBankDetail}
                        noHint
                      />
                    )
                  }
                </Panel>
              </div>
            )
          }
        </div>
      </div>
    )
  }
}
