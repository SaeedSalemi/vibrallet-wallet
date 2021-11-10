import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { routes } from '../../config/routes'
import { globalStyles } from '../../config/styles'
import AppIcon from '../common/AppIcon'
import AppText from '../common/AppText'
import HR from '../common/HR/HR'
import MarketIcon from '../common/MarketIcon/MarketIcon'

export default function AlertItem({ item, index, length }) {
	const { navigate } = useNavigation()
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
				<MarketIcon size={50} color={globalStyles.Colors.inputColor2}>
					{item.icon}
				</MarketIcon>
				<View style={{ flex: 1, paddingHorizontal: 12 }}>
					<AppText bold typo="sm">
						{item.title}
					</AppText>
					<AppText typo="dot" color="text3">
						{item.slug}
					</AppText>
				</View>
				<AppText typo="sm" bold>
					{item.price}
					{/* {item.lastPrice} */}
				</AppText>
			</View>
			{index + 1 === length ? null : <HR style={{ marginVertical: 4 }} />}
		</TouchableOpacity>
	)
}
