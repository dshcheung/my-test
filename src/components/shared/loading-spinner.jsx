import React from 'react'

// TODO: change on submit button loading style for forms
export default ({ optClass, absolute }) => {
  const absoluteClass = absolute ? "absolute" : ""

  return (
    <div className={`shared-loading-spinner ${optClass} ${absoluteClass}`}>
      <div className="ahub-loading" />
    </div>
  )
}
