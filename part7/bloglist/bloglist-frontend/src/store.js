import { createStore, combineReducers, applyMiddleware } from 'redux'
import loggedInUserReducer from './reducers/loggedInUserReducer'
import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'
import usersReducer from './reducers/usersReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

const reducer = combineReducers({
	loggedInUser: loggedInUserReducer,
	users: usersReducer,
	blogs: blogReducer,
	message: notificationReducer
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store
