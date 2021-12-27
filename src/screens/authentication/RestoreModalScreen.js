import React, { useState, useContext } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import Screen from '../../components/Screen'
import AppText from '../../components/common/AppText'
import AppButton from '../../components/common/AppButton'
import globalStyles from './../../config/styles'
import AppIcon from '../../components/common/AppIcon'
import { TextInput } from 'react-native-gesture-handler'
import { setUser } from '../../utils/storage'
import Feather from 'react-native-vector-icons/Feather'
import { useDispatch } from 'react-redux'
import { setLoggedIn } from '../../redux/modules/appSettings'
import DocumentPicker from 'react-native-document-picker'
import { decrypt } from '../../utils/Functions'
import RNFS from 'react-native-fs'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { showMessage } from 'react-native-flash-message'
import { routes } from '../../config/routes'
import HttpService from '../../services/HttpService'
import { Context } from '../../context/Provider'
import bitcoinManager from '../../blockchains/BitcoinManager'
import ethManager from '../../blockchains/EthManager'
import bscManager from '../../blockchains/BscManager'
import { finalCreateWallet, initCreateWallet } from '../../redux/modules/wallets'
import Clipboard from '@react-native-community/clipboard'

const defaultStyles = globalStyles()

const RestoreModalScreen = ({ navigation }) => {
	const dispatch = useDispatch()
	const { setCoinsToSupport } = useContext(Context)
	const [isFile, setIsFile] = useState(true)
	const [fileUri, setFileUri] = useState('')
	const [loading, setLoading] = useState(false)
	const [typedMnonic, setTypedMnonic] = useState('')

	const handleToggle = () => setIsFile(!isFile)

	// supported coins
	const [state, setState] = useState({
		preDefinedCoinsColors: { BTC: '#F47169', BNB: '#FFCC01', ETH: '#7037C9', },
	})

	const handleFilePicker = async () => {
		try {
			const res = await DocumentPicker.pickSingle({
				type: [DocumentPicker.types.allFiles],
			})
			setFileUri(res)
		} catch (err) {
			if (DocumentPicker.isCancel(err)) {
				console.log('error', err)
			} else {
				throw err
			}
		}
	}

	const handleRestore = () => {

	}


	const supportedCoins = (xhr_response, mnonic) => {

		try {
			new HttpService("", {
				"uniqueId": "abc1",
				"action": "supportedCoins",
			}).Post(async (response) => {

				try {
					if (response) {
						console.log('supportedCoins WORD BACKYUp----> ', mnonic, response);
						// if (wallet) {
						const items = response
						for (let item of items) {
							item.balance = 0
							item.color = state.preDefinedCoinsColors[item.symbol]
							item.hide = false
							item.fav = false
							if (item.symbol === 'BTC') {
								const coininfo = await bitcoinManager.getWalletFromMnemonic(mnonic)
								item.publicKey = coininfo.publicKey
								item.privateKey = coininfo.privateKey
								item.address = coininfo.address
								// item.balance = await bitcoinManager.getBalance(item.address)
							}
							if (item.symbol.toUpperCase() === 'ETH') {
								const coininfo = await ethManager.getWalletFromMnemonic(mnonic)
								item.publicKey = coininfo.publicKey
								item.privateKey = coininfo.privateKey
								item.address = coininfo.address
								// item.balance = await ethManager.getBalance(item.address)
							}
							if (item.symbol.toUpperCase() === 'BNB') {
								const coininfo = await bscManager.getWalletFromMnemonic(mnonic)
								item.publicKey = coininfo.publicKey
								item.privateKey = coininfo.privateKey
								item.address = coininfo.address
								// item.balance = await bscManager.getBalance(item.address)
							}
						}
						setCoinsToSupport(items)
						AsyncStorage.setItem("supportedCoins", JSON.stringify(items)).then().catch()
						xhr_response(items)
					}
				} catch (error) {
					console.log('debug error', error)
				}
			})


		} catch (err) {
			console.log(err)
		}

	}
	return (
		<Screen style={defaultStyles.gapScreen}>
			<AppText style={styles.title}>
				Restore your wallet using backup file or type your 12-word backup phrase
				Then enter your password to restore
			</AppText>
			<View style={styles.wrapper}>
				<View>
					<View style={[defaultStyles.flex.row, defaultStyles.flex.between]}>
						<AppText style={styles.howText}>How to restore</AppText>
						<AppText style={styles.optionText} onPress={handleToggle}>
							{isFile ? 'Enter Text' : 'Choose File'}
						</AppText>
					</View>
					<View style={[styles.modeWrapper, defaultStyles.flex.center]}>
						{isFile ? (
							<TouchableOpacity onPress={handleFilePicker}>
								<View style={[defaultStyles.flex.row, defaultStyles.flex.center]}>
									<Feather
										name="file-text"
										color={defaultStyles.Colors.text3}
										size={20}
									/>
									<AppText style={styles.restoreText}>Restore from file</AppText>
								</View>
							</TouchableOpacity>
						) : (
							<View
								style={[
									defaultStyles.flex.row,
									defaultStyles.flex.center,
									styles.fileWrapper,
								]}
							>
								<Feather
									name="file-text"
									color={defaultStyles.Colors.text3}
									size={20}
								/>
								<TextInput
									style={styles.input}
									placeholder="12-word backup phrase"
									placeholderTextColor={defaultStyles.Colors.darkTextColor}
									color={defaultStyles.Colors.textColor}
									onChangeText={text => setTypedMnonic(text)}
									value={typedMnonic}
								/>
								<TouchableOpacity onPress={async () => {
									const copiedText = await Clipboard.getString()
									setTypedMnonic(copiedText)
								}}><AppText style={styles.paste}>Paste</AppText></TouchableOpacity>
								<AppIcon name="scan" style={styles.icon} />
							</View>
						)}
					</View>
				</View>
				<AppButton loading={loading} typo="sm" title="Restore" onPress={handleRestore} />
			</View>
		</Screen>
	)
}

const styles = StyleSheet.create({
	title: {
		paddingVertical: 30,
		width: '70%',
		alignSelf: 'center',
		textAlign: 'justify',
	},
	wrapper: {
		flex: 1,
		justifyContent: 'space-between',
	},
	howText: {
		color: defaultStyles.Colors.lightGrayColor,
	},
	optionText: {
		color: defaultStyles.Colors.primaryColor,
	},
	modeWrapper: {
		alignSelf: 'stretch',
		height: 70,
		backgroundColor: defaultStyles.Colors.inputColor,
		borderRadius: 10,
		marginTop: 8,
	},
	restoreText: {
		paddingHorizontal: 8,
	},
	icon: {
		margin: 12,
	},
	fileWrapper: {
		paddingHorizontal: 8,
	},
	input: {
		flex: 1,
		marginHorizontal: 8,
	},
	paste: {
		color: defaultStyles.Colors.blue,
		marginHorizontal: 8,
	},
})

export default RestoreModalScreen
