import React from 'react'

export default ({ optClass, absolute }) => {
  const absoluteClass = absolute ? "absolute" : ""

  return (
    <div className={`shared-others-loading-spinner ${optClass} ${absoluteClass}`}>
      <div className="ahub-loading" />
    </div>
  )
}
