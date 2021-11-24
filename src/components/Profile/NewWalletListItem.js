import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { globalStyles } from '../../config/styles'
import AppText from '../common/AppText'

export default function NewWalletListItem({ title, onSelect }) {
	return (

		<TouchableOpacity onPress={() => onSelect(title)}>
			<View
				style={{ padding: 18, ...globalStyles.flex.row, alignItems: 'center' }}
			>
				<View
					style={{
						width: 7,
						height: 7,
						backgroundColor: globalStyles.Colors.text2,
						borderRadius: 3.5,
					}}
				></View>
				<AppText
					style={{ paddingHorizontal: 18, color: globalStyles.Colors.text2 }}>{title}</AppText>
			</View>
		</TouchableOpacity>
	)
}
