import React from 'react'
import { StyleSheet, View } from 'react-native'

import globalStyles from './../../../config/styles'
const defaultStyles = globalStyles()

const AppIconItem = ({
	onPress,
	iconName,
	iconColor,
	children,
	size = 40,
	...otherProps
}) => {
	return (
		<View style={styles.container}>
			<View onPress={onPress} {...otherProps} style={styles.button}>
				{children}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {},
	button: {
		backgroundColor: defaultStyles.Colors.inputColor,
		padding: 15,
		margin: 5,
		borderRadius: 10,
	},
})

export default AppIconItem
