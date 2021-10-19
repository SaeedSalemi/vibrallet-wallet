import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { routes } from '../../config/routes'
import AppIcon from '../common/AppIcon'
import AppText from '../common/AppText'
import HR from '../common/HR/HR'

export default function AlertItem({ item, index, length }) {
	const { navigate } = useNavigation()

	return (
		<TouchableOpacity
			activeOpacity={0.75}
			onPress={() => navigate(routes.newCoinAlert)}
		>
			<View
				style={{
					marginVertical: 16,
					flexDirection: 'row',
					alignItems: 'center',
				}}
			>
				<AppIcon name={item.icon} />
				<View style={{ flex: 1, paddingHorizontal: 12 }}>
					<AppText bold typo="md">
						{item.title}
					</AppText>
					<AppText typo="tiny" color="text3">
						{item.slug}
					</AppText>
				</View>
				<AppText typo="md" bold>
					{item.currency}
					{item.price}
				</AppText>
			</View>
			{index + 1 === length ? null : <HR style={{ marginVertical: 4 }} />}
		</TouchableOpacity>
	)
}
