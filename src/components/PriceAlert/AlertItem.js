import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/core'
import { View, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { routes } from '../../config/routes'
import { globalStyles } from '../../config/styles'
import AppIcon from '../common/AppIcon'
import AppText from '../common/AppText'
import HR from '../common/HR/HR'
import MarketIcon from '../common/MarketIcon/MarketIcon'
import HttpService from '../../services/HttpService'

export default function AlertItem({ item, index, length }) {
	const { navigate } = useNavigation()

	const [state, setState] = useState()

	useEffect(() => {

		new HttpService("", {
			"uniqueId": "abc1",
			"action": "quotedPrice",
			"data": {
				"symbol": `${item.symbol}USDT`
			}
		}).Post(res => {
			if (res) {
				setState(parseFloat(res.data.rate).toFixed(2))
			}
		})


	}, [])


	return (
		<TouchableOpacity
			activeOpacity={0.75}
			onPress={() => navigate(routes.newCoinAlert, { coin: item, coinPrice: state })}
		>
			<View
				style={{
					marginVertical: 16,
					flexDirection: 'row',
					alignItems: 'center',
				}}
			>
				{/* <AppIcon name={item.icon} /> */}
				{/* <MarketIcon size={50} color={globalStyles.Colors.inputColor2}>
					{item.icon}
				</MarketIcon> */}
				<Image resizeMode={"stretch"}
					style={{ width: 30, height: 30, }} source={{ uri: item.logo }} />
				<View style={{ flex: 1, paddingHorizontal: 12 }}>
					<AppText bold typo="sm">
						{item.name}
					</AppText>
					<AppText typo="dot" color="text3">
						{item.symbol}
					</AppText>
				</View>
				<AppText typo="sm" bold>
					{state}
					{/* {item.lastPrice} */}
				</AppText>
			</View>
			{index + 1 === length ? null : <HR style={{ marginVertical: 4 }} />}
		</TouchableOpacity>
	)
}
