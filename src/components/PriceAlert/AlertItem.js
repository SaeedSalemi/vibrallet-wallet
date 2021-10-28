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


	console.log('alert item', item.icon)

	return (
		<TouchableOpacity
			activeOpacity={0.75}
			onPress={() => navigate(routes.newCoinAlert, { coin: item })}
		>
			<View
				style={{
					marginVertical: 16,
					flexDirection: 'row',
					alignItems: 'center',
				}}
			>
				{/* <AppIcon name={item.icon} /> */}
				{item.icon}
				<View style={{ flex: 1, paddingHorizontal: 12 }}>
					<AppText bold typo="md">
						{item.title}
					</AppText>
					<AppText typo="tiny" color="text3">
						{item.slug}
					</AppText>
				</View>
				<AppText typo="md" bold>
					{item.price}
					{/* {item.lastPrice} */}
				</AppText>
			</View>
			{index + 1 === length ? null : <HR style={{ marginVertical: 4 }} />}
		</TouchableOpacity>
	)
}
