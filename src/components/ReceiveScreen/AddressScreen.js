import React, { useMemo } from 'react'
import { View, Image, ScrollView } from 'react-native'
import { Images } from '../../assets'
import { globalStyles } from '../../config/styles'
import AppButton from '../common/AppButton'
import AppInput from '../common/AppInput/AppInput'
import AppText from '../common/AppText'

export default function AddressScreen({ route }) {
	const { coin } = route.params || {}
	const buttons = useMemo(
		() => [
			{
				title: 'Copy',
				color: 'secondaryColor',
			},
			{
				title: 'Share',
				color: 'secondaryColor',
			},
		],
		[]
	)
	return (
		<View style={{ ...globalStyles.gapScreen }}>
			<ScrollView>
				<View style={{ alignItems: 'center' }}>
					<Image style={{ marginVertical: 42 }} source={Images.qrCode} />
					<AppText style={{ alignItems: 'center' }}>
						Your {coin.title} Address
					</AppText>
				</View>
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
						0xefwew88fwe8f778se87f87s78ef78se wefsedf43
					</AppText>
				</View>

				<AppInput
					containerStyle={{ flex: 1 }}
					endText="Set"
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
