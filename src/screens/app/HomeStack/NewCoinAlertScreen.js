import React from 'react'
import { Image, View } from 'react-native'
import { Images } from '../../../assets'
import AppButton from '../../../components/common/AppButton'
import AppIcon from '../../../components/common/AppIcon'
import AppText from '../../../components/common/AppText'
import AlertItem from '../../../components/PriceAlert/AlertItem'
import Screen from '../../../components/Screen'
import { routes } from '../../../config/routes'
import { globalStyles } from '../../../config/styles'
import { coins } from './CreatePriceAlertScreen'

export default function NewCoinAlertScreen({ navigation }) {
	return (
		<Screen
			edges={['bottom']}
			style={[globalStyles.gapScreen, { paddingVertical: 8 }]}
		>
			<AlertItem item={coins[1]} index={1} length={1} />
			<View
				style={{
					flex: 1,
					alignItems: 'center',
					justifyContent: 'space-evenly',
				}}
			>
				<Image source={Images.alertUsd} />
				<Image source={Images.alertRange} />
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
