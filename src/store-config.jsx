import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { browserHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux'
import promiseMiddleware from './promise-middleware'

import rootReducer from './reducers/index'

const router = routerMiddleware(browserHistory)
const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, thunk, router)(createStore)

export default function configureStore() {
  const store = createStoreWithMiddleware(
    rootReducer,
    window.devToolsExtension && window.devToolsExtension()
  )

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      /* eslint-disable global-require */
      const nextRootReducer = require('./reducers/index').default
      /* eslint-enable global-require */
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
