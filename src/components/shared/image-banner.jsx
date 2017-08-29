import React, { Component } from 'react'

export default class ImageBanner extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loaded: false
    }
  }

  componentDidMount() {
    const img = document.createElement('img')

    img.onload = () => {
      this.setState({
        loaded: true
      })
    }

    img.src = this.props.src
  }

  render() {
    const { contain, optClass, src } = this.props

    const loadedClass = this.state.loaded && (optClass || "")
    const backgroundSizeClass = contain ? "contain" : "cover"
    const compClass = `${loadedClass} ${backgroundSizeClass}`

    const style = { backgroundImage: `url(${src})` }

    return (
      <div
        id="comp-image-banner"
        className={compClass}
        style={style}
      />
    )
  }
}
