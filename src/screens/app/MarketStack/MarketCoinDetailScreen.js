import React, { useEffect, useState } from 'react'
import {
	Image,
	Modal,
	ScrollView,
	TouchableOpacity,
	View,
	ViewPropTypes,
} from 'react-native'
import { routes } from '../../../config/routes'
import { globalStyles } from '../../../config/styles'
import AppText from '../../../components/common/AppText'
import Header from '../../../components/Header/Header'
import Screen from '../../../components/Screen'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Images } from '../../../assets'
import MarketCoinDetailItems from '../../../components/Market/MarketCoinDetailItems'
import AppButton from '../../../components/common/AppButton'
import { useDispatch, useSelector } from 'react-redux'
import { setModal } from '../../../redux/modules/appSettings'
import SetAlert from '../../../components/Market/SerAlert'
import { useNavigation } from '@react-navigation/core'
import TradingViewWidget from '../../../components/TradingViewWidget/TradingViewWidget'

const greenItem = '#14331d'
const redItem = '#4d181a'
const valueItems = [
	{ title: '24h Low', value: '1,732.68' },
	{ title: '24h Vol', value: '3,350,179,232' },
	{ title: '24h High', value: '1,920.34' },
]
const timeDurationItems = [
	{ title: '1m', active: true },
	{ title: '15m' },
	{ title: '1H' },
	{ title: '4H' },
	{ title: '1D' },
	{ title: 'More' },
]
const performanceItems = [
	{ value: '+1.42%', duration: '1W', bgColor: greenItem, color: 'success' },
	{ value: '+1.42%', duration: '1M', bgColor: redItem, color: 'failure' },
	{ value: '+1.42%', duration: '3M', bgColor: greenItem, color: 'success' },
	{ value: '+1.42%', duration: '6M', bgColor: redItem, color: 'failure' },
	{ value: '+1.42%', duration: 'YTD', bgColor: greenItem, color: 'success' },
	{ value: '+1.42%', duration: '1Y', bgColor: redItem, color: 'failure' },
]
// const keysItems = [
// 	{ title: 'Market Cap:', value: `$${parseFloat(coin.market_cap).toFixed(5)}` },
// 	{ title: 'Max Supply:', value: 'Unlimited Supply' },
// 	{ title: 'Minable:', value: 'Yes' },
// 	{ title: 'Type', value: 'Coin' },
// 	{ title: 'All Time High:', value: '2,111.34 USD (30 Dec, 2020)' },
// ]
export default function MarketCoinDetailScreen({ route, navigation }) {
	const { coin } = route.params || {}
	const [keyItems, setKeyItems] = useState([
		{ title: 'Market Cap:', value: `$${parseFloat(coin.market_cap).toFixed(5)}` },
		{ title: 'Max Supply:', value: 'Unlimited Supply' },
		{ title: 'Minable:', value: 'Yes' },
		{ title: 'Type', value: 'Coin' },
		{ title: 'All Time High:', value: '2,111.34 USD (30 Dec, 2020)' },
	])
	console.log('coin item', coin)
	const { navigate } = useNavigation()
	const dispatch = useDispatch()
	const handleCloseModal = () => {
		dispatch(setModal(false))
		navigation.navigate(routes.newCoinAlert, { coin })
	}
	useEffect(() => {
		dispatch(setModal(false))
	}, [])
	const visible = useSelector(state => state.appSettings.showModal)

	return (
		<Screen>
			<ScrollView>
				<View style={{ ...globalStyles.flex.center, marginVertical: 32 }}>
					<AppText bold typo="xxl">
						${parseFloat(coin.price).toFixed(3)}
					</AppText>
					<View style={{ ...globalStyles.flex.row }}>
						<AppText
							color={coin.percent_change_24h > 0 ? 'success' : 'failure'}
							typo="tiny">
							{parseFloat(coin.percent_change_24h).toFixed(2)}
						</AppText>
						<AppText color="text2" typo="tiny" style={{ marginHorizontal: 4 }}>
							(+1.5%)
						</AppText>
					</View>
				</View>
				<View
					style={{
						backgroundColor: globalStyles.Colors.inputColor2,
						paddingHorizontal: 24,
						paddingVertical: 5,
					}}
				>
					<View
						style={{
							...globalStyles.flex.row,
							alignItems: 'center',
							justifyContent: 'space-between',
						}}
					>
						{valueItems.map((item, index) => (
							<View key={index}>
								<AppText typo="tiny">{item.title}</AppText>
								<AppText typo="tiny">{item.value}</AppText>
							</View>
						))}
						<AntDesign
							name="star"
							size={20}
							color={globalStyles.Colors.secondaryColor}
						/>
					</View>
				</View>
				{/* <View
					style={{
						...globalStyles.flex.row,
						marginVertical: 8,
						...globalStyles.flex.between,
					}}
				>
					<View
						style={{
							padding: 8,
							flex: 0.95,
							borderRadius: 5,
							...globalStyles.flex.row,
							...globalStyles.flex.between,
							backgroundColor: globalStyles.Colors.inputColor2,
						}}
					>
						{timeDurationItems.map((item, index) => (
							<TouchableOpacity
								key={index}
								style={{
									width: 35,
									height: 30,
									borderRadius: 5,

									...globalStyles.flex.center,
									backgroundColor: item.active
										? globalStyles.Colors.inputColor
										: null,
								}}
							>
								<AppText color={item.active ? 'secondaryColor' : 'text2'}>
									{item.title}
								</AppText>
							</TouchableOpacity>
						))}
					</View>
					<View
						style={{
							padding: 8,
							...globalStyles.flex.row,
							backgroundColor: globalStyles.Colors.inputColor2,
							borderRadius: 5,
							...globalStyles.flex.between,
							alignItems: 'center',
						}}
					>
						<TouchableOpacity
							style={{
								width: 35,
								height: 30,
								...globalStyles.flex.center,
								borderRadius: 5,
							}}
						>
							<MaterialIcons
								color={globalStyles.Colors.text3}
								name="timeline"
								size={25}
							/>
						</TouchableOpacity>
						<TouchableOpacity
							style={{
								width: 35,
								height: 30,
								...globalStyles.flex.center,
								borderRadius: 5,
								backgroundColor: globalStyles.Colors.inputColor,
							}}
						>
							<MaterialCommunityIcons
								color={globalStyles.Colors.secondaryColor}
								name="cable-data"
								size={25}
							/>
						</TouchableOpacity>
					</View>
				</View> */}
				<View style={{ marginVertical: 16 }}>
					{/* <Image source={Images.marketChartImage} /> */}
					<TradingViewWidget symbol={`${coin.symbol}`} />
				</View>
				<View>
					<View
						style={{
							padding: 16,
							marginVertical: 24,
							borderRadius: 10,
							backgroundColor: globalStyles.Colors.inputColor2,
						}}
					>
						<AppText bold typo="sm">
							Technical
						</AppText>
						<View></View>
					</View>
					<View
						style={{
							padding: 16,
							borderRadius: 10,
							backgroundColor: globalStyles.Colors.inputColor2,
						}}
					>
						<AppText bold typo="sm">
							Performance
						</AppText>
						<View
							style={{
								flex: 1,
								...globalStyles.flex.row,
								flexWrap: 'wrap',
								...globalStyles.flex.between,
								marginTop: 24,
							}}
						>
							{performanceItems.map((item, index) => (
								<MarketCoinDetailItems key={index} items={item} />
							))}
						</View>
					</View>
					<View style={{ flex: 1 }}>
						<View
							style={{
								marginVertical: 24,
								padding: 16,
								backgroundColor: globalStyles.Colors.inputColor2,
								borderRadius: 10,
							}}
						>
							<AppText bold typo="sm">
								Key Stats
							</AppText>
							<View style={{ marginVertical: 24 }}>
								{keyItems.map((item, index) => (
									<View
										key={index}
										style={{ ...globalStyles.flex.row, marginVertical: 4 }}
									>
										<AppText color="text2">{item.title}</AppText>
										<AppText style={{ marginHorizontal: 8 }}>
											{item.value}
										</AppText>
									</View>
								))}
							</View>
							<TouchableOpacity style={{ ...globalStyles.flex.center }}>
								<AppText color="primaryColor">more Stats</AppText>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</ScrollView>
			<View
				style={{
					...globalStyles.flex.row,
					justifyContent: 'space-between',
				}}
			>
				<AppButton
					title="Recieve"
					onPress={() => {
						navigate(routes.receive, { coin: coin })
					}}
					icon="arrow-downward"
					customStyle={{
						flex: 0.48,
						backgroundColor: globalStyles.Colors.success,
					}}
				/>
				<AppButton
					title="Send"
					icon="arrow-upward"
					onPress={() => {
						navigate(routes.send, { coin })
					}}
					customStyle={{
						flex: 0.48,
						backgroundColor: globalStyles.Colors.failure,
					}}
				/>
			</View>
			<SetAlert visible={visible} onPress={handleCloseModal} />
		</Screen>
	)
}
