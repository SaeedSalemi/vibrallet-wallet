import { useRoute } from '@react-navigation/core'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { ScrollView, View, FlatList, RefreshControl } from 'react-native'
// import { TouchableOpacity } from 'react-native-gesture-handler'
// import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
// import AppIcon from '../../../components/common/AppIcon'
import AppInput from '../../../components/common/AppInput/AppInput'
import AppText from '../../../components/common/AppText'
import Coin from '../../../components/common/Coin'
import Screen from '../../../components/Screen'
import { routes } from '../../../config/routes'
import { useContext } from 'react'
import { Context } from '../../../context/Provider'
import HttpService from '../../../services/HttpService'
import { showMessage } from 'react-native-flash-message'

const wait = timeout => {
	return new Promise(resolve => setTimeout(resolve, timeout));
};

export default function SelectCoinScreen({ navigation, route }) {
	const { coins, setCoin } = useContext(Context)
	console.log('coins in select coin', coins)
	const [state, setState] = useState({
		rate: 0,
		percentChange: 0,
	})

	const [filteredCoins, setFilteredCoins] = useState([])
	const [refreshing, setRefreshing] = React.useState(false);

	useEffect(() => {
		setFilteredCoins(coins.filter(c => !c.hide))
	}, [])

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		setFilteredCoins([])
		wait(0).then(() => {
			setFilteredCoins(coins.filter(c => !c.hide))
			setRefreshing(false)
		});
	}, []);


	useLayoutEffect(() => {
		for (let item of coins) {
			new HttpService("", {
				"uniqueId": "abc1",
				"action": "quotedPrice",
				"data": {
					"symbol": `${item.symbol}USDT`
				}
			}).Post(res => {
				setState(res.data)
			})
		}
	}, [])
	const [filterdItems, setFilterItems] = useState(coins)
	const arrayHolder = coins
	const searchFilterFunction = text => {
		const includes = str => str.toLowerCase().includes(text.toLowerCase())
		const newData = arrayHolder.filter(item => {
			if (includes(item.name) || includes(item.name)) {
				return item
			}
		})
		// setFilterItems(newData)
		setFilteredCoins(newData)
	}

	const { params } = useRoute()
	const mode = params?.mode || 'send'


	const hideCoinHandler = coin => {
		showMessage({
			message: `${coin.name} was hide successfully.`,
			description: null,
			type: 'success',
			icon: null,
			duration: 1000,
			style: { backgroundColor: "#6BC0B1" },
			position: 'top'
		})
		coins.map(item => {
			if (item.name === coin.name) {
				item.hide = true
			}
		})
		setCoin(coins)
	}



	return (
		<Screen edges={['bottom']}>
			<View style={{ paddingTop: 16 }}>
				<AppInput
					icon="search"
					placeholder="Search Coins..."
					onChangeText={text => {
						searchFilterFunction(text)
					}}
				/>
			</View>
			{/* <View style={{ flex: 2 }}>
				<AppText typo="tiny" color="text2">
					Suggested
				</AppText>
				<View style={{ flex: 1, paddingVertical: 16 }}>
					<ScrollView>
						{filterdItems.map((coin, i) => (
							<Coin
								key={i}
								coin={coin}
								index={i}
								length={coins.length}
								noChart
								noPrice
								onPress={() =>
									navigation.navigate(routes[mode], { coin: coin })
								}
							/>
						))}
					</ScrollView>
				</View>
			</View> */}
			<View style={{ flex: 3 }}>
				<AppText typo="tiny" color="text2">
					All Coins
				</AppText>
				<View style={{ flex: 1, paddingVertical: 18 }}>
					<View>

						<FlatList
							style={{ marginVertical: 16 }}
							data={filteredCoins}
							refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
							renderItem={({ item, index }) => <Coin
								coin={item}
								index={index}
								length={filteredCoins.length}
								onPress={() => {
									// navigate(routes.coinDetailWithoutHistory, { coin: item })
									navigate(routes[mode], { coin: item })
								}}
								onHideHandler={hideCoinHandler}
							/>}
							keyExtractor={(_, index) => index.toString()}
						/>
						{/* {filterdItems.map((coin, i) => (
							<Coin
								key={i}
								onPress={() =>
									navigation.navigate(routes[mode], { coin: coin })
								}
								coin={coin}
								index={i}
								length={coins.length}
								noChart
								noPrice
							/>
						))} */}
					</View>
				</View>
			</View>
		</Screen>
	)
}
