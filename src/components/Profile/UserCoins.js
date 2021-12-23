import React, { useRef, useState, useEffect, useContext, useLayoutEffect } from 'react'
import { View, Image, Dimensions } from 'react-native'
import AppText from '../common/AppText'
import { Images } from '../../assets'
import Carousel from 'react-native-snap-carousel'
import { TouchableOpacity } from 'react-native'
import { globalStyles } from '../../config/styles'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MarketIcon from '../common/MarketIcon/MarketIcon'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { SvgUri } from 'react-native-svg'
import { Context } from '../../context/Provider'
import HttpService from '../../services/HttpService'
import { SvgCssUri } from 'react-native-svg';

const slideShowItems = [
	{
		icon: (
			<MarketIcon color={globalStyles.Colors.ethereum} size={39}>
				<MaterialCommunityIcons size={20} name="ethereum" color="#7037C9" />
			</MarketIcon>
		),
		title: 'Ethereum',
		value: '0 ETH',
	},
	{
		icon: (
			<MarketIcon color={globalStyles.Colors.ethereum} size={39}>
				<MaterialCommunityIcons size={20} name="ethereum" color="#7037C9" />
			</MarketIcon>
		),
		title: 'Ethereum',
		value: '0 ETH',
	},
	{
		icon: (
			<MarketIcon color={globalStyles.Colors.ethereum} size={39}>
				<MaterialCommunityIcons size={20} name="ethereum" color="#7037C9" />
			</MarketIcon>
		),
		title: 'Ethereum',
		value: '0 ETH',
	},
]
const { width: screenWidth } = Dimensions.get('window')
export default function UserCoins() {
	const carouselRef = useRef(null)
	const [active, setActive] = useState(0)
	const { coins, hideCoinHandler } = useContext(Context)

	const [data, setData] = useState([])
	useLayoutEffect(() => {
		for (let item of coins) {
			try {
				new HttpService("",
					{
						"uniqueId": "123",
						"action": "priceChart",
						"data": {
							// "symbol": `${item.symbol}`,
							"symbol": `${item.symbol}`,
							"timeframe": "30m",
							"limit": 7,
							"responseType": "url",
							"width": 100,
							"height": 50
						}
					}).Post(res => {
						if (res?.success === true) {
							item.svgUri = res.data.url
						}
					})
			} catch (error) {
				console.log('error to load coin svg', error)
				item.svgUri = ""
			}
		}

		setData(coins)
	}, [])

	const renderItem = ({ item }) => {
		return (
			<View
				style={{
					backgroundColor: globalStyles.Colors.inputColor,
					padding: 16,
					borderRadius: 16,
					marginVertical: 4,
				}}
			>
				<View
					style={{ ...globalStyles.flex.between, ...globalStyles.flex.row }}
				>
					<View>
						<Image resizeMode={"stretch"}
							style={{ width: 30, height: 30, }} source={{ uri: item.logo }} />
					</View>
					<View style={{ alignSelf: 'center' }}>
						<TouchableOpacity onPress={() => { hideCoinHandler(item.symbol) }}>
							<FontAwesome5
								name={item.hide ? 'eye-slash' : 'eye'}
								color={globalStyles.Colors.text2}
								size={25}
							/>
						</TouchableOpacity>
					</View>
				</View>
				<View>
					<View
						style={{
							marginVertical: 8,
							...globalStyles.flex.row,
							alignItems: 'center',
							...globalStyles.flex.between,
						}}
					>
						<View>
							<AppText typo="xs">{item.name}</AppText>
							<AppText
								color="text2"
								style={{ marginVertical: 2 }}
								bold
								typo="sm"
							>
								{item.balance} {item.symbol}
							</AppText>
						</View>
						<View >
							{/* <SvgUri
								width={120}
								uri={item.svgUri}
							// uri={"https://api.vibrallet.com/dl/priceChart/price-chart-BTC-30m-7-250x50.svg"}
							/> */}

							<SvgCssUri
								width="100%"
								uri={item.svgUri}
							/>
						</View>
					</View>
				</View>
			</View>
		)
	}
	return (
		<View>
			<AppText bold color="text3" typo="tiny" style={{ marginHorizontal: 20 }}>
				Your Coins
			</AppText>
			<View style={{ ...globalStyles.flex.center }}>
				<Carousel
					sliderWidth={400}
					sliderHeight={200}
					layout="tinder"
					ref={carouselRef}
					lockScrollWhileSnapping
					itemWidth={330}
					onSnapToItem={index => setActive(index)}
					// data={slideShowItems}
					data={data}
					renderItem={renderItem}
				/>
			</View>
		</View>
	)
}
