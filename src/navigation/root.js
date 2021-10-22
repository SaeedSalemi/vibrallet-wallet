import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { AppStackNavigation } from './AppStack'
import { AuthStackNavigation } from './AuthStack'
import RNSplashScreen from 'react-native-splash-screen'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from 'react-native'
import { setAuthPass } from '../redux/modules/appSettings'
import { useAppState } from '../hooks/appState'
import WelcomeBack from '../screens/app/HomeStack/WelcomeBack'
import { navigationRef } from '../utils/navigation'
import HideKeyboard from '../utils/HideKeyboard'

export default function RootNavigation() {
	const { isLoggedIn, authPass, password, useTouchId } = useSelector(
		state => state.appSettings
	)
	const dispatch = useDispatch()

	const appState = useAppState()

	React.useEffect(() => {
		RNSplashScreen.hide()
	}, [])

	React.useEffect(() => {
		if (appState && password) {
			dispatch(setAuthPass(true))
		}
	}, [appState])

	const handleConfirmPass = () => {
		dispatch(setAuthPass(false))
	}

	return (
		<>
			<NavigationContainer ref={navigationRef}>
				{isLoggedIn ? <AppStackNavigation /> : <AuthStackNavigation />}
			</NavigationContainer>
			<Modal visible={authPass} onDismiss={() => null}>
				<WelcomeBack
					onUnlockPress={handleConfirmPass}
					password={password}
					useTouchId={useTouchId}
				/>
			</Modal>
		</>
	)
}
