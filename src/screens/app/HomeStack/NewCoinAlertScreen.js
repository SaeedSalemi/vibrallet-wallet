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
import { price_alerts } from '../../../config/async-storage.json'
export default function NewCoinAlertScreen({ route, navigation }) {
	const { coin, coinPrice } = route.params || {}
	const [state, setState] = useState({
		alert_type: "On time"
	})

	coin.price = coinPrice
	coin.lastPrice = coinPrice

	const handleCreateAlert = async () => {
		let localStoredPriceAlerts = await AsyncStorage.getItem(price_alerts)

		if (localStoredPriceAlerts) {
			const parsedPriceAlerts = JSON.parse(localStoredPriceAlerts)
			// docs: coin local price is exsists

			if (parsedPriceAlerts.hasOwnProperty(coin.symbol)) {

				parsedPriceAlerts[coin.symbol].push({
					price: state.price,
					status: false,
					logo: coin.logo,
					name: coin.name,
					alert_type: state.alert_type
				})

				// console.log('parsed to obj', parsedPriceAlerts)
				await AsyncStorage.setItem(price_alerts, JSON.stringify(parsedPriceAlerts))
			} else {

				const newPriceAlertItem = {
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

				const mergeCoinObjects = Object.assign(parsedPriceAlerts, newPriceAlertItem)
				await AsyncStorage.setItem(price_alerts, JSON.stringify(mergeCoinObjects))
			}

		} else {
			// create a new price alert for a first time.

			const newPriceAlertItem = {
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

			console.log("New Alert =>", newPriceAlertItem)

			await AsyncStorage.setItem(price_alerts, JSON.stringify(newPriceAlertItem))

		}


		showMessage({
			message: `Your Price has been set.`,
			description: null,
			type: 'success',
			icon: null,
			duration: 2500,
			style: { backgroundColor: "#6BC0B1" },
			position: 'top'
		})
		navigation.navigate(routes.appTab)

	}

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
				onPress={handleCreateAlert}
			/>
		</Screen>
	)
}
