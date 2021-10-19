import React, { useMemo } from 'react'
import ProfileMainRoute from './ProfileMainRoute'
import { View } from 'react-native'
import { routes } from '../../config/routes'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import { globalStyles } from '../../config/styles'

export default function ProfileMainRouteSection() {
	const items = useMemo(() => {
		return [
			{
				icon: <FontAwesome5 name="gift" color="#727AF4" size={20} />,
				title: 'Rewards',
				navigateAddress: routes.rewards,
			},
			{
				icon: (
					<Ionicons
						name="wallet"
						size={20}
						color={globalStyles.Colors.primaryColor}
					/>
				),
				title: 'Wallets',
				navigateAddress: routes.profileWallet,
			},
			{
				icon: (
					<Ionicons
						name="shield-checkmark"
						size={20}
						color={globalStyles.Colors.failure}
					/>
				),
				title: 'Security',
				navigateAddress: routes.security,
			},
			{
				icon: (
					<Ionicons
						name="settings"
						size={20}
						color={globalStyles.Colors.success}
					/>
				),
				title: 'Settings',
				navigateAddress: routes.setting,
			},
			{
				icon: <Feather name="users" size={20} color="#1496F3" />,
				title: 'Support',
				navigateAddress: routes.support,
			},
		]
	}, [])

	return (
		<View>
			{items.map((item, index) => {
				return (
					<ProfileMainRoute
						title={item.title}
						icon={item.icon}
						key={index}
						navigateAddress={item.navigateAddress}
						isLast={index + 1 === items.length}
					/>
				)
			})}
		</View>
	)
}
