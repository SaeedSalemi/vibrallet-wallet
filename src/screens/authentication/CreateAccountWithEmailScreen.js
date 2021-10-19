import React, { useState } from 'react'

import { StyleSheet, TouchableOpacity, View } from 'react-native'

import Screen from '../../components/Screen'
import AppText from '../../components/common/AppText'
import AppTextInput from '../../components/common/AppTextInput/AppTextInput'

import globalStyles from '../../config/styles'
import CreateBottom from './CreateBottom'
import { routes } from '../../config/routes'
import AppInput from '../../components/common/AppInput/AppInput'
const defaultStyles = globalStyles()

const CreateAccountWithEmailScreen = ({ navigation }) => {
	const [email, setEmail] = useState('')

	return (
		<Screen style={styles.container} edges={['top', 'bottom']}>
			<View style={styles.flex}>
				<View style={styles.topTexts}>
					<AppText typo="xs">Enter your Email Address to continue</AppText>
					<AppText typo="tiny" style={styles.topTextSub}>
						We will send you a link to your
					</AppText>
					<AppText typo="tiny" style={styles.topTextSub}>
						email address.
					</AppText>
				</View>
				<View style={styles.formGroup}>
					<AppInput
						label="Email Address"
						icon="envelope"
						placeholder="Type your email address"
						clearButtonMode="always"
						keyboardAppearance="dark"
						keyboardType="email-address"
						autoCompleteType="email"
						autoCapitalize="none"
						autoCorrect={false}
						textContentType="emailAddress"
						placeholder="Type your email address"
						onChangeText={text => setEmail(text)}
						value={email}
					/>
					<TouchableOpacity
						style={styles.back}
						onPress={() => navigation.goBack()}
					>
						<AppText style={styles.backToPhone} typo="tiny">
							Back to phone number!
						</AppText>
					</TouchableOpacity>
				</View>
			</View>
			<CreateBottom screenName={routes.verifyEmail} />
		</Screen>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: defaultStyles.Colors.bckColor,
	},
	flex: {
		flex: 1,
	},
	topTexts: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
		marginVertical: 50,
		paddingTop: 20,
	},
	topTextSub: {
		color: defaultStyles.Colors.darkTextColor,
		paddingTop: 4,
	},
	formGroup: {
		flex: 3,
		padding: 10,
	},
	label: {
		marginLeft: 5,
		color: defaultStyles.Colors.lightGrayColor,
	},
	continueButton: {
		justifyContent: 'flex-end',
		alignItems: 'flex-end',
		padding: 20,
		width: '100%',
	},
	backToPhone: {
		marginTop: 10,
		marginBottom: 2,
		color: defaultStyles.Colors.primaryColor,
		textAlign: 'center',
		alignSelf: 'center',
	},
	terms: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10,
	},
	termsText: {
		color: defaultStyles.Colors.darkTextColor,
		textAlign: 'center',
	},
	back: {
		alignItems: 'center',
		justifyContent: 'center',
		borderBottomColor: defaultStyles.Colors.primaryColor,
		borderBottomWidth: 1,
		borderStyle: 'solid',
		width: 144,
		alignSelf: 'center',
	},
})

export default CreateAccountWithEmailScreen
