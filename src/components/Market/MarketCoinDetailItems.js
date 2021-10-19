import React from 'react'
import { View } from 'react-native'
import { globalStyles } from '../../config/styles'
import AppText from '../common/AppText'

export default function MarketCoinDetailItems({ items }) {
	return (
		<View
			style={{
				paddingHorizontal: 26,
				backgroundColor: items.bgColor,
				...globalStyles.flex.center,
				borderRadius: 8,
				marginVertical: 4,
			}}
		>
			<AppText color={items.color}>{items.value}</AppText>
			<AppText color="text2">{items.duration}</AppText>
		</View>
	)
}
