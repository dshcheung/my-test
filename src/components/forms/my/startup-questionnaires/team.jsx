import React, { Component } from 'react'
import { reduxForm, Field, FieldArray } from 'redux-form'

import Validators from '../../../../services/form-validators'

import TextArea from '../../../shared/form-elements/text-area'
import TextField from '../../../shared/form-elements/text-field'
import ImageField from '../../../shared/form-elements/image-field'
import SelectField from '../../../shared/form-elements/select-field'
import Select2Field from '../../../shared/form-elements/select2-field'
import FileField from '../../../shared/form-elements/file-field'
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
          selfPresences: true,
          childFields: {
            avatar: ["filePresences"],
            name: ["presences"],
            position: ["presences"],
            contract: ["presences"],
            salary: ["presences"],
            years_of_experience: ["presences", "noDecimal"],
            linked_in: ["presences"],
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
              label: "Your Team Story *",
              hint: "Feel free to upload in the Extra files section below any detailed slide/story you want to show us."
            }}
          />

          <Field
            name="next_hires"
            component={TextArea}
            opts={{
              label: "Is your team complete ? What would be your next hires ? *",
              hint: "Imagine you can make 2 wishes for free concerning your dream team,... ok,ok let us stick to the legend : make it 3 ! what / who would you like to add to your team ?"
            }}
          />

          <FieldArray
            name="startup_questionnaire_team_founders"
            component={DynamicFieldArray}
            opts={{
              label: "Co-founders and Officers",
              groupName: "Founder/Officer",
              newFieldInit: {
                avatar: '',
                name: '',
                position: '',
                contract: '',
                salary: '',
                years_of_experience: '',
                linked_in: ''
              },
              onDeleteField: dMSQAttributes,
              dynamicFields: [
                {
                  key: "avatar",
                  component: ImageField,
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
                    placeholder: "Name"
                  }
                },
                {
                  key: "position",
                  component: TextField,
                  opts: {
                    placeholder: "Position"
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
                    valueKey: "key",
                    nameKey: "name",
                  }
                },
                {
                  key: "salary",
                  component: TextField,
                  opts: {
                    type: "Number",
                    placeholder: "Salary"
                  }
                },
                {
                  key: "years_of_experience",
                  component: TextField,
                  opts: {
                    type: "Number",
                    placeholder: "Years of Experience"
                  }
                },
                {
                  key: "linked_in",
                  component: TextField,
                  opts: {
                    placeholder: "Linkedin"
                  }
                }
              ]
            }}
          />

          <FieldArray
            name="startup_questionnaire_team_members"
            component={DynamicFieldArray}
            opts={{
              label: "Team Members",
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
                  component: ImageField,
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
                    placeholder: "Name"
                  }
                },
                {
                  key: "position",
                  component: TextField,
                  opts: {
                    placeholder: "Position"
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
                    valueKey: "key",
                    nameKey: "name",
                  }
                }
              ]
            }}
          />

          <FieldArray
            name="startup_questionnaire_team_advisors"
            component={DynamicFieldArray}
            opts={{
              label: "Notable Advisors & Investors",
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
                  component: ImageField,
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
                    placeholder: "Name"
                  }
                },
                {
                  key: "expertise",
                  component: TextArea,
                  opts: {
                    placeholder: "Expertise"
                  }
                }
              ]
            }}
          />

          <FieldArray
            name="attachments"
            component={DynamicFieldArray}
            opts={{
              label: "Extra Files (Optional)",
              groupName: "File",
              newFieldInit: {
                title: '',
                file: '',
                file_url: ''
              },
              onDeleteField: dMSQAttributes,
              dynamicFields: [
                {
                  key: "title",
                  component: Select2Field,
                  opts: {
                    options: this.props.attachmentOptions,
                    valueKey: "name",
                    nameKey: "name",
                    placeholder: "Title"
                  }
                },
                {
                  key: "file",
                  component: FileField,
                  opts: {
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
