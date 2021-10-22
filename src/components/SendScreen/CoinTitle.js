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
			<MarketIcon size={52} color={globalStyles.Colors.ethereum}>
				{icon === 'ethereum' ? (
					<MaterialCommunityIcons name={icon} size={25} color="#7037C9" />
				) : (
					<AppIcon name={icon} style={{ width: 25, height: 25 }} />
				)}
			</MarketIcon>
			<View style={{ marginVertical: 6 }}></View>
			{title ? (
				<AppText color="text2" typo="sm">
					{title}
				</AppText>
			) : null}
			{value ? (
				<AppText
					style={{ marginVertical: 6 }}
					bold
					typo="xl"
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
