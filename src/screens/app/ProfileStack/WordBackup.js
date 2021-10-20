import React, { useEffect, useState } from 'react'
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
import QRCode from 'react-native-qrcode-svg';

export default function WordBackup({ navigation }) {
	const dispatch = useDispatch()
	const [backup, setBackup] = useState('')

	useEffect(() => {
		const words = WalletManager.generateMnemonic()
		setBackup(words)
	}, [])

	const handleAddWallet = () => {
		dispatch(finalCreateWallet(backup))
	}

	const backupList = backup.split(' ').map((word, i) => `${i + 1}. ${word}`)

	const handleCopy = () => {
		Clipboard.setString(backup)
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
					<TouchableOpacity style={{ ...globalStyles.flex.center }}>
						<AppText
							bold
							color="secondaryColor"
							style={{ paddingVertical: 12 }}
							onPress={handleCopy}
						>
							Copy to clipboard
						</AppText>
					</TouchableOpacity>
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
