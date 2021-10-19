import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Alert, Image, ScrollView, View } from 'react-native'
import * as yup from 'yup'
import { globalStyles } from '../../config/styles'
import AppButton from '../common/AppButton'
import AppText from '../common/AppText'
import ControllerAppInput from '../common/ControllerAppInput/ControllerAppInput'
import FontAwsome5 from 'react-native-vector-icons/FontAwesome5'
import { useDispatch } from 'react-redux'
import { setPassword } from '../../redux/modules/appSettings'
import { useNavigation } from '@react-navigation/core'
import { PasswordIcon } from '../Profile/PasswordIcon'
import { validators } from '../../utils/validators'

const passwordSchema = yup.object({
	password: validators.string(),
	retypePassword: validators.retype('password'),
})

export default function NewPasswordForm() {
	const { goBack } = useNavigation()
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(passwordSchema),
	})
	const dispatch = useDispatch()
	const onSubmit = data => {
		dispatch(setPassword(data.password))
		goBack()
		Alert.alert('Your password successfully set!')
	}

	return (
		<View style={{ flex: 1 }}>
			<ScrollView>
				<View style={{ marginVertical: 12, ...globalStyles.flex.center }}>
					<PasswordIcon />
				</View>
				<View style={{ ...globalStyles.flex.center, marginVertical: 12 }}>
					<AppText typo="tiny" color="text3" style={{ alignSelf: 'center' }}>
						Password keeps your wallet protectred by encryption.
					</AppText>
					<AppText color="text3" typo="tiny">
						Do not forget to save the password.
					</AppText>
				</View>
				<ControllerAppInput
					password
					control={control}
					defaultValue=""
					name="password"
					icon="lock"
					placeholder="Type your password"
					errors={errors}
				/>
				<ControllerAppInput
					password
					control={control}
					defaultValue=""
					name="retypePassword"
					icon="lock"
					placeholder="Retype your password"
					errors={errors}
				/>
				<View style={{ marginVertical: 24, alignItems: 'center', flex: 1 }}>
					<FontAwsome5
						name="exclamation-triangle"
						size={15}
						color={globalStyles.Colors.text2}
					/>
					<View style={{ marginVertical: 4, ...globalStyles.flex.center }}>
						<AppText typo="tiny">Note That</AppText>
						<AppText typo="tiny" color="text2">
							Every time you want to enter to your wallet
						</AppText>
						<AppText typo="tiny" color="text2">
							you must type this password!
						</AppText>
					</View>
				</View>
			</ScrollView>
			<AppButton
				title="Submit"
				bold
				typo="sm"
				onPress={handleSubmit(onSubmit)}
			/>
		</View>
	)
}
