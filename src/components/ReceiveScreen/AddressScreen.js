import React, { useEffect, useMemo, useState, useContext } from 'react'
import { View, Image, ScrollView } from 'react-native'
import { useSelector } from 'react-redux'
import ethManager from '../../blockchains/EthManager'
import { globalStyles } from '../../config/styles'
import AppButton from '../common/AppButton'
import AppInput from '../common/AppInput/AppInput'
import AppText from '../common/AppText'
import QRCode from 'react-native-qrcode-svg'
import bscManager from '../../blockchains/BscManager'
import Clipboard from '@react-native-community/clipboard'
import { showMessage } from 'react-native-flash-message'
import { share } from '../../utils/Functions'
import { Context } from '../../context/Provider'
import bitcoinManager from '../../blockchains/BitcoinManager'

export default function AddressScreen({ route, navigation }) {
	const { coin } = route.params || {}
	const [state, setState] = useState({
		amount: 0,
	})

	const handleShare = (symbol, address, amount) => {
		amount = parseFloat(amount)
		if (amount > 0)
			share(
				'Recive token',
				`https://app.vibrallet.com/send?coin=${symbol}&address=${address}&amount=${amount}`
			)
		else {
			showMessage({
				message: `Amount couldn't be 0 or less.`,
				description: null,
				type: 'danger',
				icon: null,
				duration: 3000,
				style: { backgroundColor: '#e74c3c' },
				position: 'top',
			})
		}
	}
	return (
		<View style={{ ...globalStyles.gapScreen }}>
			<ScrollView>
				<View style={{ alignItems: 'center' }}>
					{coin?.address ? (
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
								value={coin.address}
								logoBackgroundColor="transparent"
							/>
						</View>
					) : null}
					<AppText typo="tiny" style={{ alignItems: 'center' }}>
						Your {coin.name} Address
					</AppText>
				</View>
				{coin?.address ? (
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
							{coin?.address}
						</AppText>
					</View>
				) : null}

				<AppInput
					containerStyle={{ flex: 1 }}
					endText="Set"
					keyboardType="numeric"
					label="Advanced"
					placeholder={`Set ${coin.name} amount`}
					onChangeText={value => setState({ ...state, amount: value })}
				/>
			</ScrollView>
			<View
				style={{ ...globalStyles.flex.row, justifyContent: 'space-between' }}
			>
				<AppButton
					bold
					title="Share"
					onPress={() => handleShare(coin.symbol, coin.address, state.amount)}
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
						Clipboard.setString(coin?.address)
						console.log('amr', coin?.address)
						showMessage({
							message: 'Address cpied to clipbloard successfully',
							description: null,
							type: 'success',
							icon: null,
							duration: 1000,
							style: { backgroundColor: '#6BC0B1' },
							position: 'top',
						})
					}}
				/>
			</View>
		</View>
	)
}
