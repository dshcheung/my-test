import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
import { Link } from 'react-router'

const mapStateToProps = () => {
  return { }
}

const mapDispatchToProps = () => {
  return { }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Footer extends Component {
  render() {
    return (
      <div id="layouts-footer" className="bg-primary clearfix">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xs-12 col-md-10 col-md-offset-1">
              <div className="links">
                <div className="links-section">
                  <span className="header">Intergrations</span>
                  <ul>
                    <li><Link className="btn-gray">Google Sheets</Link></li>
                    <li><Link className="btn-gray">Google Analytics</Link></li>
                    <li><Link className="btn-gray">Xero</Link></li>
                    <li><Link className="btn-gray">Salesforce</Link></li>
                    <li><Link className="btn-gray">Quickbooks</Link></li>
                    <li><Link className="btn-gray">Mixpanel</Link></li>
                    <li><Link className="btn-gray">Stripe</Link></li>
                    <li><Link className="btn-gray">ChartMogul</Link></li>
                  </ul>
                </div>

                <div className="links-section">
                  <span className="header">About Us</span>
                  <ul>
                    <li><Link className="btn-gray">Blog</Link></li>
                    <li><Link className="btn-gray">Partners</Link></li>
                    <li><Link className="btn-gray">Contact</Link></li>
                    <li><Link className="btn-gray">Team</Link></li>
                  </ul>
                </div>

                <div className="links-section">
                  <span className="header">Solutions</span>
                  <ul>
                    <li><Link className="btn-gray">Investor Updates & Reporting</Link></li>
                    <li><Link className="btn-gray">Client Reporting</Link></li>
                    <li><Link className="btn-gray">Internal Management Reporting</Link></li>
                    <li><Link className="btn-gray">Dynamic Business Reports</Link></li>
                    <li><Link className="btn-gray">KPI Dashboards</Link></li>
                  </ul>
                </div>

                <div className="links-section">
                  <span className="header">Stay up-to-date</span>
                  <ul>
                    <li>Sign up to our newsletter to stay up-to-date with our latest news and promotions delivered to your inbox</li>
                  </ul>
                </div>

                <div className="links-section">
                  <img className="footer-brand" src="https://s3-ap-northeast-1.amazonaws.com/angel-hub-dev/static/footer-logo.png" alt="AngelHub" />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12 col-md-10 col-md-offset-1">
              <hr />
              <div className="others clearfix">
                <span className="copy-right">&copy; 2017 AngelHub</span>

                <ul className="social">
                  <li><Link className="btn-gray"><i className="fa fa-instagram" /></Link></li>
                  <li><Link className="btn-gray"><i className="fa fa-facebook" /></Link></li>
                  <li><Link className="btn-gray"><i className="fa fa-twitter" /></Link></li>
                  <li><Link className="btn-gray"><i className="fa fa-linkedin" /></Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
