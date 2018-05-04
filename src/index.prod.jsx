import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import configureStore from './store-config'
import currentRoutes from './routes'

import scrollTop from './services/utils'

require('../styles/index.scss')
require('./prototypes.js')

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

const render = (routes) => {
  return ReactDOM.render(
    <Provider store={store}>
      <Router
        onUpdate={scrollTop}
        history={history}
        routes={routes}
      />
    </Provider>,
    document.getElementById('root')
  )
}

render(currentRoutes)
