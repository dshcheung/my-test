import React from 'react'

export default ({ optClass, absolute }) => {
  const absoluteClass = absolute ? "absolute" : ""

  return (
    <div className={`shared-others-loading-spinner ${optClass} ${absoluteClass}`}>
      <div className="title text-center margin-bottom-25">SFC Licensed Investment Platform</div>
      <div className="ahub-loading" />
    </div>
  )
}
