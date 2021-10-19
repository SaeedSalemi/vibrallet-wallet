import { all } from 'redux-saga/effects'
import { watchAppSettingSagas } from './modules/appSettings'
import { watchWalletsSagas } from './modules/wallets'

export default function* rootSaga() {
	yield all([watchAppSettingSagas(), watchWalletsSagas()])
}
