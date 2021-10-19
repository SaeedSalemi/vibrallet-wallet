import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { globalStyles } from '../../config/styles'
import AppIcon from '../common/AppIcon'
import AppText from '../common/AppText'

export default function ServiceItem({ service }) {
	const { title, icon, route } = service

	const { navigate } = useNavigation()

	const handleNavigate = () => {
		navigate(route)
	}

	return (
		<TouchableOpacity style={styles.container} onPress={handleNavigate}>
			<View style={styles.wrapper}>{icon}</View>
			<AppText typo="tiny">{title}</AppText>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
	},
	wrapper: {
		width: 45,
		height: 45,
		backgroundColor: globalStyles.Colors.inputColor,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 10,
		marginBottom: 8,
	},
})
