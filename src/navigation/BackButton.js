import React from 'react'
import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import { Colors, Images } from '../assets'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { globalStyles } from '../config/styles'

export default function BackButton({ navigation, ...restProps }) {
	return (
		<TouchableOpacity
			{...restProps}
			style={styles.btn}
			onPress={() => navigation.goBack()}
		>
			<AntDesign
				name="arrowleft"
				size={24}
				color={globalStyles.Colors.text2}
			/>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	btn: {
		width: 45,
		height: 45,
		borderRadius: 12,
		alignItems: 'center',
		justifyContent: 'center',
		borderStyle: 'solid',
		borderWidth: 2,
		borderColor: Colors.inputColor,
	},
})
