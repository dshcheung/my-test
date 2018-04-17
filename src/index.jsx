import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
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
    <AppContainer>
      <Provider store={store}>
        <Router
          onUpdate={scrollTop}
          history={history}
          routes={routes}
        />
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  )
}

render(currentRoutes)

if (module.hot) {
  module.hot.accept('./routes', () => {
    /* eslint-disable global-require */
    const nextRoutes = require('./routes').default
    /* eslint-enable global-require */
    render(nextRoutes)
  })
}
