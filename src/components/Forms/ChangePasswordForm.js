import React from 'react'
import { Alert, Image, ScrollView, View } from 'react-native'
import { yupResolver } from '@hookform/resolvers/yup'
import { globalStyles } from '../../config/styles'
import AppText from '../common/AppText'
import { useForm } from 'react-hook-form'
import ControllerAppInput from '../common/ControllerAppInput/ControllerAppInput'
import AppButton from '../common/AppButton'
import * as yup from 'yup'
import { Images } from '../../assets'
import { useDispatch } from 'react-redux'
import { setPassword } from '../../redux/modules/appSettings'
import { useNavigation } from '@react-navigation/core'
import { routes } from '../../config/routes'
import { PasswordIcon } from '../Profile/PasswordIcon'

const changePasswordSchema = yup.object({
	oldPassword: yup.string().required('Required'),
	newPassword: yup.string().required('Required'),
	retypeNewPassword: yup
		.string()
		.oneOf([yup.ref('newPassword'), null], 'Passwords must match')
		.required('Required'),
})

export default function ChangePasswordForm({ password }) {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(changePasswordSchema),
	})
	const dispatch = useDispatch()
	const { goBack } = useNavigation()

	const onSubmit = data => {
		if (data.oldPassword === password) {
			dispatch(setPassword(data.newPassword))
			Alert.alert('Your password successfully changed!')
			goBack()
		} else {
			Alert.alert('Your old password is wrong!')
		}
	}

	return (
		<View style={{ flex: 1 }}>
			<ScrollView>
				<View style={{ marginVertical: 12, ...globalStyles.flex.center }}>
					<PasswordIcon />
				</View>
				<View style={{ ...globalStyles.flex.center, marginVertical: 12 }}>
					<AppText typo="tiny" color="text2">
						Password keeps your wallet protectred by encryption.
					</AppText>
					<AppText color="text2" typo="tiny">
						Do not forget to save the password.
					</AppText>
				</View>
				<ControllerAppInput
					placeholder="Type old password"
					endIcon="eye-slash"
					errors={errors}
					icon="lock"
					password
					control={control}
					name="oldPassword"
				/>
				<View style={{ flex: 1 }}>
					<ControllerAppInput
						password
						placeholder="Type new password"
						endIcon="eye-slash"
						errors={errors}
						icon="lock"
						control={control}
						name="newPassword"
					/>
					<ControllerAppInput
						placeholder="Retype new password"
						endIcon="eye-slash"
						password
						errors={errors}
						icon="lock"
						control={control}
						name="retypeNewPassword"
					/>
				</View>
			</ScrollView>
			<AppButton title="Change" bold onPress={handleSubmit(onSubmit)} />
		</View>
	)
}
