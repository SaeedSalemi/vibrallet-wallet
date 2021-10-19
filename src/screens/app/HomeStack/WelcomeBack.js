import React, { useEffect, useState } from 'react'
import { Alert, TouchableOpacity, View } from 'react-native'
import AppButton from '../../../components/common/AppButton'
import AppInput from '../../../components/common/AppInput/AppInput'
import AppText from '../../../components/common/AppText'
import Screen from '../../../components/Screen'
import { globalStyles } from '../../../config/styles'
import TouchID from 'react-native-touch-id'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

export default function WelcomeBack({ password, onUnlockPress, useTouchId }) {
	const [value, setValue] = useState('')
	const [isTouchIdSupported, setSupported] = useState(false)

	useEffect(() => {
		TouchID.isSupported()
			.then(() => {
				setSupported(true)
			})
			.catch(error => {
				// Failure code
				console.log(error)
			})
	}, [])

	const handleUnlock = () => {
		if (password === value) {
			onUnlockPress?.()
		} else {
			Alert.alert('Wrong Password!')
		}
	}

	const handleTouchId = () => {
		TouchID.authenticate(
			'To continue using your account with your fingerprint',
			true
		)
			.then(() => {
				onUnlockPress?.()
			})
			.catch(error => {
				Alert.alert(
					'Authentication Failed! you can try again or enter your password.'
				)
			})
	}

	return (
		<Screen style={{ ...globalStyles.gapScreen }} edges={['bottom']}>
			<View style={{ ...globalStyles.flex.center, marginVertical: 32 }}>
				<AppText typo="md" bold>
					Welcome Back!
				</AppText>
				<AppText style={{ marginVertical: 24 }}>
					Type your password to unlock
				</AppText>
			</View>
			<View style={{ flex: 1 }}>
				<AppInput
					icon="lock"
					password
					placeholder="Type your password"
					value={value}
					onChangeText={text => setValue(text)}
				/>
				{isTouchIdSupported && useTouchId ? (
					<TouchableOpacity
						style={{ marginVertical: 24, alignItems: 'center' }}
						onPress={handleTouchId}
					>
						<FontAwesome5
							name="fingerprint"
							size={60}
							color={globalStyles.Colors.text2}
							style={{ alignSelf: 'center' }}
						/>
						<AppText typo="tiny" style={{ marginVertical: 8 }} color="text2">
							With Fingerprint
						</AppText>
					</TouchableOpacity>
				) : null}
			</View>
			<AppButton title="Unlock" bold onPress={handleUnlock} />
			<TouchableOpacity
				style={{ ...globalStyles.flex.center, paddingVertical: 16 }}
			>
				<AppText>I lost my password</AppText>
			</TouchableOpacity>
		</Screen>
	)
}
