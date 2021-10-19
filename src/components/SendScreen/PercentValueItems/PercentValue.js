import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { globalStyles } from '../../../config/styles'
import AppText from '../../common/AppText'

export default function PercentValue({ item, isActive, onPress }) {
	return (
		<TouchableOpacity
			style={{
				...globalStyles.flex.center,
				borderRadius: 9,
				backgroundColor: isActive
					? globalStyles.Colors.primaryColor
					: globalStyles.Colors.inputColor,
				height: 50,
				width: '24%',
			}}
			onPress={onPress}
		>
			<AppText bold typo="sm" color={isActive ? 'whiteColor' : 'text2'}>
				{item.value}
			</AppText>
		</TouchableOpacity>
	)
}
