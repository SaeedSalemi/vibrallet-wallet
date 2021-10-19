import { delay, put, select, take, takeEvery } from '@redux-saga/core/effects'
import { routes } from '../../config/routes'
import { navigate, reset } from '../../utils/navigation'
import { setLoggedIn, SET_LOGGED_IN } from './appSettings'

export const ADD_WALLET = 'ADD_WALLET'
export const addWallet = wallet => ({
	type: ADD_WALLET,
	wallet,
})

export const INIT_CREATE_WALLET = 'INIT_CREATE_WALLET'
export const initCreateWallet = name => ({
	type: INIT_CREATE_WALLET,
	name,
})

export const SET_CREATE_PINCODE = 'SET_CREATE_PINCODE'
export const setCreatePincode = pincode => ({
	type: SET_CREATE_PINCODE,
	pincode,
})

export const SET_CREATE_BACKUP = 'SET_CREATE_BACKUP'
export const setCreateBackup = backup => ({
	type: SET_CREATE_BACKUP,
	backup,
})

export const FINAL_CREATE_WALLET = 'FINAL_CREATE_WALLET'
export const finalCreateWallet = () => ({
	type: FINAL_CREATE_WALLET,
})

export const RESET_WALLETS = 'RESET_WALLETS'
export const resetWallets = () => ({
	type: RESET_WALLETS,
})

const initialState = {
	data: null,
	create: null,
}

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case ADD_WALLET:
			return {
				...state,
				data: [...(state.data || []), action.wallet],
			}
		case INIT_CREATE_WALLET:
			return {
				...state,
				create: {
					name: action.name,
				},
			}
		case SET_CREATE_PINCODE:
			return {
				...state,
				create: {
					...state.create,
					pincode: action.pincode,
				},
			}
		case SET_CREATE_PINCODE:
			return {
				...state,
				create: {
					...state.create,
					backup: action.backup,
				},
			}
		case RESET_WALLETS:
			return initialState
		default:
			return state
	}
}

export function* watchFinalCreateWallet() {
	const wallet = yield select(state => state.wallets.create)
	yield put(addWallet(wallet))
	yield reset({
		index: 1,
		routes: [{ name: routes.appTab }, { name: routes.profileWallet }],
	})
}

export function* watchWalletsSagas() {
	yield takeEvery(FINAL_CREATE_WALLET, watchFinalCreateWallet)
}
