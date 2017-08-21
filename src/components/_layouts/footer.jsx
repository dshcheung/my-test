import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
import { Link } from 'react-router'

const mapStateToProps = () => {
  return {
  }
}

const mapDispatchToProps = () => {
  return {
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Footer extends Component {
  render() {
    return (
      <div id="layouts-footer" className="bg-primary clearfix">
        <div className="links">
          <div className="links-section">
            <b>Intergrations</b>
            <div>Google Sheets</div>
            <div>Google Analytics</div>
            <div>Xero</div>
          </div>

          <div className="links-section">
            <b>About Us</b>
            <div>Blog</div>
            <div>Partners</div>
            <div>Contact</div>
          </div>

          <div className="links-section">
            <b>Solutions</b>
            <div>Investor Updates & Reporting</div>
            <div>Client Reporting</div>
            <div>Internal Management Reporting</div>
          </div>

          <div className="links-section">
            <b>Stay up-to-date</b>
            <div>Sign up to our newsletter to stay up-to-date with our latest news and promotions delivered to your inbox</div>
          </div>
        </div>

        <hr />

        <div className="others clearfix">
          <span className="copy-right">2017 AngelHub</span>

          <ul className="social">
            <li><Link><i className="fa fa-instagram" /></Link></li>
            <li><Link><i className="fa fa-facebook" /></Link></li>
            <li><Link><i className="fa fa-twitter" /></Link></li>
            <li><Link><i className="fa fa-linkedin" /></Link></li>
          </ul>
        </div>
      </div>
    )
  }
}
