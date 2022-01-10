import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import Colors from '../../../assets/Colors'
import globalStyles, { setTypo } from '../../../config/styles'
import AppIcon from '../AppIcon'

const defaultStyles = globalStyles()

// // 	keyboardType,
// 	placeholder,
// 	keyboardType = 'default',
// 	secureTextEntry = false,

// secureTextEntry = { secureTextEntry }
// keyboardType = { keyboardType }
// clearButtonMode = 'always'

const AppTextInput = ({ icon, ...otherProps }) => {
	return (
		<View style={styles.container}>
			{icon && <AppIcon name={icon} />}
			<TextInput
				style={styles.input}
				placeholderTextColor={defaultStyles.Colors.darkTextColor}
				{...otherProps}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		width: '100%',
		borderRadius: 10,
		backgroundColor: Colors.inputColor,
		padding: 15,
		marginVertical: 10,
	},
	input: {
		color: defaultStyles.Colors.whiteColor,
		fontFamily: 'Roboto-Regular',
		width: '100%',
		...setTypo('xs'),
		paddingHorizontal: 8,
	},
	icon: {
		marginRight: 10,
	},
})

export default AppTextInput
