import React, { useMemo } from 'react'
import { View } from 'react-native'
import ProfileMenu from '../../../components/Profile/ProfileMenu'
import { routes } from '../../../config/routes'
import { globalStyles } from '../../../config/styles'
import Fontisto from 'react-native-vector-icons/Fontisto'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { useDispatch, useSelector } from 'react-redux'
import { setUseTouchId } from '../../../redux/modules/appSettings'

export default function SecurityScreen() {
	const { password, useTouchId } = useSelector(state => state.appSettings)
	const dispatch = useDispatch()

	const handleToggleTouchId = () => {
		dispatch(setUseTouchId(!useTouchId))
	}
	const hasPassword = !!password

	const data = [
		{
			title: 'BackUp',
			detail:
				'Your secret 12-word recovery phrase is the ONLY way to recover your funds if you loose access to wallet.',
			route: routes.profile,
			icon: <FontAwesome5 name="file-upload" size={25} color="#1496F3" />,
		},
		{
			title: 'Password Protection',
			detail: 'We recommend you to choose a password for security reasons',
			icon: (
				<Fontisto
					name="locked"
					size={20}
					color={globalStyles.Colors.primaryColor}
				/>
			),
			route: hasPassword ? routes.changePassword : routes.newPassword,
		},
		{
			title: 'Secure With Fingerprint',
			detail: 'Use fingerprint authentication for logging to Binrex Wallet',
			icon: (
				<View
					style={{
						width: 20,
						height: 20,
						backgroundColor: globalStyles.Colors.failure,
						borderRadius: 5,
						...globalStyles.flex.center,
					}}
				>
					<FontAwesome5
						name="fingerprint"
						size={15}
						color={globalStyles.Colors.text1}
					/>
				</View>
			),
			appSwitch: { value: useTouchId, onPress: handleToggleTouchId },
		},
		{
			title: 'Restore',
			detail: 'Overwrite your current Binrex wallet using a secret phrase',
			icon: (
				<FontAwesome5
					name="file-download"
					size={20}
					color={globalStyles.Colors.success}
				/>
			),
			route: routes.profile,
		},
	]

	return (
		<View style={{ ...globalStyles.screen }}>
			<ProfileMenu data={data} />
		</View>
	)
}
