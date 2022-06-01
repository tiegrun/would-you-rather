import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import Reducer from '../Reducers/index.js'

export const store = createStore(Reducer, applyMiddleware(thunk))