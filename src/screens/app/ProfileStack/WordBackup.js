import React, { useMemo } from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Images } from '../../../assets'
import AppButton from '../../../components/common/AppButton'
import AppText from '../../../components/common/AppText'
import HR from '../../../components/common/HR/HR'
import Screen from '../../../components/Screen'
import { routes } from '../../../config/routes'
import { globalStyles } from '../../../config/styles'
import { finalCreateWallet } from '../../../redux/modules/wallets'
import QRCode from 'react-native-qrcode-svg';

export default function WordBackup({ navigation }) {
	const dispatch = useDispatch()

	const handleAddWallet = () => {
		dispatch(finalCreateWallet())
	}

	const items = useMemo(
		() => [
			'1.Tape',
			'2.Liberty',
			'3.Manual',
			'4.Upgrade',
			'5.Diet',
			'6.Quiet',
			'7.Eye',
			'8.Where',
			'9.skin',
			'10.Find',
			'11.limb',
			'12.Slush',
		],
		[]
	)
	return (
		<Screen edges={['bottom']} style={{ ...globalStyles.gapScreen }}>
			<View style={{ paddingVertical: 18, ...globalStyles.flex.center }}>
				{/* <Image source={Images.qrCode} /> */}

				<QRCode
					value="http://awe1111some.link.qr"
				/>

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

							paddingHorizontal: 18,
							paddingVertical: 9,
							...globalStyles.flex.row,
							flexWrap: 'wrap',
						}}
					>
						{items.map((item, i) => (
							<View style={{ width: '25%', paddingVertical: 9 }} key={i}>
								<AppText>{item}</AppText>
							</View>
						))}
					</View>
					<HR />
					<TouchableOpacity style={{ ...globalStyles.flex.center }}>
						<AppText
							bold
							color="secondaryColor"
							style={{ paddingVertical: 12 }}
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
