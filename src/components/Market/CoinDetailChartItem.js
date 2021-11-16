import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { globalStyles } from '../../config/styles'
import AppText from '../common/AppText'

export default function CoinDetailChartItem({ title, active, onSelectChange }) {
	return (
		<TouchableOpacity
			style={{
				width: 51,
				height: 37,
				borderRadius: 10,
				...globalStyles.flex.center,
				backgroundColor: active
					? globalStyles.Colors.primaryColor
					: globalStyles.Colors.inputColor,
			}}
			onPress={() => onSelectChange(title)}
		>
			<AppText typo="xs" color={active ?? 'text2'} bold>
				{title}
			</AppText>
		</TouchableOpacity>
	)
}
