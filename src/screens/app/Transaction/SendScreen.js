import { useNavigation } from '@react-navigation/core'
import React, { useMemo, useState, useEffect } from 'react'
import {
	View,
	KeyboardAvoidingViewBase,
	KeyboardAvoidingView,
	ActivityIndicator
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
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
import ethManager from './../../../blockchains/EthManager'
import bscManager from './../../../blockchains/BscManager'
import AppLoader from './../../../components/common/AppLoader'
import { showMessage } from 'react-native-flash-message'



export default function SendScreen({ navigation, route }) {
	const [show, setShow] = useState(false)
	// const [qr, setQr] = useState('')
	const { coin } = route.params || {}
	const [isloading, setIsLoading] = useState(true)
	const [state, setState] = useState({
		address: '',
		amount: '',
		wallet: {},
		balance: '',
		percentCoin: 0
	})


	const wallet = useSelector(state =>
		state.wallets.data ? state.wallets.data[0] : null
	)

	useEffect(() => {
		if (wallet) {

			const coinSelector = { ETH: ethManager, BSC: bscManager }
			let selectedCoin = coinSelector[coin.slug];

			selectedCoin.getWalletFromMnemonic(wallet.backup)
				.then(wallet => {
					state.wallet = wallet;
					setState({ ...state });

					selectedCoin.getBalance(wallet?.address, false).then(result => {
						setState({ ...state, balance: result })
						setIsLoading(false)
					})
				})
				.catch(ex => console.error('balance wallet error', ex))

		}
	}, [wallet])

	const handelQR = qrData => {
		// setQr(qrData.data)
		state.address = qrData.data
		setState({ ...state })
		setShow(false)
	}


	const inputItems = useMemo(
		() => {
			return [
				{
					label: `${coin.slug} Address`,
					endMessage: 'by Username',
					placeholder: `Tap to paste ${coin.slug} address`,
					endIcon: 'qrcode',
					value: `${state.address}`,
					onChangeText: text => {
						// setQr(text)
						state.address = text
						setState({ ...state })
					},
					onPress: () => {
						setShow(true)
					},
				},
				{
					label: 'Enter Amount',
					placeholder: `Enter ${coin.slug} Amount`,
					IconComponent: coin.icon,
					iconColor: '#7037C9',
					keybaordType: 'numeric',
					defaultValue: "",
					value: `${state.amount}`,
					onChangeText: text => {
						if (!isNaN(text)) {
							state.amount = parseFloat(text)
							setState({ ...state })
						}
					},
					message: 'Estimated Value ~ $123,342.43',
				},
			]
		},
		[state.address, state.amount]
	)
	const valueItems = useMemo(
		() => [
			{ value: 25, isActive: true },
			{ value: 50 },
			{ value: 75 },
			{ value: 100 },
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
				amount: '$1',
			},
		],
		[state.balance]
	)




	const handleValidation = () => {
		if (state.balance < state.amount) {
			showMessage({
				message: 'You dont have enough credit to excute transaction',
				description: null,
				type: 'danger',
				icon: null,
				duration: 2000,
				style: { backgroundColor: "red" },
				position: 'top'
			})
			return false
		}
		return true
	}


	const handleSendTransaction = async () => {

		if (!handleValidation()) return

		try {
			const coinSelector = { ETH: ethManager, BSC: bscManager }
			let selectedCoin = coinSelector[coin.slug];

			console.log(' -----> state :', state);
			const result = await selectedCoin.transfer(
				null,
				state.wallet,
				state.address,
				state.amount
			)
		} catch (ex) {
			console.error('log', ex)
		}
		navigation.navigate(routes.confirmTransaction, { coin, amount: state.amount })
	}


	const calcTransferPercent = (balance, percent) => {
		balance = balance || 0;
		let result = ((balance / 100) * percent);
		return result;
	}

	const handleSelectPercent = percent => {
		setState({
			...state,
			percentCoin: percent,
			amount: calcTransferPercent(state.balance, percent.value)
		})
	}



	return (
		<Screen style={{ ...globalStyles.gapScreen }}>
			<ScrollView>
				<View style={{ marginVertical: 32 }}>
					<CoinTitle
						title={`${coin.title} Balance`}
						icon={coin.title?.toLowerCase()}
						value={`${state.balance} ${coin.slug}`}
						amount="$1"
					/>
				</View>
				{inputItems.map((item, i) => (
					<View key={i} style={{ marginVertical: 6 }}>
						<AppInput
							label={item.label}
							message={item.message}
							placeholder={item.placeholder}
							icon={item.icon}
							iconColor={item.iconColor}
							IconComponent={item.IconComponent}
							keyboardType={item.keybaordType}
							endMessage={item.endMessage}
							endIcon={item.endIcon}
							onEndIconPress={item.onPress}
							value={item.value}
							onChangeText={item.onChangeText}
						/>
					</View>
				))}
				<View style={{ marginVertical: 18 }}>
					<PercentValueItems items={valueItems} onSelectPercent={handleSelectPercent} />
				</View>
				<View style={{ marginVertical: 24, flex: 1 }}>
					{infoItems.map((item, i) => (
						<View key={i}>
							<InfoItems
								title={item.title}
								amount={item.amount}
								value={item.value}
							/>
							{i + 1 === infoItems.length ? null : <HR />}
						</View>
					))}
				</View>
			</ScrollView>

			<AppCamera
				show={show}
				onClose={() => setShow(false)}
				qr
				onQR={handelQR}
			/>
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


			{isloading && <AppLoader />}

		</Screen>
	)
}
