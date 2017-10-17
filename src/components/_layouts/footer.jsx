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
      <div id="layouts-footer" className="bg-primary padding-bottom-50 clearfix">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xs-12 col-md-10 col-md-offset-1">
              <div className="links">
                <div className="links-section">
                  <span className="header">Account</span>
                  <ul>
                    <li><Link className="btn-gray">Log In</Link></li>
                    <li><Link className="btn-gray">Sign up</Link></li>
                  </ul>
                </div>

                <div className="links-section">
                  <span className="header">About</span>
                  <ul>
                    <li><Link className="btn-gray">About Us</Link></li>
                    <li><Link className="btn-gray">Careers</Link></li>
                    <li><Link className="btn-gray">Press</Link></li>
                    <li><Link className="btn-gray">Contact</Link></li>
                    <li><Link className="btn-gray">Legal & Privacy</Link></li>
                    <li><Link className="btn-gray">Security</Link></li>
                  </ul>
                </div>

                <div className="links-section">
                  <span className="header">Resources</span>
                  <ul>
                    <li><Link className="btn-gray">FAQ</Link></li>
                    <li><Link className="btn-gray">Charts</Link></li>
                    <li><Link className="btn-gray">Blog</Link></li>
                    <li><Link className="btn-gray">Fees</Link></li>
                    <li><Link className="btn-gray">Support</Link></li>
                    <li><Link className="btn-gray">Trading Guide</Link></li>
                    <li><Link className="btn-gray">API</Link></li>
                    <li><Link className="btn-gray">Bug Bounty</Link></li>
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
