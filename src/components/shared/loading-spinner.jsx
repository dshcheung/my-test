import React from 'react'

export default ({ initLoad, small, white, optClass }) => {
  const sizing = small ? "fa" : "fa-2x"
  const colour = white ? "white" : "dark"

  return (
    <div className={`shared-loading-spinner ${optClass}`}>
      <i className={`fa fa-circle-o-notch fa-spin ${sizing} ${colour}`} />
      {initLoad && <h4>Please Wait</h4>}
    </div>
  )
}
