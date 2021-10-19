import { CommonActions } from '@react-navigation/routers'
import React from 'react'
import { ScrollView, View } from 'react-native'
import AppButton from '../../../components/common/AppButton'
import AppInput from '../../../components/common/AppInput/AppInput'
import Screen from '../../../components/Screen'
import { routes } from '../../../config/routes'
import { globalStyles } from '../../../config/styles'

export default function BuyScreen({ navigation, route }) {
	const handleBuy = () => {
		navigation.reset({
			index: 1,
			routes: [
				{ name: routes.appTab },
				{ name: routes.rewards, params: { tabIndex: 1 } },
			],
		})
	}

	return (
		<Screen edges={['top', 'bottom']}>
			<ScrollView>
				<AppInput
					label="Choose Country"
					imageIcon="unitedState"
					value="United States"
					endIcon="arrow-down"
				/>
				<View style={{ marginVertical: 32 }}>
					<AppInput
						label="Credit Card"
						labelBadge="Fastest"
						imageIcon="moonpay"
						value="Moonpay"
						endIcon="info"
						message="Transfer fee is 3.49%. Took Time: 15 Minutes"
					/>
				</View>
				<AppInput
					label="Bank Transfer"
					labelBadge="Cheapest"
					labelBadgeMode="primaryColor"
					icon="arrows-alt-h"
					value="Transak"
					endIcon="info"
					message="Transfer fee is 3.49%. Took Time: 15 Minutes"
				/>
			</ScrollView>
			<AppButton
				title="Buy"
				typo="sm"
				bold
				customStyle={{ backgroundColor: globalStyles.Colors.success }}
				onPress={handleBuy}
			/>
		</Screen>
	)
}
