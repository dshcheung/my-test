import React, { Component } from 'react'

export default class SharedOthersStepProgress extends Component {
  constructor(props) {
    super(props)

    const { maxIndex } = props
    const dots = []
    const stepPercentage = 100 / maxIndex
    const stepLeft = 15 / maxIndex

    _.times(maxIndex + 1, (i) => {
      dots.push({
        left: `calc(${i * stepPercentage}% - ${i * stepLeft}px)`
      })
    })

    this.state = {
      dots
    }
  }

  render() {
    const { maxIndex, currentIndex } = this.props
    const { dots } = this.state
    const currentQuestionPercentage = (currentIndex === 0 ? 0 : (currentIndex / maxIndex) * 100)

    return (
      <div className="progress height-5">
        {
          dots.map((d, i) => {
            return (
              <div
                key={i}
                className="step-dot primary-color"
                style={d}
              />
            )
          })
        }
        <div
          className="progress-bar progress-bar-pink"
          style={{
            width: `${currentQuestionPercentage}%`
          }}
        />
      </div>
    )
  }
}
