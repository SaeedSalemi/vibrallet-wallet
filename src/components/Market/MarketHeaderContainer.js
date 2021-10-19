import React from 'react'
import { View } from 'react-native'
import { globalStyles } from '../../config/styles'

export default function MarketHeaderContainer({ children }) {
	return (
		<View
			style={{
				paddingVertical: 8,
				paddingHorizontal: 20,
				backgroundColor: globalStyles.Colors.inputColor2,
				marginTop: 24,
				marginBottom: 8,
				...globalStyles.flex.row,
				justifyContent: 'space-between',
				alignItems: 'center',
			}}
		>
			{children}
		</View>
	)
}
