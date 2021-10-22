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

export default function AddressScreen({ route, navigation }) {
	const { coin } = route.params || {}

	const wallet = useSelector(state =>
		state.wallets.data ? state.wallets.data[0] : null
	)

	const [walletInfo, setWalletInfo] = useState()

	useEffect(() => {
		const setWalletAsync = async () => {
			if (wallet) {
				console.log(coin)
				if (coin.slug === 'ETH') {
					const info = await ethManager.getWalletFromMnemonic(wallet.backup)
					setWalletInfo(info)
				} else if (coin.slug === 'BSC') {
					console.log('before')
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
					<AppText style={{ alignItems: 'center' }}>
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
				/>
			</View>
		</View>
	)
}
