import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { hotjar } from 'react-hotjar'
import { scrollTop } from './services/utils'

import configureStore from './setup/store-config'
import currentRoutes from './setup/routes'

require('../styles/index.scss')
require('./setup/prototypes.js')

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

const render = (routes) => {
  return ReactDOM.render(
    <Provider store={store}>
      <Router
        history={history}
        routes={routes}
      />
    </Provider>,
    document.getElementById('root')
  )
}

hotjar.initialize(982655, 6)

history.listen((location) => {
  scrollTop()
  window.gtag('create', { trackingId: 'UA-124005113-1', cookieDomain: 'auto' })
  window.gtag('set', 'page', location.pathname + location.search)
  window.gtag('send', 'pageview', location.pathname + location.search)
})

render(currentRoutes)
