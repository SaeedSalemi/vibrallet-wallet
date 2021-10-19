import { takeEvery, put } from 'redux-saga/effects'
import { routes } from '../../config/routes'
import { navigate, reset } from '../../utils/navigation'
import { resetWallets } from './wallets'

export const SET_LOGGED_IN = 'SET_LOGGED_IN'
export const setLoggedIn = (isLoggedIn, navigateToWallet) => ({
	type: SET_LOGGED_IN,
	isLoggedIn,
	navigateToWallet,
})

export const SET_PASSWORD = 'SET_PASSWORD'
export const setPassword = password => ({
	type: SET_PASSWORD,
	password,
})
export const SET_MODAL = 'SET_MODAL'
export const setModal = showModal => ({
	type: SET_MODAL,
	showModal,
})
export const SET_AUTH_PASS = 'SET_AUTH_PASS'
export const setAuthPass = show => ({
	type: SET_AUTH_PASS,
	show,
})

export const SET_USE_TOUCH_ID = 'SET_USE_TOUCH_ID'
export const setUseTouchId = useTouchId => ({
	type: SET_USE_TOUCH_ID,
	useTouchId,
})

export const NAVIGATE_TO_WALLET = 'NAVIGATE_TO_WALLET'
export const navigateToWallet = bool => ({
	type: NAVIGATE_TO_WALLET,
	bool,
})

const initialState = {
	isLoggedIn: null,
	useTouchId: true,
	password: null,
	authPass: false,
	showModal: false,
}

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case SET_MODAL:
			return {
				...state,
				showModal: action.showModal,
			}
		case SET_LOGGED_IN:
			return {
				...state,
				isLoggedIn: action.isLoggedIn,
				navigateToWallet: !!action.navigateToWallet,
			}
		case SET_PASSWORD:
			return {
				...state,
				password: action.password,
			}
		case SET_AUTH_PASS:
			return {
				...state,
				authPass: action.show,
			}
		case SET_USE_TOUCH_ID:
			return {
				...state,
				useTouchId: action.useTouchId,
			}
		case NAVIGATE_TO_WALLET:
			return {
				...state,
				navigateToWallet: !!action.bool,
			}
		default:
			return state
	}
}

export function* watchSetLoggedIn({ isLoggedIn, navigateToWallet }) {
	if (!isLoggedIn) {
		yield put(setPassword(null))
		yield put(resetWallets())
	}
	if (navigateToWallet) {
		// yield navigate(routes.profileWallet)
		// yield reset({
		// 	index: 1,
		// 	routes: [{ name: routes.appTab }, { name: routes.profileWallet }],
		// })
	}
}

export function* watchAppSettingSagas() {
	yield takeEvery(SET_LOGGED_IN, watchSetLoggedIn)
}
