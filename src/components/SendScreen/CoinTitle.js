import React from 'react'
import { View } from 'react-native'
import { globalStyles } from '../../config/styles'
import AppIcon from '../common/AppIcon'
import AppText from '../common/AppText'
import MarketIcon from '../common/MarketIcon/MarketIcon'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export default function CoinTitle({
	icon,
	title,
	value,
	amount,
	failureTitle,
}) {
	return (
		<View style={{ ...globalStyles.flex.center }}>
			<MarketIcon size={42} color={globalStyles.Colors.ethereum}>
				{icon === 'ethereum' ? (
					<MaterialCommunityIcons name={icon} size={24} color="#7037C9" />
				) : (
					<AppIcon name={icon} style={{ width: 24, height: 24 }} />
				)}
			</MarketIcon>
			<View style={{ marginVertical: 4 }}></View>
			{title ? (
				<AppText color="text2" typo="tiny">
					{title}
				</AppText>
			) : null}
			{value ? (
				<AppText
					style={{ marginVertical: 4 }}
					bold
					typo="sm"
					color={failureTitle ? 'failure' : 'text1'}
				>
					{value}
				</AppText>
			) : null}
			{amount ? (
				<AppText typo="tiny" color="text3">
					{amount}
				</AppText>
			) : null}
		</View>
	)
}
