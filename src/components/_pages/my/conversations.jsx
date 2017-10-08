import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'

const mapStateToProps = (state) => {
  return {
    myConversations: _.get(state, 'myConversations', [])
  }
}

const mapDispatchToProps = () => {
  return {
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class MyConversationsIndex extends Component {
  render() {
    return (
      <div id="page-my-conversations-index" className="container padding-top-20">
        <div className="row">
          <h1 className="page-title margin-bottom-20 margin-top-0">My Conversations</h1>
        </div>
      </div>
    )
  }
}
