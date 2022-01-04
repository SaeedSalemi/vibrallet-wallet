import React, { useEffect, useMemo, useRef, useState } from 'react'
import globalStyles from '../../../config/styles'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import {
	View,
	Dimensions,
	StyleSheet,
	TouchableOpacity,
	Image,
	ScrollView,
} from 'react-native'

import Screen from '../../../components/Screen'
import AppText from '../../../components/common/AppText'
import { useFocusEffect } from '@react-navigation/native'
import { Images } from '../../../assets'

const defaultStyles = globalStyles()

import Carousel, { Pagination } from 'react-native-snap-carousel'
import ServiceItem from '../../../components/Home/ServiceItem'
import { routes } from '../../../config/routes'
import Steps from '../../../components/Steps/Steps'
import Header from '../../../components/Header/Header'
import { useSelector } from 'react-redux'
import { showMessage } from 'react-native-flash-message'
import AsyncStorage from '@react-native-async-storage/async-storage'
import AppInput from '../../../components/common/AppInput/AppInput'
import DAppItem from '../../../components/DApps/DAppItem'
import DAppHistoryScreen from './DAppHistoryScreen'
import TopTabBar from '../../../navigation/TopTabBar'
import DAppTabHeader from '../../../components/Home/DAppTabHeader'
import DAppList from '../../../components/DApps/DAppList'

const ENTRIES1 = [
	{
		title: 'Beautiful and dramatic Antelope Canyon',
		subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
		illustration: Images.homeSlider1,
	},
	{
		title: 'Earlier this morning, NYC',
		subtitle: 'Lorem ipsum dolor sit amet',
		illustration: Images.homeSlider2,
	},
	{
		title: 'White Pocket Sunset',
		subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
		illustration: Images.homeSlider3,
	},
	{
		title: 'Acrocorinth, Greece',
		subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
		illustration: Images.homeSlider4,
	},
]
const iconSize = 20
const iconColor = defaultStyles.Colors.secondaryColor
const SERVICES = [
	{
		title: 'Exchange',
		icon: <FontAwesome name="exchange" size={iconSize} color={iconColor} />,
		route: routes.exchange,
	},
	{
		title: 'P2P Trade',
		icon: <Feather name="users" size={iconSize} color={iconColor} />,
		route: routes.p2pTrading,
	},
	{
		title: 'Rewards',
		icon: <FontAwesome5 name="gift" size={iconSize} color={iconColor} />,
		route: routes.rewards,
	},
	{
		title: 'Price Alert',
		icon: (
			<MaterialCommunityIcons
				name="chart-line"
				size={iconSize}
				color={iconColor}
			/>
		),
		route: routes.priceAlert,
	},
]

const { width: screenWidth } = Dimensions.get('window')

const HomeScreen = ({ navigation }) => {
	const { navigate } = navigation
	const { navigateToWallet } = useSelector(state => state.appSettings)
	const [entries, setEntries] = useState(ENTRIES1)
	const [active, setActive] = useState(0)
	const carouselRef = useRef(null)



	useEffect(() => {
		// checkExistsWallet()
	}, [])


	const checkExistsWallet = async () => {
		const persist = await AsyncStorage.getItem('persist:root')
		if (persist !== null) {
			let item = JSON.parse(persist)
			if (item !== null) {
				let wallets = JSON.parse(item["wallets"])
				if (wallets["data"] === null) {
					navigation.replace(routes.newWallet, { no_back: true })
				}
			}
		}
	}

	// const wallet = useSelector(state =>
	// 	state.wallets.data ? state.wallets.data[0] : null
	// )


	useEffect(() => {
		if (navigateToWallet) {
			navigation.replace(routes.newWallet, { no_back: true })
		}
	}, [])

	useFocusEffect(
		React.useCallback(() => {
			if (navigateToWallet) {
				navigation.replace(routes.newWallet, { no_back: true })
			}

			return () => {
				// Do something when the screen is unfocused
				// Useful for cleanup functions
			}
		}, [navigateToWallet])
	)


	const LISTDATA = [
		{
			id: 0,
			title: 'Complete your profile',
			subTitle: 'Share your email and phone number with us.',
			icon: (
				<FontAwesome5
					name="user-plus"
					size={15}
					color={defaultStyles.Colors.text1}
				/>
			),
			onPress: () => {
				navigate(routes.profile)
			},
		},
		{
			id: 1,
			title: 'Refer your friends',
			subTitle: 'Invite your friends to Vibranium wallet.',
			icon: (
				<FontAwesome5
					name="users"
					size={15}
					color={defaultStyles.Colors.text2}
				/>
			),
			onPress: () => {
				navigate(routes.rewards)
			},
		},
		{
			id: 2,
			title: 'Start invest ',
			subTitle: 'Buy or deposit.',
			icon: (
				<MaterialCommunityIcons
					name="file-upload"
					size={20}
					color={defaultStyles.Colors.text2}
				/>
			),
			onPress: () => {
				navigate(routes.buy)
			},
		},
		{
			id: 3,
			title: 'Earn your rewards',
			subTitle: 'Now you have 100% of your friends commission.',
			icon: (
				<MaterialIcons
					name="star-half"
					size={20}
					color={defaultStyles.Colors.text2}
				/>
			),
			onPress: () => {
				navigate(routes.rewards, { tabIndex: 1 })
			},
		},
	]

	const renderItem = ({ item }) => {
		return (
			<TouchableOpacity
				style={styles.item}
				activeOpacity={0.75}
				onPress={() => navigation.navigate(routes.singleSlider)}
			>
				<Image
					style={styles.image}
					source={item.illustration}
					resizeMode="contain"
				/>
			</TouchableOpacity>
		)
	}


	// const DAPPSDATA = [
	// 	{
	// 		id: 0,
	// 		name: 'Sushi',
	// 		logo: 'https://sushi.com/static/media/logo.dec926df.png',
	// 		description: 'This is test description',
	// 		url: 'Sushi.com'
	// 	},
	// 	{
	// 		id: 3,
	// 		name: '1inch',
	// 		// logo: 'https://app.1inch.io/assets/images/logo.svg',
	// 		logo: 'https://sushi.com/static/media/logo.dec926df.png',
	// 		description: 'This is test description',
	// 		url: 'https://app.1inch.io/'
	// 	}
	// 	,
	// 	{
	// 		id: 4,
	// 		name: 'Bakeryswap',
	// 		logo: 'https://www.bakeryswap.org/static/media/logo.4e93c681.svg',
	// 		description: 'This is test description',
	// 		url: 'https://www.bakeryswap.org/#/home'
	// 	},
	// 	{
	// 		id: 1,
	// 		name: 'Pancakeswap',
	// 		logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1.png',
	// 		description: 'This is test description',
	// 		url: 'https://pancakeswap.finance/'
	// 	},

	// ]


	// const [filterdItems, setFilterItems] = useState(DAPPSDATA)
	// const [searchDApp, setSearchDApp] = useState()
	// const arrayHolder = DAPPSDATA

	// const searchFilterFunction = () => {
	// 	const includes = str => str.toLowerCase().includes(searchDApp.toLowerCase())
	// 	const newData = arrayHolder.filter(item => {
	// 		if (includes(item.name) || includes(item.name)) {
	// 			return item
	// 		}
	// 	})
	// 	if (newData.length > 0) {
	// 		setFilterItems(newData)
	// 	} else {
	// 		// concat with array
	// 		const newDAppItem = {
	// 			name: 'Google',
	// 			url: `https://www.google.com/search?${searchDApp}`,
	// 			description: `https://www.google.com/search?${searchDApp}`,
	// 			// logo: 'https://image.similarpng.com/thumbnail/2020/12/Flat-design-Google-logo-design-Vector-PNG.png'
	// 			logo: 'https://w7.pngwing.com/pngs/249/19/png-transparent-google-logo-g-suite-google-guava-google-plus-company-text-logo.png'
	// 		}
	// 		// setFilterItems.push(prev => [...prev, newDAppItem])
	// 		setFilterItems(prev => [...prev, newDAppItem])
	// 		navigation.navigate(routes.dAppWebview, { name: 'Google', url: `https://www.google.com/search?q=${searchDApp}` })
	// 	}
	// }


	return (
		<Screen style={styles.screen}>
			<Header />
			<View style={{ flex: 1 }}>
				<View style={styles.imageSliderContainer}>
					<Carousel
						ref={carouselRef}
						sliderWidth={screenWidth}
						// itemWidth={screenWidth - 55}
						itemWidth={screenWidth - 40}
						data={entries}
						renderItem={renderItem}
						onSnapToItem={index => setActive(index)}
						lockScrollWhileSnapping
					/>
					<Pagination
						dotsLength={entries.length}
						activeDotIndex={active}
						containerStyle={{
							height: 20,
							paddingVertical: 0,
							paddingTop: 16,
						}}
						dotStyle={{
							width: 20,
							height: 5,
							borderRadius: 5,
							backgroundColor: defaultStyles.Colors.primaryColor,
						}}
						inactiveDotStyle={{
							width: 5,
							backgroundColor: defaultStyles.Colors.lightGrayColor,
						}}
						inactiveDotOpacity={0.4}
						inactiveDotScale={0.6}
					/>
				</View>
				<View style={styles.servicesContainer}>
					<View style={styles.ourService}>
						<AppText bold>Services</AppText>
						{/* <View style={styles.more}>
							<Feather
								name="more-horizontal"
								size={18}
								color={defaultStyles.Colors.text2}
							/>
						</View> */}
					</View>
					<View style={styles.servicesButtons}>
						{SERVICES.map(service => (
							<ServiceItem key={service.title} service={service} />
						))}
					</View>
				</View>
				<View style={styles.listBarContainer}>
					{/* ==================================================== */}
					<DAppList style={styles.listBarTitle} />
					{/* ==================================================== */}
					{/* <View style={styles.listBarTitle}>
							<AppText bold>Steps to rewards</AppText>
							<AppText
								typo="dot"
								style={{ color: defaultStyles.Colors.lightGrayColor }}
							>
								Follow 4 steps to complete your portfolio and earn rewards.
							</AppText>
						</View>
						<Steps data={LISTDATA} /> */}

				</View>
			</View>
		</Screen>
	)
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: defaultStyles.Colors.bckColor,
	},
	imageSliderContainer: {
		flex: 2,
		paddingVertical: 8,
		justifyContent: 'center',
		alignItems: 'center'
	},
	servicesContainer: {
		padding: 10,
	},
	servicesButtons: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		alignItems: 'center',
		marginVertical: 4,
	},
	ourService: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	more: {
		width: 25,
		height: 25,
		borderStyle: 'solid',
		borderColor: defaultStyles.Colors.inputColor,
		borderWidth: 1,
		borderRadius: 8,
		...defaultStyles.flex.center,
	},
	button: {},
	listBarContainer: {
		flex: 3,
	},
	listBarTitle: {
		paddingHorizontal: 16,
		marginBottom: 12,
	},
	item: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	image: {
		flex: 1,
		borderRadius: 10,
	},
})

export default HomeScreen
