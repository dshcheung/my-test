import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'

import Navbar from './navbar'
import Footer from './footer'

const mapStateToProps = () => {
  return {
  }
}

const mapDispatchToProps = () => {
  return {
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class App extends Component {
  render() {
    return (
      <div id="layouts-app">
        <Navbar />

        <div id="layouts-body" className="clearfix">{this.props.children}</div>

        <Footer />
      </div>
    )
  }
}
