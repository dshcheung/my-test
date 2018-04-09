import React, { Component } from 'react'
import { connect } from 'react-redux'

import { notyWarning } from '../../../../services/noty'

import SharedMyCampaignsStages from '../../../shared/my/campaigns/stages'

const mapStateToProps = (state) => {
  return {
    myCampaign: _.get(state, 'myCampaign')
  }
}

@connect(mapStateToProps, null)
export default class MyCampaignsEdit extends Component {
  componentWillMount() {
    if (this.props.myCampaign && !this.props.myCampaign.can.edit) {
      this.props.router.push("/my/campaigns")
      notyWarning("You Cannot Edit")
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.myCampaign && !nextProps.myCampaign.can.edit) {
      nextProps.router.push("/my/campaigns")
      notyWarning("You Cannot Edit")
    }
  }

  render() {
    const { myCampaign } = this.props

    if (myCampaign && !myCampaign.can.edit) {
      return null
    }

    return (
      <div id="my-campaigns-edit">

      </div>
    )
  }
}
