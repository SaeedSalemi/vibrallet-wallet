import React from 'react'
import AppButton from '../../../components/common/AppButton'
import Screen from '../../../components/Screen'
import { setUser } from '../../../utils/storage'
import { View } from 'react-native'
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

export default function ProfileScreen() {
	const dispatch = useDispatch()

	const handleLogout = () => {
		setUser(null)
		dispatch(setLoggedIn(false))
	}

	return (
		<Screen gap>
			<Header route={routes.profile} />
			<ScrollView>
				<ProfileInfo />
				<View style={{ marginVertical: 8 }}>
					<ProfileDetailsSection />
				</View>
				<View style={{ marginVertical: 24 }}>
					<UserCoins />
				</View>
				<ProfileMainRouteSection />
				<View style={{ paddingHorizontal: 24 }}>
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
