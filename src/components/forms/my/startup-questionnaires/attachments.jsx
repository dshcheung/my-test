import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm, FieldArray } from 'redux-form'

import Validators from '../../../../services/form-validators'

import Select2Field from '../../../shared/form-elements/select2-field'
import FileField from '../../../shared/form-elements/file-field'
import DynamicFieldArray from '../../../shared/form-elements/dynamic-field-array'

import {
  gImmovable, G_IMMOVABLE_ATTACHMENT_OPTIONS, resetImmovable
} from '../../../../actions/immovables'

const mapStateToProps = (state) => {
  return {
    gImmovableInProcess: _.get(state.requestStatus, G_IMMOVABLE_ATTACHMENT_OPTIONS),
    attachmentOptions: _.get(state, 'immovables.attachment_options', [])
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    gImmovable: bindActionCreators(gImmovable, dispatch),
    resetImmovable: bindActionCreators(resetImmovable, dispatch),
  }
}

@connect(mapStateToProps, mapDispatchToProps)
@reduxForm({
  form: "MyStartupQuestionnaireAttachmentsForm",
  validate: (values) => {
    return Validators({
      attachments: [{
        type: "complexArrOfObj",
        opts: {
          selfPresences: true,
          childFields: {
            title: ["presences"],
            file: [] // TODO: file validation
          }
        }
      }]

    }, values, ["attachments"])
  },
  enableReinitialize: true
})

export default class MyStartupQuestionnaireAttachmentsForm extends Component {
  componentWillMount() {
    this.props.gImmovable({ immovableID: "attachment_options" })
  }

  componentWillUnmount() {
    this.props.resetImmovable()
  }

  render() {
    const { handleSubmit, submitInProcess, optClass, initialValues, dMSQAttributes } = this.props

    return (
      <div className={optClass}>
        <form onSubmit={handleSubmit}>
          <FieldArray
            name="attachments"
            component={DynamicFieldArray}
            opts={{
              label: "Extra Files",
              groupName: "File",
              newFieldInit: {
                title: '',
                file: '',
                file_url: ''
              },
              onDeleteField: dMSQAttributes,
              initialValues,
              dynamicFields: [
                {
                  key: "title",
                  component: Select2Field,
                  opts: {
                    options: this.props.attachmentOptions,
                    valueKey: "name",
                    nameKey: "name",
                    placeholder: "Title",
                    requestInProcess: this.props.gImmovableInProcess
                  }
                },
                {
                  key: "file",
                  component: FileField,
                  opts: {
                    placeholder: "File"
                  }
                }
              ]
            }}
          />

          <button
            className={`btn btn-info btn-lg btn-block ${submitInProcess && "m-progress"}`}
            type="submit"
            disabled={submitInProcess}
          >
            Submit
          </button>
        </form>
      </div>
    )
  }
}
