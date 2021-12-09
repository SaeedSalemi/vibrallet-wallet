import React, { useState, useEffect } from 'react'
import { Pressable, View } from 'react-native'
import AppButton from '../../../components/common/AppButton'
import AppIcon from '../../../components/common/AppIcon'
import AppText from '../../../components/common/AppText'
import AlertItem from '../../../components/PriceAlert/AlertItem'
import PriceCalculator from '../../../components/PriceAlert/PriceCalculator'
import Screen from '../../../components/Screen'
import { routes } from '../../../config/routes'
import { globalStyles } from '../../../config/styles'
import HttpService from '../../../services/HttpService'

export default function NewCoinAlertScreen({ route, navigation }) {
	const { coin, coinPrice } = route.params || {}
	console.log('coin item', coin)
	const [state, setState] = useState({
		alert_type: "On time"
	})

	const [price, setPrice] = useState()

	coin.price = coinPrice
	coin.lastPrice = coinPrice

	return (
		<Screen
			edges={['bottom']}
			style={[globalStyles.gapScreen, { paddingVertical: 8 }]}
		>
			<AlertItem item={coin} index={1} length={1} />
			<PriceCalculator coin={coin} style={{}} />
			<View
				style={{
					flex: 1,
					alignItems: 'center',
					marginTop: 30
				}}
			>
				<Pressable
					onPress={() => {
						navigation.navigate(routes.itemPicker, {
							items: [
								{ id: "on_time", title: "On time" },
								{ id: "price_time", title: "Price time" },
								{ id: "each_time", title: "Each time" }
							],
							onSelect: (item) => {
								setState({ ...state, alert_type: item.title })
							}
						})
					}}

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
					<AppText>{state.alert_type}</AppText>
					<AppIcon name="arrowRightCircle" />
				</Pressable>
			</View>
			<AppButton
				title="Create Alert"
				onPress={() => navigation.navigate(routes.priceAlert, { show: true })}
			/>
		</Screen>
	)
}
