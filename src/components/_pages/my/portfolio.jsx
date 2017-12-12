import React, { Component } from 'react'
// import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'

// import {
//   gMyCampaigns, G_MY_CAMPAIGNS,
//   resetMyCampaigns
// } from '../../../actions/my/campaigns'

// const mapStateToProps = (state) => {
//   return {
//     myCampaigns: _.get(state, 'myCampaigns', []),
//     gMyCampaignsInProcess: _.get(state.requestStatus, G_MY_CAMPAIGNS)
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     gMyCampaigns: bindActionCreators(gMyCampaigns, dispatch),
//     resetMyCampaigns: bindActionCreators(resetMyCampaigns, dispatch)
//   }
// }

// @connect(mapStateToProps, mapDispatchToProps)
export default class Portfolio extends Component {
  // constructor(props) {
  //   super(props)

  //   this.state = {}
  // }

  // componentWillMount() {
  //   this.props.gMyCampaigns()
  // }

  // componentWillUnmount() {
  //   this.props.resetMyCampaigns()
  // }

  render() {
    return (
      <div id="pages-my-portfolio" className="container-fluid">
        test
      </div>
    )
  }
}
