import React from 'react'
import { View } from 'react-native'
import { globalStyles } from '../../../config/styles'

export default function MarketIcon({ size, color, children, style }) {
	return (
		<View
			style={{
				width: size,
				height: size,
				backgroundColor: color,
				borderRadius: 8,
				...globalStyles.flex.center,
				...style,
			}}
		>
			{children}
		</View>
	)
}
