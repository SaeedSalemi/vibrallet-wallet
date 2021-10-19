import React from 'react'
import { View } from 'react-native'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { globalStyles } from '../../config/styles'

export function PasswordIcon() {
	return (
		<View
			style={{
				width: 100,
				height: 100,
				backgroundColor: globalStyles.Colors.inputColor,
				borderRadius: 10,
				alignItems: 'center',
				justifyContent: 'space-around',
			}}
		>
			<FontAwesome5Icon
				name="lock"
				color={globalStyles.Colors.text2}
				size={20}
			/>
			<View
				style={{
					width: 53,
					height: 4,
					borderRadius: 8,
					backgroundColor: globalStyles.Colors.text3,
				}}
			/>
			<View
				style={{
					width: 30,
					height: 4,
					borderRadius: 8,
					backgroundColor: globalStyles.Colors.secondaryColor,
				}}
			/>
		</View>
	)
}
