import React, { useEffect, useRef, useState } from 'react'
import globalStyles from '../../../config/styles'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import * as Network from 'expo-network';

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
import ethManager from '../../../blockchains/EthManager'
import bscManager from '../../../blockchains/BscManager'


const ENTRIES1 = [
	{
		title: 'Beautiful and dramatic Antelope Canyon',
		subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
		illustration: Images.homeSlider,
	},
	{
		title: 'Earlier this morning, NYC',
		subtitle: 'Lorem ipsum dolor sit amet',
		illustration: Images.homeSlider,
	},
	{
		title: 'White Pocket Sunset',
		subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
		illustration: Images.homeSlider,
	},
	{
		title: 'Acrocorinth, Greece',
		subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
		illustration: Images.homeSlider,
	},
	{
		title: 'The lone tree, majestic landscape of New Zealand',
		subtitle: 'Lorem ipsum dolor sit amet',
		illustration: Images.homeSlider,
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


	const wallet = useSelector(state =>
		state.wallets.data ? state.wallets.data[0] : null
	)

	const saveToStorage = async (title, data) => await AsyncStorage.setItem(title, data)

	const _storeWalletData = () => {
		const coinSelector = { ETH: ethManager, BSC: bscManager }
		for (let selectCoin in coinSelector) {
			coinSelector[selectCoin].getWalletFromMnemonic(wallet.backup)
				.then(wallet => {
					saveToStorage(selectCoin, JSON.stringify(wallet))
				}).catch(ex => console.error('wallet', ex))
		}
	}

	const checkWallet = async () => {
		let context = this;
		try {
			let value = await AsyncStorage.getItem('ETH');
			if (value != null) {
				_storeWalletData()
			}
			else {
				// do something else
			}
		} catch (error) {
			// Error retrieving data
		}
	}

	useEffect(() => {
		checkWallet()
	}, [])

	useEffect(() => {

		Network.getNetworkStateAsync().then(status => {
			console.log("debug", status)
			if (!status.isConnected) {
				showMessage({
					message: 'Network connection not detected , please connect your phone to the internet connection and try again',
					description: null,
					type: 'danger',
					icon: null,
					duration: 8000,
					style: { backgroundColor: "red" },
					position: 'top'
				})
			}
		})


	}, [])
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
			subTitle: 'Invite your friends to Binrex wallet.',
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

	return (
		<Screen style={styles.screen}>
			<Header />
			<View style={{ flex: 1 }}>
				<View style={styles.imageSliderContainer}>
					<Carousel
						ref={carouselRef}
						sliderWidth={screenWidth}
						itemWidth={screenWidth - 60}
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
						<AppText bold>Our Services</AppText>
						<View style={styles.more}>
							<Feather
								name="more-horizontal"
								size={18}
								color={defaultStyles.Colors.text2}
							/>
						</View>
					</View>
					<View style={styles.servicesButtons}>
						{SERVICES.map(service => (
							<ServiceItem key={service.title} service={service} />
						))}
					</View>
				</View>
				<View style={styles.listBarContainer}>
					<ScrollView>
						<View style={styles.listBarTitle}>
							<AppText bold>Steps to rewards</AppText>
							<AppText
								typo="dot"
								style={{ color: defaultStyles.Colors.lightGrayColor }}
							>
								Follow 4 steps to complete your portfolio and earn rewards.
							</AppText>
						</View>
						<Steps data={LISTDATA} />
					</ScrollView>
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
		marginVertical: 15,
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
		paddingHorizontal: 5,
		marginBottom: 20,
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
