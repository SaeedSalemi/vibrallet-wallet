import React from 'react'
import { View } from 'react-native'
import AppButton from '../../../components/common/AppButton'
import AppIcon from '../../../components/common/AppIcon'
import AppText from '../../../components/common/AppText'
import AlertItem from '../../../components/PriceAlert/AlertItem'
import PriceCalculator from '../../../components/PriceAlert/PriceCalculator'
import Screen from '../../../components/Screen'
import { routes } from '../../../config/routes'
import { globalStyles } from '../../../config/styles'

export default function NewCoinAlertScreen({ route, navigation }) {
	const { coin } = route.params || {}

	return (
		<Screen
			edges={['bottom']}
			style={[globalStyles.gapScreen, { paddingVertical: 8 }]}
		>
			<AlertItem item={coin} index={1} length={1} />
			<PriceCalculator coin={coin} />
			<View
				style={{
					flex: 1,
					alignItems: 'center',
					// justifyContent: 'space-evenly',
				}}
			>
				<View
					style={{
						backgroundColor: globalStyles.Colors.inputColor,
						borderRadius: 10,
						height: 55,
						alignItems: 'center',
						justifyContent: 'space-between',
						alignSelf: 'stretch',
						flexDirection: 'row',
						paddingHorizontal: 16,
					}}
				>
					<AppText>One time</AppText>
					<AppIcon name="arrowDownCircle" />
				</View>
			</View>
			<AppButton
				title="Create Alert"
				onPress={() => navigation.navigate(routes.priceAlert, { show: true })}
			/>
		</Screen>
	)
}
