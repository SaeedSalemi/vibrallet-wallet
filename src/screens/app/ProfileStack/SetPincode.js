import { yupResolver } from '@hookform/resolvers/yup'
import React, { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { View } from 'react-native'
import * as yup from 'yup'
import { useDispatch } from 'react-redux'
import AppButton from '../../../components/common/AppButton'
import AppText from '../../../components/common/AppText'
import ControllerAppInput from '../../../components/common/ControllerAppInput/ControllerAppInput'
import Screen from '../../../components/Screen'
import { routes } from '../../../config/routes'
import { globalStyles } from '../../../config/styles'
import { validators } from '../../../utils/validators'
import { setCreatePincode } from '../../../redux/modules/wallets'
// import { walletManager } from '../../../blockchains/walletManager'

const pincodeSchema = yup.object({
	pincode: validators.string(true),
	retypePincode: validators.retype('pincode'),
})
export default function SetPincode({ navigation }) {
	const dispatch = useDispatch()

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({ resolver: yupResolver(pincodeSchema) })
	const items = useMemo(
		() => [
			{
				icon: 'key',
				placeholder: 'Type new Pincode',
				message: 'Only 4 character permitted',
				endIcon: 'eye-slash',
				alertIcon: '',
				name: 'pincode',
				control: control,
				errors: errors,
			},
			{
				icon: 'key',
				placeholder: 'Retype new Pincode',
				name: 'retypePincode',
				control: control,
				endIcon: 'eye-slash',
				errors: errors,
			},
		],
		[]
	)
	const onSubmit = value => {
		dispatch(setCreatePincode(value.pincode))
		navigation.navigate(routes.wordBackup)
	}

	return (
		<Screen edges={['bottom']} style={{ ...globalStyles.gapScreen }}>
			<View style={{ flex: 1 }}>
				<View style={{ paddingVertical: 18, ...globalStyles.flex.center }}>
					<AppText typo="xs">Please set a pincode</AppText>
					<AppText typo="xs">in order to secure your wallets</AppText>
				</View>
				<View>
					{items.map((item, i) => (
						<ControllerAppInput
							key={i}
							password
							name={item.name}
							control={control}
							errors={errors}
							icon={item.icon}
							placeholder={item.placeholder}
							endIcon={item.endIcon}
							alertIcon={item.alertIcon}
							message={item.message}
						/>
					))}
				</View>
			</View>
			<AppButton title="Submit" bold onPress={handleSubmit(onSubmit)} />
		</Screen>
	)
}
