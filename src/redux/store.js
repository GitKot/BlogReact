import {createStore, applyMiddleware} from 'redux'
import reducer from './reducer'
import logger from "redux-logger"
import thunk from 'redux-thunk'
import {routerMiddleware} from 'react-router-redux'
import history from '../history'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './saga'
import {runMigration} from '../mocks/index'

const sagaMiddleware = createSagaMiddleware()

const enhancer = applyMiddleware(sagaMiddleware, routerMiddleware(history), logger)

const store = createStore(reducer, enhancer)

window.store = store
window.runMigration = runMigration

sagaMiddleware.run(rootSaga)

export default store