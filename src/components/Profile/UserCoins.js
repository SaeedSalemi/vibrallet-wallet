import React, { useRef, useState } from 'react'
import { View, Image, Dimensions } from 'react-native'
import AppText from '../common/AppText'
import { Images } from '../../assets'
import Carousel from 'react-native-snap-carousel'
import { TouchableOpacity } from 'react-native'
import { globalStyles } from '../../config/styles'
const ENTRIES1 = [
	{
		title: 'Beautiful and dramatic Antelope Canyon',
		subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
		illustration: Images.yourCoins,
	},
	{
		title: 'Earlier this morning, NYC',
		subtitle: 'Lorem ipsum dolor sit amet',
		illustration: Images.yourCoins,
	},
	{
		title: 'White Pocket Sunset',
		subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
		illustration: Images.yourCoins,
	},
	{
		title: 'Acrocorinth, Greece',
		subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
		illustration: Images.yourCoins,
	},
	{
		title: 'The lone tree, majestic landscape of New Zealand',
		subtitle: 'Lorem ipsum dolor sit amet',
		illustration: Images.yourCoins,
	},
]
const { width: screenWidth } = Dimensions.get('window')
export default function UserCoins() {
	const carouselRef = useRef(null)
	const [active, setActive] = useState(0)

	const renderItem = ({ item }) => {
		return (
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				<Image
					style={{ flex: 1, borderRadius: 10 }}
					source={item.illustration}
					resizeMode="contain"
				/>
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
					sliderWidth={354}
					layout="tinder"
					ref={carouselRef}
					lockScrollWhileSnapping
					itemWidth={200}
					onSnapToItem={index => setActive(index)}
					data={ENTRIES1}
					renderItem={renderItem}
				/>
			</View>
		</View>
	)
}
