import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { View, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import AppButton from '../../../components/common/AppButton'
import AppText from '../../../components/common/AppText'
import NoPriceAlert from '../../../components/PriceAlert/NoPriceAlert'
import PPriceAlertItem from '../../../components/PriceAlert/PriceAlertItem'
import PriceAlerts from '../../../components/PriceAlert/PriceAlerts'
import Screen from '../../../components/Screen'
import { routes } from '../../../config/routes'
import { globalStyles } from '../../../config/styles'
import { Images } from '../../../assets'
import PriceItem from '../../../components/PriceAlert/PriceItem'

export default function PriceAlertScreen({ route }) {
	const show = route.params?.show
	const { navigate } = useNavigation()
	const [state, setState] = useState({
		items: []
	})

	useEffect(() => {
		AsyncStorage.getItem("alerts").then((data) => {
			state.items = JSON.parse(data)
			setState({ ...state })
			// ==================
			for (const [key, value] of Object.entries(state.items)) {
				for (let item of value) {
					console.log('_it', <PriceItem name={item.name} logo={item.logo} symbol={item.symbol} />)
				}
			}

		})

	}, [])


	const renderItemPrice = () => {
		const items = []
		for (const [key, value] of Object.entries(state.items)) {
			for (let item of value) {
				items.push(<PriceItem name={item.name} logo={item.logo} symbol={item.symbol} />)
			}
		}
		return items
	}




	return (
		<Screen edges={['bottom']}>
			{/* {show ? <PriceAlerts /> : <NoPriceAlert />} */}

			<View style={{ flex: 1 }}>
				{Object.keys(state.items).length > 0 ? Object.keys(state.items).map((item, i) => {
					// console.log("dani logger", item, state.items[item].coin)
					const coin = state.items[item]
					console.log('coin is here!', state.items[item])
					return (
						<View style={{ flex: 1 }} key={i}>
							<PPriceAlertItem
								item={{ name: coin.name, logo: coin.logo }}
								name={coin.name}
								index={i}
								length={Object.keys(state.items).length}
								initialOpen={i === 0}
							/>
						</View>
					)
				}) : <View style={{ flex: 1, ...globalStyles.flex.center }}>
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
				}
				<View>
					<AppButton
						title="Create New Alert"
						onPress={() => navigate(routes.createPriceAlert)}
					/>
				</View>
			</View>

		</Screen>
	)
}
