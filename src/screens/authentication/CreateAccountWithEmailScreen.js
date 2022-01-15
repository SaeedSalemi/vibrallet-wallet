import React, { useState, useContext } from 'react'

import { StyleSheet, TouchableOpacity, View } from 'react-native'

import Screen from '../../components/Screen'
import AppText from '../../components/common/AppText'
import AppTextInput from '../../components/common/AppTextInput/AppTextInput'

import globalStyles from '../../config/styles'
import CreateBottom from './CreateBottom'
import { routes } from '../../config/routes'
import AppInput from '../../components/common/AppInput/AppInput'
import AppButton from '../../components/common/AppButton'
import { useDispatch } from 'react-redux'
// import { setLoggedIn } from '../redux/modules/appSettings'
import { setLoggedIn } from '../../redux/modules/appSettings'
import { showMessage } from 'react-native-flash-message'
const defaultStyles = globalStyles()
import { Context } from '../../context/Provider'
import AsyncStorage from '@react-native-async-storage/async-storage'


const CreateAccountWithEmailScreen = ({ navigation }) => {
	const [email, setEmail] = useState('')
	const dispatch = useDispatch()

	const handleRegisterWithEmail = () => {
		// regiter email in the async storage and provider

		if (email === "") {
			showMessage({
				message: `Please add your email address`,
				description: null,
				type: 'success',
				icon: null,
				duration: 1000,
				style: { backgroundColor: "#e74c3c" },
				position: 'top'
			})
			return
		}

		if (!email.isEmail()) {
			showMessage({
				message: `Your email address is not valid`,
				description: null,
				type: 'danger',
				icon: null,
				duration: 4000,
				style: { backgroundColor: "#e74c3c" },
				position: 'top'
			})
			return
		}

		const user = {
			email
		}
		AsyncStorage.setItem("user", JSON.stringify(user))
		dispatch(setLoggedIn(true, true))
		navigation.navigate(routes.newWallet)
	}

	return (
		<Screen style={styles.container} edges={['top', 'bottom']}>
			<View style={styles.flex}>
				<View style={styles.topTexts}>
					<AppText typo="xs">Enter your Email Address to continue</AppText>
					<AppText typo="tiny" style={styles.topTextSub}>
						By enetring your email address
					</AppText>
					<AppText typo="tiny" style={styles.topTextSub}>
						you can create your own vibranium wallet.
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
					{/* <TouchableOpacity
						style={styles.back}
						onPress={() => navigation.goBack()}
					>
						<AppText style={styles.backToPhone} typo="tiny">
							Back to phone number!
						</AppText>
					</TouchableOpacity> */}
				</View>
			</View>
			{/* <CreateBottom screenName={routes.verifyEmail} /> */}
			{/* <CreateBottom screenName={routes.newWallet} /> */}
			<View>
				<View style={styles.continueButton}>
					<AppButton
						title="Continue"
						typo="sm"
						onPress={handleRegisterWithEmail}
					/>
				</View>
				<View style={styles.terms}>
					<AppText style={styles.termsText} typo="dot">
						By continuing, you agree to our Terms and Privacy Policy
					</AppText>
				</View>
			</View>
		</Screen>
	)
}

const styles = StyleSheet.create({



	//
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

export default CreateAccountWithEmailScreen
