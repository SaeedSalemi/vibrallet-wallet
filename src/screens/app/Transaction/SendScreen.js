import { useNavigation } from '@react-navigation/core'
import React, { useMemo, useState, useEffect } from 'react'
import { View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import ethManager from '../../../blockchains/EthManager'
import AppButton from '../../../components/common/AppButton'
import AppCamera from '../../../components/common/AppCamera'
import AppInput from '../../../components/common/AppInput/AppInput'
import AppText from '../../../components/common/AppText'
import HR from '../../../components/common/HR/HR'
import Screen from '../../../components/Screen'
import CoinTitle from '../../../components/SendScreen/CoinTitle'
import InfoItems from '../../../components/SendScreen/InfoItems/InfoItem'
import PercentValueItems from '../../../components/SendScreen/PercentValueItems/PercentValueItems'
import { routes } from '../../../config/routes'
import { globalStyles } from '../../../config/styles'
import { useSelector } from 'react-redux'

export default function SendScreen({ navigation, route }) {
	const [show, setShow] = useState(false)
	const { coin } = route.params || {}
	const [state, setState] = useState({
		address: '',
		amount: '',
		wallet: '',
		balance: '',
		balanceUSD: ''
	})

	const wallet = useSelector(state =>
		state.wallets.data ? state.wallets.data[0] : null
	)

	useEffect(() => {
		if (wallet) {
			ethManager
				.getWalletFromMnemonic(wallet.backup)
				.then(wallet => {
					setState({ ...state, wallet })
					ethManager.getBalance(wallet?.address, false).then(result => {
						setState({ ...state, balance: result })
					})
				})
				.catch(ex => console.error('wallet', ex))

		}
	}, [])

	const handleSendTransaction = async () => {
		try {
			console.log('wallet handle', state.wallet)
			const result = await ethManager.transfer(
				null,
				state.wallet,
				state.address,
				state.amount
			)
			console.log({ result })
		} catch (ex) {
			console.error('log', ex)
		}
		console.log({ result })
		navigation.navigate(routes.confirmTransaction, { coin })
	}

	// const inputItems = useMemo(
	// 	() => [
	// 		{
	// 			label: `${coin.slug} Address`,
	// 			endMessage: 'by Username',
	// 			placeholder: `Tap to paste ${coin.slug} address`,
	// 			endIcon: 'qrcode',
	// 			onPress: () => {
	// 				setShow(true)
	// 			},
	// 			onChangeText: text => setState({ ...state, address: text }),
	// 			value:
	// 		},
	// 		{
	// 			label: 'Enter Amount',
	// 			placeholder: `Enter ${coin.slug} Amount`,
	// 			icon: coin.title?.toLowerCase(),
	// 			iconColor: '#7037C9',
	// 			message: 'Estimated Value ~ $123,342.43',
	// 			onChangeText: text => setState({ ...state, amount: text }),
	// 		},
	// 	],
	// 	[]
	// )
	const valueItems = useMemo(
		() => [
			{ value: '25%', isActive: true },
			{ value: '50%' },
			{ value: '75%' },
			{ value: '100%' },
		],
		[]
	)

	const infoItems = useMemo(
		() => [
			{
				title: `${coin.title} Network Fee`,
				value: `0.0034 ${coin.slug}`,
				amount: '$2.31',
			},
			{
				title: 'Remaining Balance',
				value: `${state.balance} ${coin.slug}`,
				amount: '$213,940',
			},
		],
		[]
	)

	return (
		<Screen style={{ ...globalStyles.gapScreen }} edges={['bottom']}>
			<ScrollView>
				<View style={{ marginVertical: 32 }}>
					<CoinTitle
						title={`${coin.title} Balance`}
						icon={coin.title?.toLowerCase()}
						value={`12.432 ${coin.slug}`}
						amount="$15,432"
					/>
				</View>
				<View style={{ marginVertical: 6 }}>
					<AppInput
						label={`${coin.slug} Address`}
						endMessage={'by Username'}
						placeholder={`Tap to paste ${coin.slug} address`}
						endIcon={'qrcode'}
						onPress={() => {
							setShow(true)
						}}
						onChangeText={text => setState({ ...state, address: text })}
					/>
				</View>

				<View style={{ marginVertical: 6 }}>
					<AppInput
						label={'Enter Amount'}
						placeholder={`Enter ${coin.slug} Amount`}
						icon={coin.title?.toLowerCase()}
						iconColor={'#7037C9'}
						message={'Estimated Value ~ $123,342.43'}
						onChangeText={text => setState({ ...state, amount: text })}
					/>
				</View>

				<View style={{ marginVertical: 18 }}>
					<PercentValueItems items={valueItems} />
				</View>
				<View style={{ marginVertical: 24, flex: 1 }}>
					<View>
						<InfoItems
							title={`${coin.title} Network Fee`}
							value={`${state.balance} ${coin.slug}`}
							amount={'$2.31'}
						/>
					</View>

					<View>
						<InfoItems
							title={'Remaining Balance'}
							value={`${state.balance} ${coin.slug}`}
							amount={'$213,940'}
						/>
					</View>
					{/* {infoItems.map((item, i) => (
						<View key={i}>
							<InfoItems
								title={item.title}
								amount={item.amount}
								value={item.value}
							/>
							{i + 1 === infoItems.length ? null : <HR />}
						</View>
					))} */}
				</View>
			</ScrollView>
			<AppButton
				onPress={handleSendTransaction}
				typo="sm"
				customStyle={{
					backgroundColor: globalStyles.Colors.failure,
					fontWeight: 'bold',
				}}
				bold
				title="Send"
			/>
			<AppCamera show={show} onClose={() => setShow(false)} />
		</Screen>
	)
}
