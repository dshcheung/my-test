import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm, Field } from 'redux-form'

import { gImmovable, G_IMMOVABLE_CAMPAIGN_FILTERABLE } from '../../../actions/immovables'

import Validators from '../../../services/form-validators'

import TextField from '../../shared/form-elements/text-field'
// import SelectField from '../../shared/form-elements/select-field'

const mapStateToProps = (state) => {
  return {
    campaignFilterable: _.get(state.immovables, "campaign_filterable", []),
    gCampaignFilterableInProcess: _.get(state.requestStatus, G_IMMOVABLE_CAMPAIGN_FILTERABLE)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    gImmovable: bindActionCreators(gImmovable, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
@reduxForm({
  form: "CampaignsSearchForm",
  validate: (values) => {
    return Validators({
      keyword: [],
      filter: [],
      sortBy: [],
      sort: []
    }, values)
  }
})

export default class CampaignsSearchForm extends Component {
  componentWillMount() {
    this.props.gImmovable({ immovableID: "campaign_filterable" })
  }

  reset() {
    this.props.reset()
    this.props.onSubmit()
  }

  render() {
    // const { handleSubmit, submitInProcess, optClass, campaignFilterable } = this.props
    const { handleSubmit, submitInProcess, optClass } = this.props

    return (
      <div id="forms-startups-search" className={optClass}>
        <form onSubmit={handleSubmit} className="form-inline">
          <Field
            name="keyword"
            component={TextField}
            opts={{
              type: "text",
              placeholder: "Startup Name"
            }}
          />

          {
            /* TODO: Category Immovable
              <Field
                name="filter"
                component={SelectField}
                opts={{
                  placeholder: "Category",
                  options: campaignFilterable
                }}
              />
              <Field
                name="sortBy"
                component={SelectField}
                opts={{
                  placeholder: "Sort By",
                  options: [{ id: 'name', name: "Name" }]
                }}
              />

              <Field
                name="sort"
                component={SelectField}
                opts={{
                  placeholder: "Direction",
                  options: [{ id: "ASC", name: "ASC" }, { id: "DESC", name: "DESC" }]
                }}
              />
            */
          }

          <button
            className={`btn btn-info ${submitInProcess && "m-progress"}`}
            type="submit"
            disabled={submitInProcess}
          >
            Search
          </button>

          <button
            className="btn btn-danger"
            type="button"
            disabled={submitInProcess}
            onClick={() => { this.reset() }}
          >
            Reset
          </button>
        </form>
      </div>
    )
  }
}
