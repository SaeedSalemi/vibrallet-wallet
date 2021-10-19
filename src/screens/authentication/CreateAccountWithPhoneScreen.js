import React, { useState } from 'react'

import { StyleSheet, View, TouchableOpacity } from 'react-native'

import Screen from '../../components/Screen'
import AppText from '../../components/common/AppText'
import AppTextInput from '../../components/common/AppTextInput/AppTextInput'

import globalStyles from './../../config/styles'
import CreateBottom from './CreateBottom'
import { routes } from '../../config/routes'
import AppInput from '../../components/common/AppInput/AppInput'

const defaultStyles = globalStyles()

const CreateAccountWithPhoneScreen = ({ navigation }) => {
	const [phoneNumber, setPhoneNumber] = useState('')

	return (
		<Screen style={styles.container} edges={['top', 'bottom']}>
			<View style={styles.flex}>
				<View style={styles.topTexts}>
					<AppText>Enter your phone number to continue</AppText>
					<AppText style={styles.topTextSub} typo="tiny">
						You will recieve a 4 digit code
					</AppText>
					<AppText style={styles.topTextSub} typo="tiny">
						to verify next.
					</AppText>
				</View>
				<View style={styles.formGroup}>
					<AppInput
						placeholder="(000) 000 00 00"
						label="Phone Number"
						clearButtonMode="always"
						keyboardAppearance="dark"
						keyboardType="numeric"
						returnKeyType="done"
						placeholder="(000) 000 00 00"
						maxLength={10}
						placeholderTextColor={defaultStyles.Colors.darkTextColor}
						value={phoneNumber}
						onChangeText={text => setPhoneNumber(text)}
					/>
					<TouchableOpacity
						style={styles.try}
						onPress={() => navigation.navigate(routes.createWalletEmail)}
					>
						<AppText style={styles.anotherWayText} typo="tiny">
							Try Another Way!
						</AppText>
					</TouchableOpacity>
				</View>
			</View>
			<CreateBottom screenName={routes.verifyPhone} />
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
	try: {
		alignItems: 'center',
		justifyContent: 'center',
		borderBottomColor: defaultStyles.Colors.primaryColor,
		borderBottomWidth: 1,
		borderStyle: 'solid',
		width: 104,
		alignSelf: 'center',
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
	anotherWayText: {
		marginTop: 10,
		marginBottom: 2,
		color: defaultStyles.Colors.primaryColor,
		textAlign: 'center',
		alignSelf: 'center',
	},
})

export default CreateAccountWithPhoneScreen
