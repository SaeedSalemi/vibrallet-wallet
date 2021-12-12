import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import React, { useState, useEffect } from 'react'
import { Pressable, View } from 'react-native'
import { showMessage } from 'react-native-flash-message'
import AppButton from '../../../components/common/AppButton'
import AppIcon from '../../../components/common/AppIcon'
import AppText from '../../../components/common/AppText'
import AlertItem from '../../../components/PriceAlert/AlertItem'
import PriceCalculator from '../../../components/PriceAlert/PriceCalculator'
import Screen from '../../../components/Screen'
import { routes } from '../../../config/routes'
import { globalStyles } from '../../../config/styles'

export default function NewCoinAlertScreen({ route, navigation }) {
	const { coin, coinPrice } = route.params || {}
	const [state, setState] = useState({
		alert_type: "On time"
	})

	coin.price = coinPrice
	coin.lastPrice = coinPrice

	return (
		<Screen
			edges={['bottom']}
			style={[globalStyles.gapScreen, { paddingVertical: 8 }]}
		>
			<AlertItem item={coin} index={1} length={1} />
			<PriceCalculator onPriceChange={(price) => { setState({ ...state, price }) }} coin={coin} style={{}} />
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
				onPress={async () => {
					let cacheAlerts = await AsyncStorage.getItem("alerts")
					if (cacheAlerts) {
						cacheAlerts = JSON.parse(cacheAlerts)
						if (cacheAlerts.hasOwnProperty(coin.symbol)) {

							cacheAlerts[coin.symbol].push({
								price: state.price,
								status: false,
								logo: coin.logo,
								name: coin.name,
								alert_type: state.alert_type
							})
							await AsyncStorage.setItem("alerts", JSON.stringify(cacheAlerts))
						} else {
							const createdAlert = {
								[coin.symbol]: [
									{
										price: state.price,
										status: false,
										logo: coin.logo,
										name: coin.name,
										alert_type: state.alert_type
									}
								]
							}
							const finalResult = Object.assign(cacheAlerts, createdAlert)
							await AsyncStorage.setItem("alerts", JSON.stringify(finalResult))
						}
					}
					showMessage({
						message: `Your Price has been set`,
						description: null,
						type: 'success',
						icon: null,
						duration: 2500,
						style: { backgroundColor: "#6BC0B1" },
						position: 'top'
					})
					navigation.navigate(routes.setPriceAlert, { coin: coin })
				}}
			/>
		</Screen>
	)
}
