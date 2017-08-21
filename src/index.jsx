import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import configureStore from './store-config'
import currentRoutes from './routes'

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

require('../styles/index.scss')

const render = (routes) => {
  return ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Router
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
