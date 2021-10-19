import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import AppButton from '../../components/common/AppButton'
import AppText from '../../components/common/AppText'
import globalStyles from '../../config/styles'

const defaultStyles = globalStyles()

export default function CreateBottom({ screenName }) {
	const { navigate } = useNavigation()

	return (
		<View>
			<View style={styles.continueButton}>
				<AppButton
					title="Continue"
					typo="sm"
					onPress={() => navigate(screenName)}
				/>
			</View>
			<View style={styles.terms}>
				<AppText style={styles.termsText} typo="dot">
					By continuing, you agree to our Terms and Privacy Policy
				</AppText>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	continueButton: {
		justifyContent: 'flex-end',
		alignItems: 'flex-end',
		paddingHorizontal: 20,
		width: '100%',
	},
	terms: {
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 8,
	},
	termsText: {
		color: defaultStyles.Colors.darkTextColor,
		textAlign: 'center',
	},
})
