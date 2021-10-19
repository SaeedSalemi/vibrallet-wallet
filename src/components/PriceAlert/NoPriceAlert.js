import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { Image, View } from 'react-native'
import { Images } from '../../assets'
import { routes } from '../../config/routes'
import { globalStyles } from '../../config/styles'
import AppButton from '../common/AppButton'
import AppText from '../common/AppText'

export default function NoPriceAlert() {
	const { navigate } = useNavigation()

	return (
		<View style={{ flex: 1 }}>
			<View style={{ flex: 1, ...globalStyles.flex.center }}>
				<Image source={Images.noPriceAlert} />
				<AppText color="text2" style={{ marginTop: 16, marginBottom: 8 }}>
					No Price Alert Set
				</AppText>
				<AppText typo="tiny" color="text3">
					Get notified when crypto price changes,
				</AppText>
				<AppText typo="tiny" color="text3">
					So you can buy and sell at the perfect time.
				</AppText>
			</View>
			<View>
				<AppButton
					title="Create New Alert"
					onPress={() => navigate(routes.createPriceAlert)}
				/>
			</View>
		</View>
	)
}
