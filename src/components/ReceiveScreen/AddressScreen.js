import React, { useEffect, useMemo, useState } from 'react'
import { View, Image, ScrollView } from 'react-native'
import { useSelector } from 'react-redux'
import { Images } from '../../assets'
import ethManager from '../../blockchains/EthManager'
import { globalStyles } from '../../config/styles'
import AppButton from '../common/AppButton'
import AppInput from '../common/AppInput/AppInput'
import AppText from '../common/AppText'
import QRCode from 'react-native-qrcode-svg'
import bscManager from '../../blockchains/BscManager'
import Clipboard from '@react-native-community/clipboard'
import { showMessage } from "react-native-flash-message";
import { share } from '../../utils/Functions'

export default function AddressScreen({ route, navigation }) {
	const { coin } = route.params || {}

	const wallet = useSelector(state =>
		state.wallets.data ? state.wallets.data[0] : null
	)
	console.log("wallet address is  ", wallet)
	const [walletInfo, setWalletInfo] = useState()

	useEffect(() => {
		const setWalletAsync = async () => {
			if (wallet) {
				console.log(coin)
				if (coin.slug === 'ETH') {
					const info = await ethManager.getWalletFromMnemonic(wallet.backup)
					setWalletInfo(info)
				} else if (coin.slug === 'BSC') {
					const info = await bscManager.getWalletFromMnemonic(wallet.backup)
					setWalletInfo(info, 'info after')
				} else {
					// not supported
				}
			} else {
				navigation.navigate(routes.profileWallet)
			}
		}
		setWalletAsync()
	}, [])


	const handleShare = () => {
		share("Recive token", 'https://app.vibrallet.com/send?coin=BTC&address={toAddress}&amount={amount}')
	}
	return (
		<View style={{ ...globalStyles.gapScreen }}>
			<ScrollView>
				<View style={{ alignItems: 'center' }}>
					{walletInfo?.address ? (
						<View
							style={{
								backgroundColor: globalStyles.Colors.inputColor,
								padding: 16,
								borderRadius: 10,
								marginVertical: 16,
							}}
						>
							<QRCode
								size={150}
								value={walletInfo.address}
								// logo={{ uri: base64Logo }}
								// logoSize={30}
								logoBackgroundColor="transparent"
							/>
						</View>
					) : null}
					<AppText typo="tiny" style={{ alignItems: 'center' }}>
						Your {coin.title} Address
					</AppText>
				</View>
				{walletInfo?.address ? (
					<View
						style={{
							borderStyle: 'solid',
							borderColor: globalStyles.Colors.inputColor,
							borderWidth: 1,
							borderRadius: 10,
							marginVertical: 36,
							paddingHorizontal: 36,
							paddingVertical: 12,
						}}
					>
						<AppText color="text1" style={{ textAlign: 'center' }}>
							{walletInfo?.address}
						</AppText>
					</View>
				) : null}

				<AppInput
					containerStyle={{ flex: 1 }}
					endText="Set"
					keyboardType="numeric"
					label="Advanced"
					placeholder={`Set ${coin.slug} amount`}
				/>
			</ScrollView>
			<View
				style={{ ...globalStyles.flex.row, justifyContent: 'space-between' }}
			>
				<AppButton
					bold
					title="Share"
					onPress={handleShare}
					customStyle={{
						flex: 0.48,
						fontWeight: 'bold',
						backgroundColor: globalStyles.Colors.bckColor,
						borderWidth: 1,
						borderColor: globalStyles.Colors.inputColor,
					}}
				/>
				<AppButton
					title="Copy"
					customStyle={{ flex: 0.48, fontWeight: 'bold' }}
					onPress={() => {
						Clipboard.setString(walletInfo?.address)
						showMessage({
							message: 'Address cpied to clipbloard successfully',
							description: null,
							type: 'success',
							icon: null,
							duration: 1000,
							style: { backgroundColor: "#6BC0B1" },
							position: 'top'
						})
					}}
				/>
			</View>
		</View>
	)
}
