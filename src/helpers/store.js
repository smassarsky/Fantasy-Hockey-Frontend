import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import rootReducer from '../reducers/rootReducer'

console.log(createStore, applyMiddleware)

export const store = createStore(rootReducer, applyMiddleware(thunk))