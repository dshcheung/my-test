import React from 'react'

export default ({ initLoad, small, white }) => {
  const sizing = small ? "fa" : "fa-2x"
  const colour = white ? "white" : "dark"

  return (
    <div className="shared-loading-spinner">
      <i className={`fa fa-circle-o-notch spin ${sizing} ${colour}`} />
      {initLoad && <h4>Please Wait</h4>}
    </div>
  )
}
