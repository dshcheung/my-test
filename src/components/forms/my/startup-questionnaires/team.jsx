import React, { Component } from 'react'
import { reduxForm, Field, FieldArray } from 'redux-form'

import Validators from '../../../../services/form-validators'

import TextArea from '../../../shared/form-elements/text-area'
import TextField from '../../../shared/form-elements/text-field'
import SelectField from '../../../shared/form-elements/select-field'
import FileField from '../../../shared/form-elements/file-field'
import CurrencyField from '../../../shared/form-elements/currency-field'
import DynamicFieldArray from '../../../shared/form-elements/dynamic-field-array'

@reduxForm({
  form: "MyStartupQuestionnairesTeamForm",
  validate: (values) => {
    return Validators({
      story: [{ type: "length", opts: { max: 600 } }],
      next_hires: [{ type: "length", opts: { max: 600 } }],
      startup_questionnaire_team_founders: [{
        type: "complexArrOfObj",
        opts: {
          selfPresences: false,
          childFields: {
            avatar: ["filePresences"],
            name: ["presences"],
            position: ["presences"],
            contract: ["presences"],
            salary: ["presences"],
            years_of_experience: ["presences", "noDecimal"],
            linked_in: ["presences", "httpLink"],
          }
        }
      }],
      startup_questionnaire_team_members: [{
        type: "complexArrOfObj",
        opts: {
          selfPresences: false,
          childFields: {
            avatar: ["filePresences"],
            name: ["presences"],
            position: ["presences"],
            contract: ["presences"]
          }
        }
      }],
      startup_questionnaire_team_advisors: [{
        type: "complexArrOfObj",
        opts: {
          selfPresences: false,
          childFields: {
            avatar: [],
            name: ["presences"],
            expertise: ["presences", { type: "length", opts: { max: 600 } }]
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
      "startup_questionnaire_team_founders",
      "startup_questionnaire_team_members",
      "startup_questionnaire_team_advisors",
      "attachments"
    ])
  },
  enableReinitialize: true
})

export default class MyStartupQuestionnairesTeamForm extends Component {
  render() {
    const { handleSubmit, submitInProcess, optClass, dMSQAttributes, pristine } = this.props

    return (
      <div className={optClass}>
        <form onSubmit={handleSubmit}>
          <Field
            name="story"
            component={TextArea}
            opts={{
              label: "1. Team story",
              hint: "When did you meet ? What have you done together ? what is the alchemy you experienced ? Why are you the best team to conduct your mission ? Be reflective and personal "
            }}
          />

          <FieldArray
            name="startup_questionnaire_team_founders"
            component={DynamicFieldArray}
            opts={{
              label: "2. Co-founders and Officers",
              groupName: "Founder/Officer",
              newFieldInit: {
                avatar: '',
                name: '',
                position: '',
                contract: '',
                salary: { currency: '' },
                years_of_experience: '',
                linked_in: ''
              },
              onDeleteField: dMSQAttributes,
              dynamicFields: [
                {
                  key: "avatar",
                  component: FileField,
                  opts: {
                    label: "Avatar",
                    optClass: "image-field-avatar",
                    urlKey: "original"
                  }
                },
                {
                  key: "name",
                  component: TextField,
                  opts: {
                    label: "Name"
                  }
                },
                {
                  key: "position",
                  component: TextField,
                  opts: {
                    label: "Position"
                  }
                },
                {
                  key: "contract",
                  component: SelectField,
                  opts: {
                    options: [
                      { key: "full_time", name: "Full-Time" },
                      { key: "part_time", name: "Part-Time" }
                    ],
                    placeholder: "Contract Type",
                    label: "Contract Type",
                    valueField: "key",
                    textField: "name",
                  }
                },
                {
                  key: "salary",
                  component: CurrencyField,
                  opts: {
                    type: "Number",
                    label: "Salary"
                  }
                },
                {
                  key: "years_of_experience",
                  component: TextField,
                  opts: {
                    type: "Number",
                    label: "Years of Experience"
                  }
                },
                {
                  key: "linked_in",
                  component: TextField,
                  opts: {
                    label: "Linkedin",
                    placeholder: "https://www.linkedin.com/in/example-person"
                  }
                }
              ]
            }}
          />

          <FieldArray
            name="startup_questionnaire_team_members"
            component={DynamicFieldArray}
            opts={{
              label: "3. Team Members (optional)",
              groupName: "Members",
              newFieldInit: {
                avatar: '',
                name: '',
                position: '',
                contract: ''
              },
              onDeleteField: dMSQAttributes,
              dynamicFields: [
                {
                  key: "avatar",
                  component: FileField,
                  opts: {
                    label: "Avatar",
                    optClass: "image-field-avatar",
                    urlKey: "original"
                  }
                },
                {
                  key: "name",
                  component: TextField,
                  opts: {
                    label: "Name"
                  }
                },
                {
                  key: "position",
                  component: TextField,
                  opts: {
                    label: "Position"
                  }
                },
                {
                  key: "contract",
                  component: SelectField,
                  opts: {
                    options: [
                      { key: "full_time", name: "Full-Time" },
                      { key: "part_time", name: "Part-Time" }
                    ],
                    label: "Contract Type",
                    placeholder: "Contract Type",
                    valueField: "key",
                    textField: "name",
                  }
                }
              ]
            }}
          />

          <FieldArray
            name="startup_questionnaire_team_advisors"
            component={DynamicFieldArray}
            opts={{
              label: "4. Notable Advisors & Investors (optional)",
              groupName: "Advisors/Investors",
              newFieldInit: {
                avatar: '',
                name: '',
                expertise: ''
              },
              onDeleteField: dMSQAttributes,
              dynamicFields: [
                {
                  key: "avatar",
                  component: FileField,
                  opts: {
                    label: "Avatar (optional)",
                    optClass: "image-field-avatar",
                    urlKey: "original"
                  }
                },
                {
                  key: "name",
                  component: TextField,
                  opts: {
                    label: "Name"
                  }
                },
                {
                  key: "expertise",
                  component: TextArea,
                  opts: {
                    label: "Expertise"
                  }
                }
              ]
            }}
          />

          <FieldArray
            name="attachments"
            component={DynamicFieldArray}
            opts={{
              label: "5. You have a some pictures to share about your team story (optional)",
              hint: "Upload your document - a picture says more than a thousand words",
              groupName: "File",
              newFieldInit: {
                title: '',
                file: '',
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
