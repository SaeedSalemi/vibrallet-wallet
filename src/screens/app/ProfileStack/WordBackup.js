import React, { useEffect, useState, useContext } from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux'
import { Images } from '../../../assets'
import AppButton from '../../../components/common/AppButton'
import AppText from '../../../components/common/AppText'
import HR from '../../../components/common/HR/HR'
import Screen from '../../../components/Screen'
import { globalStyles } from '../../../config/styles'
import { finalCreateWallet } from '../../../redux/modules/wallets'
import WalletManager from '../../../blockchains/walletManager'
import Clipboard from '@react-native-community/clipboard'
import { showMessage } from "react-native-flash-message";
import { routes } from '../../../config/routes'
import RNFS from 'react-native-fs'
import { encrypt } from '../../../utils/Functions'
import AsyncStorage from '@react-native-async-storage/async-storage'
import HttpService from '../../../services/HttpService'
import bitcoinManager from '../../../blockchains/BitcoinManager'
import ethManager from '../../../blockchains/EthManager'
import bscManager from '../../../blockchains/BscManager'
import { Context } from '../../../context/Provider'

export default function WordBackup({ navigation }) {
	const { setCoinsToSupport } = useContext(Context)
	const dispatch = useDispatch()
	const { navigate } = navigation
	const [backup, setBackup] = useState('')
	const [state, setState] = useState({
		preDefinedCoinsColors: { BTC: '#F47169', BNB: '#FFCC01', ETH: '#7037C9', },
	})

	useEffect(() => {
		AsyncStorage.getItem('isBackup').then(value => {
			if (value === null) {
				const words = WalletManager.generateMnemonic()
				AsyncStorage.setItem('isBackup', 'true')
				setBackup(words)
				supportedCoins()
			}
		})
	}, [])

	const supportedCoins = () => {

		try {
			new HttpService("", {
				"uniqueId": "abc1",
				"action": "supportedCoins",
			}).Post(async (response) => {

				try {
					if (response) {
						// if (wallet) {
						const items = response
						for (let item of items) {
							item.balance = 0
							item.color = state.preDefinedCoinsColors[item.symbol]
							item.hide = false
							item.fav = false
							if (item.symbol === 'BTC') {
								const coininfo = await bitcoinManager.getWalletFromMnemonic(backup)
								item.publicKey = coininfo.publicKey
								item.privateKey = coininfo.privateKey
								item.address = coininfo.address
								// item.balance = await bitcoinManager.getBalance(item.address)
							}
							if (item.symbol.toUpperCase() === 'ETH') {
								const coininfo = await ethManager.getWalletFromMnemonic(backup)
								item.publicKey = coininfo.publicKey
								item.privateKey = coininfo.privateKey
								item.address = coininfo.address
								// item.balance = await ethManager.getBalance(item.address)
							}
							if (item.symbol.toUpperCase() === 'BNB') {
								const coininfo = await bscManager.getWalletFromMnemonic(backup)
								item.publicKey = coininfo.publicKey
								item.privateKey = coininfo.privateKey
								item.address = coininfo.address
								// item.balance = await bscManager.getBalance(item.address)
							}
						}
						setCoinsToSupport(items)
						AsyncStorage.setItem("supportedCoins", JSON.stringify(items)).then().catch()
					}
				} catch (error) {
					console.log('debug error', error)
				}
			})


		} catch (err) {
			console.log(err)
		}

	}


	const handleAddWallet = () => {
		dispatch(finalCreateWallet(backup))
		showMessage({
			message: 'Your wallet has been created successfully',
			description: null,
			type: 'success',
			icon: null,
			duration: 2000,
			style: { backgroundColor: "#16a085" },
			position: 'top'
		})
		navigation.navigate(routes.appTab)
	}

	const backupList = backup.split(' ').map((word, i) => `${i + 1}. ${word}`)

	const handleCopy = () => {
		Clipboard.setString(backup)
	}


	const handleBackup = () => {
		const path = RNFS.DownloadDirectoryPath + `/vibranium-backup-${new Date().getTime()}.json`;
		RNFS.writeFile(path, JSON.stringify(encrypt(backup)), 'utf8')
			.then((success) => {
				showMessage({
					message: 'Your wallet backup has been created in your downloads',
					description: null,
					type: 'success',
					icon: null,
					duration: 3000,
					style: { backgroundColor: "#16a085" },
					position: 'top'
				})
			})
			.catch((err) => {
				console.log(err.message);
			});
	}

	return (
		<Screen edges={['bottom']} style={{ ...globalStyles.gapScreen }}>
			<View style={{ paddingVertical: 18, ...globalStyles.flex.center }}>
				<Image source={Images.qrCode} />
			</View>
			<View style={{ flex: 1 }}>
				<View
					style={{
						borderStyle: 'solid',
						borderRadius: 10,
						borderColor: globalStyles.Colors.inputColor,
						borderWidth: 1,
					}}
				>
					<View
						style={{
							// flex: 1,
							alignSelf: 'stretch',

							paddingHorizontal: 16,
							paddingVertical: 8,
							...globalStyles.flex.row,
							flexWrap: 'wrap',
						}}
					>
						{backupList.map((item, i) => (
							<View style={{ width: '25%', paddingVertical: 8 }} key={i}>
								<AppText typo="tiny">{item}</AppText>
							</View>
						))}
					</View>
					<HR />

					<View style={{
						flexDirection: 'row',
						justifyContent: 'space-around',
						alignItems: 'center',
						paddingHorizontal: 22,
						paddingVertical: 2
					}}>
						<TouchableOpacity
							style={{ ...globalStyles.flex.center }}
							onPress={handleCopy}
						>
							<AppText
								bold
								color="secondaryColor"
								style={{ paddingVertical: 12 }}
							>
								Copy
							</AppText>
						</TouchableOpacity>

						<View style={{ height: '100%', borderStyle: 'solid', borderColor: '#272627', borderRightWidth: 1 }} />

						<TouchableOpacity
							style={{ ...globalStyles.flex.center }}
							onPress={handleBackup}
						>
							<AppText
								bold
								color="secondaryColor"
								style={{ paddingVertical: 12 }}
							>
								Backup
							</AppText>
						</TouchableOpacity>
					</View>




				</View>
				<View style={{ ...globalStyles.flex.center, marginVertical: 24 }}>
					<AppText
						style={{
							textAlign: 'center',
							paddingHorizontal: 36,
							paddingVertical: 8,
						}}
						typo="tiny"
					>
						Please write down 12-word Backup Phrase and keep a copy in a secure
						place so you can restore your wallet at any time.
					</AppText>
					<AppText typo="tiny" color="failure">
						Never share recovery phrase wth anyone!
					</AppText>
				</View>
			</View>
			<AppButton
				title="Create Wallet"
				style={{ fontWeight: 'bold' }}
				onPress={handleAddWallet}
			/>
		</Screen>
	)
}
