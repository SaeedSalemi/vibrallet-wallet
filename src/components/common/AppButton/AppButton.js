import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import AppIcon from '../AppIcon'
import AppText from '../AppText'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import globalStyles from './../../../config/styles'
const defaultStyles = globalStyles()

const AppButton = ({
	title,
	onPress,
	customStyle,
	textStyle,
	typo,
	icon,
	bold,
}) => {
	return (
		<TouchableOpacity onPress={onPress} style={[styles.button, customStyle]}>
			{icon ? (
				<MaterialIcons
					name={icon}
					size={20}
					color={defaultStyles.Colors.whiteColor}
					style={{ marginHorizontal: 4 }}
				/>
			) : null}
			<AppText typo={typo} style={[styles.text, textStyle]} bold={bold}>
				{title}
			</AppText>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	button: {
		borderRadius: 10,
		backgroundColor: defaultStyles.Colors.primaryColor,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 15,
		width: '100%',
		marginVertical: 10,
		flexDirection: 'row',
	},
	text: {
		color: defaultStyles.Colors.whiteColor,
	},
	icon: {
		marginHorizontal: 8,
	},
})

export default AppButton
