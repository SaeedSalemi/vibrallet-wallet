import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { globalStyles } from '../../config/styles'
import AppIcon from '../common/AppIcon'
import AppText from '../common/AppText'
import HR from '../common/HR/HR'
import { useNavigation } from '@react-navigation/core'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

export default function ProfileMainRoute({
	icon,
	title,
	navigateAddress,
	isLast,
}) {
	const { navigate } = useNavigation()
	return (
		<View style={{ paddingHorizontal: 24 }}>
			<TouchableOpacity
				onPress={() => {
					navigate(navigateAddress)
				}}
			>
				<View
					style={{
						...globalStyles.flex.row,
						...globalStyles.flex.between,
						alignItems: 'center',
						paddingVertical: 10,
					}}
				>
					<View style={{ ...globalStyles.flex.row, alignItems: 'center' }}>
						{icon}
						<AppText style={{ marginLeft: 16 }}>{title}</AppText>
					</View>
					<FontAwesome5
						name="chevron-circle-right"
						size={20}
						color={globalStyles.Colors.inputColor}
					/>
				</View>
				{isLast ? null : <HR />}
			</TouchableOpacity>
		</View>
	)
}
