import { combineReducers } from 'redux';
import employees from './employees';

const appReducer = combineReducers({
	employees
})

const rootReducer = (state, action) => {
	return appReducer(state, action)
}

export default rootReducer