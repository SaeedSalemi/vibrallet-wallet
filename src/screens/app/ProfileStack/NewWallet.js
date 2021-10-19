import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { View } from 'react-native'
import AppButton from '../../../components/common/AppButton'
import AppInput from '../../../components/common/AppInput/AppInput'
import AppText from '../../../components/common/AppText'
import ControllerAppInput from '../../../components/common/ControllerAppInput/ControllerAppInput'
import HR from '../../../components/common/HR/HR'
import NewWalletListItem from '../../../components/Profile/NewWalletListItem'
import Screen from '../../../components/Screen'
import { routes } from '../../../config/routes'
import { globalStyles } from '../../../config/styles'
import { validators } from '../../../utils/validators'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch, useSelector } from 'react-redux'
import { initCreateWallet } from '../../../redux/modules/wallets'
import { navigateToWallet } from '../../../redux/modules/appSettings'

const walletNameSchema = yup.object({
	walletName: validators.string(true),
})

export default function NewWallet({ navigation }) {
	const dispatch = useDispatch()
	const walletName = useSelector(state => state.wallets?.create?.name)
	const items = useMemo(() => [
		'My Wallet',
		'BTC Wallet',
		'ETH Wallet',
		'HODI Wallet',
	])
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(walletNameSchema),
	})

	useEffect(() => {
		dispatch(navigateToWallet(false))
	}, [])

	const onSubmit = value => {
		dispatch(initCreateWallet(value.walletName))
		navigation.navigate(routes.setPincode)
	}

	return (
		<Screen
			edges={['bottom']}
			style={{ ...globalStyles.screen, paddingHorizontal: 18 }}
		>
			<View style={{ flex: 1 }}>
				<ControllerAppInput
					name="walletName"
					errors={errors}
					control={control}
					icon="wallet"
					defaultValue={walletName}
					placeholder="Type your wallet name"
				/>
				<View
					style={{
						marginVertical: 18,
						borderStyle: 'solid',
						borderWidth: 1,
						borderColor: globalStyles.Colors.inputColor,
						borderRadius: 10,
					}}
				>
					<AppText bold style={{ padding: 18 }}>
						Suggested Names:
					</AppText>
					{items.map((item, i) => (
						<View key={i}>
							<NewWalletListItem title={item} />
							{i + 1 === items.length ? null : <HR />}
						</View>
					))}
				</View>
			</View>
			<AppButton
				title={'Next'}
				style={{ fontWeight: 'bold' }}
				onPress={handleSubmit(onSubmit)}
			/>
		</Screen>
	)
}
