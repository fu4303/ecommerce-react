import { combineReducers } from 'redux'

import userReduer from './User/user.reduer'

export default combineReducers({
	user: userReduer,
})
