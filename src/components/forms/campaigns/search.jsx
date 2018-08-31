import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm, Field } from 'redux-form'

import {
  gImmovable, resetImmovable,
  G_IMMOVABLE_HASHTAG_OPTIONS,
  G_IMMOVABLE_CAMPAIGN_FILTERABLE
} from '../../../actions/immovables'

import TextField from '../../shared/form-elements/text-field'
import SelectField from '../../shared/form-elements/select-field'

const mapStateToProps = (state) => {
  return {
    hashtagOptions: _.get(state.immovables, "hashtag_options", []),
    gHashtagOptionsInProcess: _.get(state.requestStatus, G_IMMOVABLE_HASHTAG_OPTIONS),
    campaignFilterable: _.get(state.immovables, "campaign_filterable", []),
    gCampaignFilterableInProcess: _.get(state.requestStatus, G_IMMOVABLE_CAMPAIGN_FILTERABLE)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    gImmovable: bindActionCreators(gImmovable, dispatch),
    resetImmovable: bindActionCreators(resetImmovable, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
@reduxForm({
  form: "CampaignsSearchForm"
})

export default class CampaignsSearchForm extends Component {
  componentWillMount() {
    this.props.gImmovable({ immovableID: "hashtag_options" })
    this.props.gImmovable({ immovableID: "campaign_filterable" })
  }

  componentWillUnmount() {
    this.props.resetImmovable()
  }

  render() {
    const {
      handleSubmit, optClass,
      hashtagOptions, gHashtagOptionsInProcess,
      campaignFilterable, gCampaignFilterableInProcess

    } = this.props

    return (
      <div id="forms-startups-search" className={optClass}>
        <form onSubmit={handleSubmit} >
          <Field
            name="keyword"
            component={TextField}
            opts={{
              type: "text",
              label: "Search",
              placeholder: "Campaign Name"
            }}
          />

          <div className="row">
            <div className="col-xs-12 col-sm-6">
              <Field
                name="filter"
                component={SelectField}
                opts={{
                  label: "Category",
                  placeholder: "Category",
                  options: hashtagOptions,
                  requestInProcess: gHashtagOptionsInProcess,
                  valueField: "id",
                  textField: "name",
                  filter: true
                }}
              />
            </div>

            <div className="col-xs-12 col-sm-6">
              <Field
                name="sortBy"
                component={SelectField}
                opts={{
                  label: "Sort By",
                  placeholder: "Sort By",
                  options: campaignFilterable,
                  requestInProcess: gCampaignFilterableInProcess,
                  valueField: "id",
                  textField: "name",
                  filter: true
                }}
              />
            </div>
          </div>
        </form>
      </div>
    )
  }
}
