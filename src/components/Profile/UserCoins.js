import React, { useRef, useState, useEffect } from 'react'
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
					<View>{item.icon}</View>
					<View style={{ alignSelf: 'center' }}>
						<FontAwesome5
							name="eye-slash"
							color={globalStyles.Colors.text2}
							size={25}
						/>
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
							<AppText typo="xs">{item.title}</AppText>
							<AppText
								color="text2"
								style={{ marginVertical: 2 }}
								bold
								typo="md"
							>
								{item.value}
							</AppText>
						</View>
						<View>
							<SvgUri
								width={100}
								uri="https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/6758.svg"
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
					data={slideShowItems}
					renderItem={renderItem}
				/>
			</View>
		</View>
	)
}
