import React, { Component } from 'react'
import { reduxForm, Field, FieldArray } from 'redux-form'

import Validators from '../../../../services/form-validators'

import TextArea from '../../../shared/form-elements/text-area'
import DateTimePicker from '../../../shared/form-elements/datetime-picker'
import TextField from '../../../shared/form-elements/text-field'
import ImageField from '../../../shared/form-elements/image-field'
import DynamicFieldArray from '../../../shared/form-elements/dynamic-field-array'
import Select2Field from '../../../shared/form-elements/select2-field'
import FileField from '../../../shared/form-elements/file-field'

@reduxForm({
  form: "MyStartupQuestionnairesTeaserForm",
  validate: (values) => {
    return Validators({
      problem: [{ type: "lengthWord", opts: { max: 100 } }],
      solution: [{ type: "lengthWord", opts: { max: 100 } }],
      make_money: [{ type: "lengthWord", opts: { max: 100 } }],
      unique_selling_point: [{ type: "lengthWord", opts: { max: 200 } }],
      startup_questionnaire_highlights: [{
        type: "complexArrOfObj",
        opts: {
          selfPresences: true,
          selfMax: 5,
          childFields: {
            title: ["presences", { type: "lengthWord", opts: { max: 4 } }],
            content: ["presences", { type: "lengthWord", opts: { max: 20 } }]
          }
        }
      }],
      startup_questionnaire_media: [{
        type: "complexArrOfObj",
        opts: {
          selfPresences: false,
          childFields: {
            logo: ["presences"],
            link: ["presences", "httpLink"]
          }
        }
      }],
      attachments: [{
        type: "complexArrOfObj",
        opts: {
          selfPresences: false,
          childFields: {
            title: ["presences"],
            file: ["filePresences"]
          }
        }
      }]
    }, values, ["startup_questionnaire_highlights", "startup_questionnaire_media", "attachments"])
  },
  enableReinitialize: true
})

// startup_questionnaire_teaser_attributes: [
//   :id,
//   :problem,
//   :solution,
//   :make_money,
//   :unique_selling_point,
//   startup_questionnaire_highlights_attributes: [ :id, :occurred_on, :title, :content, :_destroy ],
//   startup_questionnaire_media_attributes: [ :id, :logo, :link, :_destroy ],
//   attachments_attributes: [ :id, :title, :file, :remove_file, :_destroy ]
// ],

export default class MyStartupQuestionnairesTeaserForm extends Component {
  render() {
    const { handleSubmit, submitInProcess, optClass, dMSQAttributes, pristine } = this.props

    return (
      <div className={optClass}>
        <form onSubmit={handleSubmit}>
          <Field
            name="problem"
            component={TextArea}
            opts={{
              label: "Problem"
            }}
          />

          <Field
            name="solution"
            component={TextArea}
            opts={{
              label: "Solution"
            }}
          />

          <Field
            name="make_money"
            component={TextArea}
            opts={{
              label: "How do you make money",
              hint: "and how much...."
            }}
          />

          <Field
            name="unique_selling_point"
            component={TextArea}
            opts={{
              label: "Unique selling point",
              hint: "Show us how your Selling Proposition is unique. Can be Product features, Market segment addressed, Marketing strategy.... Be precise."
            }}
          />

          <Field
            name="pitch_deck"
            component={FileField}
            opts={{
              label: "Pitch Deck",
              urlKey: "original"
            }}
          />

          <Field
            name="business_plan"
            component={FileField}
            opts={{
              label: "Business Plan (optional)",
              urlKey: "original"
            }}
          />

          <FieldArray
            name="startup_questionnaire_highlights"
            component={DynamicFieldArray}
            opts={{
              label: "Highlights *",
              groupName: "Highlight",
              newFieldInit: {
                occurred_on: moment().toDate(),
                title: '',
                content: ''
              },
              onDeleteField: dMSQAttributes,
              hint: "5 main achievements. For each, we need a 4 words max title, a date (optional, quarter/year), a nominal sentence of 20 words max. Make them count !",
              dynamicFields: [
                {
                  key: "occurred_on",
                  component: DateTimePicker,
                  opts: {
                    label: "Occured On",
                    time: false,
                    format: "DD/MM/YYYY"
                  }
                },
                {
                  key: "title",
                  component: TextField,
                  opts: {
                    placeholder: "Title"
                  }
                },
                {
                  key: "content",
                  component: TextArea,
                  opts: {
                    placeholder: "Content"
                  }
                }
              ]
            }}
          />

          <FieldArray
            name="startup_questionnaire_media"
            component={DynamicFieldArray}
            opts={{
              label: "Media (optional) *",
              groupName: "Medium",
              newFieldInit: {
                logo: '',
                link: ''
              },
              onDeleteField: dMSQAttributes,
              hint: "Provide us with the link to the article and the logo of the media",
              dynamicFields: [
                {
                  key: "logo",
                  component: ImageField,
                  opts: {
                    title: "Logo",
                    urlKey: "original",
                    optClass: "image-field-avatar"
                  }
                },
                {
                  key: "link",
                  component: TextField,
                  opts: {
                    type: 'url',
                    label: "Link",
                    placeholder: "https://angelhub.com"
                  }
                }
              ]
            }}
          />

          <FieldArray
            name="attachments"
            component={DynamicFieldArray}
            opts={{
              label: "Can you share with us some more shining visuals to illustrate your teaser ? (optional)",
              hint: "A video or pictures showing your company, your team, your product, your vision, your story... all of them... that is your show. As long as it stays shorter than 1min and 30 seconds / 5 pictures",
              groupName: "File",
              newFieldInit: {
                title: '',
                file: ''
              },
              onDeleteField: dMSQAttributes,
              dynamicFields: [
                {
                  key: "title",
                  component: Select2Field,
                  opts: {
                    label: "Title",
                    options: this.props.attachmentOptions,
                    valueKey: "name",
                    nameKey: "name"
                  }
                },
                {
                  key: "file",
                  component: FileField,
                  opts: {
                    label: "File",
                    urlKey: "original"
                  }
                }
              ]
            }}
          />

          <button
            className={`btn btn-info btn-lg btn-block ${submitInProcess && "m-progress"}`}
            type="submit"
            disabled={submitInProcess || pristine}
          >
            Save
          </button>
        </form>
      </div>
    )
  }
}
