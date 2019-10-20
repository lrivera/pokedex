import { combineReducers, applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'

import mySaga from '../sagas'

let sagaMiddleware = createSagaMiddleware();

const reducers = combineReducers({
  pokemon: require('./Pokemon').reducer,
})
let store:any = createStore(reducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(mySaga)

export {
  store
}
