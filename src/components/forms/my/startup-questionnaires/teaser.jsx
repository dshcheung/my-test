import React, { Component } from 'react'
import { reduxForm, Field, FieldArray } from 'redux-form'

import Validators from '../../../../services/form-validators'

import TextField from '../../../shared/form-elements/text-field'
import TextArea from '../../../shared/form-elements/text-area'
import DateTimePicker from '../../../shared/form-elements/datetime-picker'
import DynamicFieldArray from '../../../shared/form-elements/dynamic-field-array'
import SelectField from '../../../shared/form-elements/select-field'
import FileField from '../../../shared/form-elements/file-field'

@reduxForm({
  form: "MyStartupQuestionnairesTeaserForm",
  validate: (values) => {
    return Validators({
      problem: [{ type: "lengthWord", opts: { max: 100 } }],
      solution: [{ type: "lengthWord", opts: { max: 100 } }],
      make_money: [{ type: "lengthWord", opts: { max: 100 } }],
      solution_benchmark: [{ type: "lengthWord", opts: { max: 200 } }],
      startup_questionnaire_highlights: [{
        type: "complexArrOfObj",
        opts: {
          selfPresences: false,
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
    }, values, [
      "startup_questionnaire_highlights",
      "startup_questionnaire_media",
      "attachments"
    ])
  },
  enableReinitialize: true
})

export default class MyStartupQuestionnairesTeaserForm extends Component {
  render() {
    const { handleSubmit, submitInProcess, optClass, dMSQAttributes, pristine } = this.props

    return (
      <div className={optClass}>
        <form onSubmit={handleSubmit}>
          <div className="margin-bottom-20">
            <i>Your answers below will be used to create a teaser for the investor and catch his interest. You will have space for details in the following sections of this questionnaire</i>
          </div>

          <Field
            name="problem"
            component={TextArea}
            opts={{
              label: "1. Problem",
              hint: "Max 100 Words"
            }}
          />

          <Field
            name="solution"
            component={TextArea}
            opts={{
              label: "2. Solution",
              hint: "Max 100 Words"
            }}
          />

          <Field
            name="make_money"
            component={TextArea}
            opts={{
              label: "3. What is your revenue model?",
              hint: "Max 100 Words. It identifies which revenue source to pursue, how to price the value, and who pays for the value. It is a key component of a company's business model. ex: Advertising, Freemium model, Subscription model, Licensing, Selling data etc..."
            }}
          />

          <Field
            name="solution_benchmark"
            component={TextArea}
            opts={{
              label: "4. What is your Unique Selling Point USP",
              hint: "Max 200 Words. Define your company's unique position in the marketplace. A strong USP clearly articulates a specific benefit - one that other competitors don't offer - that makes you stand out."
            }}
          />

          <Field
            name="pitch_deck"
            component={FileField}
            opts={{
              label: "5. Pitch Deck",
              urlKey: "original",
              hint: "Upload your pitch deck"
            }}
          />

          <Field
            name="business_model"
            component={FileField}
            opts={{
              label: "6. Business Plan (optional)",
              hint: "Upload your business plan",
              urlKey: "original"
            }}
          />

          <FieldArray
            name="startup_questionnaire_highlights"
            component={DynamicFieldArray}
            opts={{
              label: "7. Top 5 highlighs / achievements",
              groupName: "Highlight",
              newFieldInit: {
                occurred_on: '',
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
                    format: "YYYY/MM",
                    views: ["year", "decade"]
                  }
                },
                {
                  key: "title",
                  component: TextField,
                  opts: {
                    label: "Title",
                    hint: "Max 4 Words"
                  }
                },
                {
                  key: "content",
                  component: TextArea,
                  opts: {
                    label: "Content",
                    hint: "Max 20 Words"
                  }
                }
              ]
            }}
          />

          <FieldArray
            name="startup_questionnaire_media"
            component={DynamicFieldArray}
            opts={{
              label: "8. Media (optional)",
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
                  component: FileField,
                  opts: {
                    label: "Add Image for Thumbnail",
                    urlKey: "original"
                  }
                },
                {
                  key: "link",
                  component: TextField,
                  opts: {
                    type: 'url',
                    label: "Link",
                    placeholder: "https://website.com"
                  }
                }
              ]
            }}
          />

          <FieldArray
            name="attachments"
            component={DynamicFieldArray}
            opts={{
              label: "9. Can you share with us some more shining visuals to illustrate your teaser? (optional)",
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
                  component: SelectField,
                  opts: {
                    label: "Title",
                    options: this.props.attachmentOptions,
                    valueField: "name",
                    textField: "name",
                    filter: true,
                    allowCreate: true
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
            className={`btn btn-danger pull-right ${submitInProcess && "m-progress"}`}
            type="submit"
            disabled={submitInProcess || pristine}
          >CONTINUE</button>
        </form>
      </div>
    )
  }
}
