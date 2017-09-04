import React from 'react'

export default ({ initLoad, white, optClass }) => {
  const colour = white ? "white" : "dark"

  return (
    <div className={`shared-loading-spinner ${optClass}`}>
      <div className="animationload">
        <div className={`ahub-loading ${colour}`} />
      </div>
      {initLoad && <span>Please Wait</span>}
    </div>
  )
}
