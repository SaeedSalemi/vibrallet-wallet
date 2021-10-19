import { createNavigationContainerRef } from '@react-navigation/native'
import { CommonActions } from '@react-navigation/core'

export const navigationRef = createNavigationContainerRef()

export function navigate(name, params) {
	if (navigationRef.isReady()) {
		navigationRef.navigate(name, params)
	}
}

export function reset(resetAction) {
	if (navigationRef.isReady()) {
		navigationRef.dispatch(CommonActions.reset(resetAction))
	}
}
