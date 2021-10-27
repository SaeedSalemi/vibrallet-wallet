import React from 'react'
import { View } from 'react-native'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { globalStyles } from '../../../config/styles'
import AppText from '../../common/AppText'

export default function Bar({ title, value, color }) {
	return (
		<View style={{ alignItems: 'center', justifyContent: "flex-end", flexDirection: "column" }}>
			<View
				style={{
					width: 13,
					height: 80,
					maxHeight: 20,
					borderRadius: 10,
					backgroundColor: globalStyles.Colors.text3,
					marginHorizontal: 16,
					alignItems: 'center',
					justifyContent: 'flex-end',
				}}
			>
				<View
					style={{
						width: 12,
						height: value + '%',
						backgroundColor: color,
						borderRadius: 10,
					}}
				/>
			</View>
			<View style={{ marginVertical: 8 }}>
				<AppText>{title}</AppText>
			</View>
		</View>
	)
}
