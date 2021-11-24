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
import { useContext } from 'react'
import { Context } from '../../../context/Provider'

export default function SendScreen({ navigation, route }) {
	const { coinManager } = useContext(Context)
	const [show, setShow] = useState(false)
	// const [qr, setQr] = useState('')
	const { coin } = route.params || {}

	console.log('send screen', coin)
	const [isloading, setIsLoading] = useState(true)

	const [state, setState] = useState({
		address: '',
		amount: '',
		wallet: {},
		balance: '',
		percentCoin: 0
	})


	const wallet = useSelector(state => {
		state.wallets.data ? state.wallets.data[0] : null
	}
	)

	useEffect(() => {

		if (wallet) {

			let selectedCoin = coinManager[coin.symbol];
			if (selectedCoin.getWalletFromMnemonic) {
				selectedCoin.getWalletFromMnemonic(wallet.backup)
					.then(wallet => {
						selectedCoin.getBalance(wallet?.address, false).then(result => {
							state.wallet = wallet
							state.amount = parseFloat(result).toFixed(3)
							state.balance = parseFloat(state.amount * state.rate)
							setState({ ...state })
						})
					})
					.catch(ex => console.error('balance wallet error', ex))
			}

			// const coinSelector = { ETH: ethManager, BSC: bscManager }
			// let selectedCoin = coinSelector[coin.name];

			// selectedCoin.getWalletFromMnemonic(wallet.backup)
			// 	.then(wallet => {
			// 		state.wallet = wallet;
			// 		setState({ ...state });

			// 		selectedCoin.getBalance(wallet?.address, false).then(result => {
			// 			setState({ ...state, balance: result })
			// 			setIsLoading(false)
			// 		})
			// 	})
			// 	.catch(ex => console.error('balance wallet error', ex))

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
					label: `${coin.name} Address`,
					endMessage: 'by Username',
					placeholder: `Tap to paste ${coin.name} address`,
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
					placeholder: `Enter ${coin.name} Amount`,
					IconComponent: coin.icon,
					iconColor: '#7037C9',
					keybaordType: 'numeric',
					defaultValue: "",
					value: `${state.amount}`,
					onChangeText: text => {
						if (!isNaN(text)) {
							state.amount = text
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
				title: `${coin.name} Network Fee`,
				value: `0.0034 ${coin.name}`,
				amount: '$2.31',
			},
			{
				title: 'Remaining Balance',
				value: `${state.amount ? (state.balance - parseFloat(state.amount)) : ""} ${coin.name}`,
				amount: `1$`,
			},
		],
		[state.balance, state.amount]
	)

	const handleValidation = () => {
		if (parseFloat(state.balance) < parseFloat(state.amount)) {
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
		if (state.amount === 0) {
			return false
		}
		return true
	}


	const handleSendTransaction = async () => {

		if (!handleValidation()) return
		navigation.navigate(routes.confirmTransaction, { coin, amount: state.amount, wallet: state.wallet, address: state.address })
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



	//TODO: calculate the state amount into the coin title
	return (
		<Screen style={{ ...globalStyles.gapScreen }}>
			<ScrollView>
				<View style={{ marginVertical: 8 }}>
					<CoinTitle
						title={`${coin.name} Balance`}
						// icon={coin.name?.toLowerCase()}
						icon={coin.logo}
						value={`${state.balance} ${coin.name}`}
						amount={state.amount}
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
				<View style={{ marginVertical: 8 }}>
					<PercentValueItems items={valueItems} onSelectPercent={handleSelectPercent} />
				</View>
				<View style={{ marginVertical: 8, flex: 1 }}>
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


			{/* {isloading && <AppLoader />} */}

		</Screen>
	)
}
