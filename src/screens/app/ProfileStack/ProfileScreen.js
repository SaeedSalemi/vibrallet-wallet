import React, { useState, useEffect } from 'react'
import AppButton from '../../../components/common/AppButton'
import Screen from '../../../components/Screen'
// import { setUser } from '../../../utils/storage'
import { BackHandler, View } from 'react-native'
import ProfileInfo from '../../../components/Profile/ProfileInfo'
import ProfileDetailsSection from '../../../components/Profile/ProfileDetailsSection'
import UserCoins from '../../../components/Profile/UserCoins'
import { ScrollView } from 'react-native'
import ProfileMainRouteSection from '../../../components/Profile/ProfileMainRouteSection'
import { globalStyles } from '../../../config/styles'
import Header from '../../../components/Header/Header'
import { routes } from '../../../config/routes'
import { gettingBackup } from '../../../utils/Functions'
import { showMessage } from 'react-native-flash-message'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch } from 'react-redux'
import { setLoggedIn } from '../../../redux/modules/appSettings'
import { useNavigation } from '@react-navigation/native'
import { navigate, reset } from '../../../utils/navigation'



export default function ProfileScreen({ navigation }) {
	const dispatch = useDispatch()
	const [isLoggingOut, setIsLoggingOut] = useState(false)
	// const { navigate } = useNavigation()

	const getStoredMnemonic = async () => {
		const persist = await AsyncStorage.getItem('persist:root')
		if (persist !== null) {
			let item = JSON.parse(persist)
			if (item !== null) {
				let wallets = JSON.parse(item["wallets"])
				return wallets.data ? wallets.data[0] : null
			}
		}
	}

	const handleLogout = async () => {
		setIsLoggingOut(true)
		const { backup: _mnemonic } = await getStoredMnemonic()
		gettingBackup(_mnemonic)
		dispatch(setLoggedIn(false))
		await AsyncStorage.clear()
		showMessage({
			message: 'Your are logged out.',
			description: null,
			type: 'danger',
			icon: null,
			duration: 3000,
			style: { backgroundColor: "#16a085" },
			position: 'top'
		})
		setIsLoggingOut(false)
		navigate(routes.welcome)
	}

	return (
		<Screen gap>
			<Header route={routes.profile} />
			<ScrollView>
				<ProfileInfo />
				<View style={{ marginVertical: 8 }}>
					<ProfileDetailsSection />
				</View>
				<View style={{ marginVertical: 8 }}>
					<UserCoins />
				</View>
				<ProfileMainRouteSection />
				<View style={{ paddingHorizontal: 16 }}>
					<AppButton
						loading={isLoggingOut}
						typo="xs"
						title="Backup and Log Out"
						textStyle={{ color: globalStyles.Colors.failure }}
						customStyle={{
							backgroundColor: globalStyles.Colors.bckColor,
							borderWidth: 1,
							borderColor: globalStyles.Colors.inputColor,
						}}
						onPress={handleLogout}
					/>
				</View>
			</ScrollView>
		</Screen>
	)
}
