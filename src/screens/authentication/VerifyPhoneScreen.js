import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useDispatch } from 'react-redux'
import AppText from '../../components/common/AppText'
import Screen from '../../components/Screen'

import globalStyles from '../../config/styles'
import { useTimer } from '../../hooks/useTimer'
import { setLoggedIn } from '../../redux/modules/appSettings'
import { setUser } from '../../utils/storage'
import CodeInput from './CodeInput'
import { CodeNotReceived } from './CodeNotReceived'
const defaultStyles = globalStyles()

const VerifyPhoneScreen = () => {
	const [time, resetTimer] = useTimer(60)
	const dispatch = useDispatch()

	const handleVerify = () => {
		dispatch(setLoggedIn(true))
		setUser({ username: true })
	}

	return (
		<Screen style={defaultStyles.screen} gap>
			<View style={styles.topTexts}>
				<AppText>Code is sent to +21 983 823 32 32</AppText>
				<AppText style={styles.topTextSub} typo="tiny">
					Please enter the code to verify
				</AppText>
				<AppText style={styles.topTextSub} typo="tiny">
					your phone.
				</AppText>
			</View>
			<View style={styles.resendContainer}>
				<CodeInput count={4} onReachedEnd={handleVerify} />

				{time === 0 ? (
					<CodeNotReceived resetTimer={resetTimer} />
				) : (
					<AppText style={{ paddingTop: 24 }} typo="tiny">
						{time}s
					</AppText>
				)}
			</View>
		</Screen>
	)
}

const styles = StyleSheet.create({
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
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	squareInput: {
		width: '20%',
		marginHorizontal: 5,
	},
	squareInputNumber: {
		color: defaultStyles.Colors.whiteColor,
		fontSize: 20,
		textAlign: 'center',
	},
	resendContainer: {
		flex: 5,
		padding: 10,
		marginVertical: 10,
		alignItems: 'center',
	},
})

export default VerifyPhoneScreen
