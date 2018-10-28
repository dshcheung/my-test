import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { scrollTop } from './services/utils'

import configureStore from './setup/store-config'
import currentRoutes from './setup/routes'

require('../styles/index.scss')
require('./setup/prototypes.js')

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

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

history.listen(() => {
  scrollTop()
})

render(currentRoutes)

if (module.hot) {
  module.hot.accept('./setup/routes', () => {
    /* eslint-disable global-require */
    const nextRoutes = require('./setup/routes').default
    /* eslint-enable global-require */
    render(nextRoutes)
  })
}
