import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { View, Image, Text } from 'react-native'
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
import { price_alerts } from './../../../config/async-storage.json'

export default function PriceAlertScreen({ route }) {
	const show = route.params?.show
	const { navigate } = useNavigation()
	const [state, setState] = useState({
		items: []
	})

	useEffect(() => {
		AsyncStorage.getItem(price_alerts).then((data) => {
			state.items = JSON.parse(data)
			setState({ ...state })
		})

	}, [])


	return (
		<Screen edges={['bottom']}>
			{/* {show ? <PriceAlerts /> : <NoPriceAlert />} */}
			<View style={{ flex: 1 }}>

				{state.items && Object.keys(state.items).length > 0 ? <View style={{ flex: 1 }}>
					{Object.keys(state.items).map(function (key) {
						return state.items[key].map((_item, i) => {
							return <PriceItem key={i} logo={_item.logo} name={_item.name} price={_item.price} type={_item.alert_type} status={_item.status} />
						})
					})}</View>
					: <View style={{ flex: 1, ...globalStyles.flex.center }}>
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
