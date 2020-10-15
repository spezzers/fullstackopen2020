import { createStore, combineReducers, applyMiddleware } from 'redux'
import userReducer from './reducers/userReducer'
import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

const reducer = combineReducers({
	user: userReducer,
	blogs: blogReducer,
	message: notificationReducer
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store
