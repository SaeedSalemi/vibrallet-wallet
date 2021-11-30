import React, { useState, useEffect } from 'react'
import AppButton from '../../../components/common/AppButton'
import Screen from '../../../components/Screen'
import { setUser } from '../../../utils/storage'
import { BackHandler, View } from 'react-native'
import ProfileInfo from '../../../components/Profile/ProfileInfo'
import ProfileDetailsSection from '../../../components/Profile/ProfileDetailsSection'
import UserCoins from '../../../components/Profile/UserCoins'
import { ScrollView } from 'react-native'
import ProfileMainRouteSection from '../../../components/Profile/ProfileMainRouteSection'
import { globalStyles } from '../../../config/styles'
import Header from '../../../components/Header/Header'
import { routes } from '../../../config/routes'
import { useDispatch } from 'react-redux'
import { setLoggedIn } from '../../../redux/modules/appSettings'
import RNFS from 'react-native-fs'
import { encrypt } from '../../../utils/Functions'
import { showMessage } from 'react-native-flash-message'
import AsyncStorage from '@react-native-async-storage/async-storage'
import walletManager from '../../../blockchains/walletManager'
export default function ProfileScreen() {
	const dispatch = useDispatch()
	const [backup, setBackup] = useState('')

	useEffect(() => {
		const words = walletManager.generateMnemonic()
		setBackup(words)
	}, [])

	const handleLogout = async () => {

		const path = RNFS.DownloadDirectoryPath + `/vibranium-backup-${new Date().getTime()}.json`;
		RNFS.writeFile(path, JSON.stringify(encrypt(backup)), 'utf8')
			.then((success) => {
				showMessage({
					message: 'Your wallet backup has been created in your downloads',
					description: null,
					type: 'success',
					icon: null,
					duration: 3000,
					style: { backgroundColor: "#16a085" },
					position: 'top'
				})
				AsyncStorage.clear().then(() => {
					showMessage({
						message: 'Your are logged out.',
						description: null,
						type: 'danger',
						icon: null,
						duration: 3000,
						style: { backgroundColor: "#16a085" },
						position: 'top'
					})

				}).catch(err => {
					console.log('removing for the app', err.message);
				})
				// setUser(null)
				// dispatch(setLoggedIn(false))
				BackHandler.exitApp()


			})
			.catch((err) => {
				console.log(err.message);
			});

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
