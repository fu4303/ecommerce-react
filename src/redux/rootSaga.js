import { all, call } from 'redux-saga/effects'

import userSagas from './User/user.Sagas'

export default function* rootSaga() {
	yield all([call(userSagas)])
}
