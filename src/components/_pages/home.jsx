import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'

const mapStateToProps = () => {
  return {
  }
}

const mapDispatchToProps = () => {
  return {
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Home extends Component {
  render() {
    return (
      <section className="module-header default-height parallax bg-dark bg-dark-60">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="h6 m-t-0">WELCOME TO CORE TEMPLATE</h1>
              <h1 className="h2 m-t-20">We Are Business</h1>
              <p className="m-t-20 m-b-0">Core is elegant website template based on Bootstrap 4 framework.</p>
              <p className="m-t-30 m-b-0">
                <a target="_self" href="http://core-wp.2the.me/pricing/" className="btn btn-md btn-circle btn-brand">Get Pricing</a>
                <a target="_self" href="http://core-wp.2the.me/about/" className="btn btn-md btn-circle btn-white btn-outline">Learn More</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
