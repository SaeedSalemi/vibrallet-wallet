import React from 'react'
import { StyleSheet, Image, View } from 'react-native'
import AppText from '../../components/common/AppText'
import AppButton from '../../components/common/AppButton'
import Screen from '../../components/Screen'
import Colors from '../../assets/Colors'
import globalStyles from './../../config/styles'
import { setUser } from '../../utils/storage'
import { useTimer } from '../../hooks/useTimer'
import { CodeNotReceived } from './CodeNotReceived'
import { useDispatch } from 'react-redux'
import { setLoggedIn } from '../../redux/modules/appSettings'

const defaultStyles = globalStyles()

const VerifyEmailScreen = () => {
	const dispatch = useDispatch()
	const [time, resetTimer] = useTimer(30)

	const handleCheckEmail = () => {
		dispatch(setLoggedIn(true))
		setUser({ username: true })
	}

	return (
		<Screen style={styles.container} edges={['top', 'bottom']}>
			<View style={styles.avatar}>
				<Image
					style={styles.verifyLogo}
					fadeDuration={300}
					source={defaultStyles.Images.verifyEmail}
				/>
				<AppText style={styles.verifyLink}>A magic link is on the way</AppText>
				<AppText style={styles.checkEmail} typo="tiny">
					Check your email on this device{'\n'}
					to verify your account
				</AppText>
			</View>

			<View style={styles.content}>
				{time === 0 ? (
					<CodeNotReceived resetTimer={resetTimer} />
				) : (
					<View style={styles.resend}>
						<AppText typo="tiny" style={styles.resendText}>
							You can resend in {time} seconds
						</AppText>
					</View>
				)}
				<AppButton
					typo="sm"
					title="Check My Email"
					onPress={handleCheckEmail}
				/>
			</View>
		</Screen>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.bckColor,
	},
	verifyLogo: {
		width: 200,
		height: 150,
		resizeMode: 'stretch',
	},
	avatar: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	content: {
		paddingHorizontal: 20,
		alignItems: 'center',
	},
	verifyLink: {
		fontSize: 14,
		color: Colors.textColor,
		textAlign: 'center',
		marginTop: 75,
		marginBottom: 2,
	},
	checkEmail: {
		color: Colors.darkTextColor,
		textAlign: 'center',
	},
	resend: {
		width: 180,
		borderBottomWidth: 1,
		borderStyle: 'solid',
		borderBottomColor: defaultStyles.Colors.primaryColor,
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'center',
		marginVertical: 24,
	},
	resendText: {
		color: defaultStyles.Colors.primaryColor,
	},
})
export default VerifyEmailScreen
