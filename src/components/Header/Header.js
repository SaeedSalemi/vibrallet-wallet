import { useNavigation } from '@react-navigation/core'
import React, { useMemo, useState, useEffect, useContext } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import Feather from 'react-native-vector-icons/Feather'

import { StyleSheet, View, TouchableOpacity, Modal, Image } from 'react-native'
import { routes } from '../../config/routes'
import { globalStyles } from '../../config/styles'
import AppCamera from '../common/AppCamera'
import AppIcon from '../common/AppIcon'
import AppText from '../common/AppText'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Context } from '../../context/Provider'
import { showMessage } from 'react-native-flash-message'

export default function Header({ route = routes.home, children }) {
	const { navigate } = useNavigation()
	const [show, setShow] = useState(false)

	const { user: userProvider, userProfile, pair, coinManager } = useContext(Context)


	const [user, setUser] = useState({})
	useEffect(() => {
		AsyncStorage.getItem("user").then(user => {
			if (user) {
				setUser(JSON.parse(user))
			}
		})
	}, [])


	const [state, setState] = useState({
		address: '',
	})


	const [qrStatus, setQrStatus] = useState(false)

	const showCamera = () => {
		setShow(true)
	}
	const onClose = () => {
		setShow(false)
	}

	const icon1 = useMemo(() => {
		if (route === routes.wallet) {
			return {
				icon: (
					<Ionicons
						name="options-outline"
						size={25}
						color={globalStyles.Colors.text1}
					/>
				),
				onPress: () => {
					navigate(routes.filters)
				},
			}
		} else if (route === routes.market) {
			return {
				icon: (
					<SimpleLineIcons
						name="star"
						size={25}
						color={globalStyles.Colors.text1}
					/>
				),
				onPress: () => navigate(routes.favorites),
			}
		} else if (route === routes.profile) {
			return {
				icon: (
					<AntDesign
						name="message1"
						size={25}
						color={globalStyles.Colors.text1}
					/>
				),
			}
		} else if (route === routes.marketCoinDetail) {
			return {
				icon: <MaterialCommunityIcons name="bell-plus" />,
			}
		} else {
			return {
				icon: (
					<MaterialIcons
						name="qr-code-scanner"
						size={25}
						color={globalStyles.Colors.text1}
					/>
				),
				onPress: showCamera,
			}
		}
	}, [])

	const icon2 = useMemo(() => {
		if (route === routes.market) {
			return {
				icon: (
					<Feather name="search" size={25} color={globalStyles.Colors.text1} />
				),
				onPress: () => navigate(routes.search),
			}
		} else {
			return {
				icon: (
					<Ionicons
						name="notifications-outline"
						size={25}
						color={globalStyles.Colors.text1}
					/>
				),
				onPress: () => navigate(routes.notification),
			}
		}
	})

	const leftElement = useMemo(() => {
		if (route === routes.market) {
			return children
		} else if (route === routes.profile) {
			return (
				<View style={globalStyles.flex.center}>
					<AppText bold typo="md">
						Profile
					</AppText>
				</View>
			)
		} else {
			return (
				<TouchableOpacity
					style={{
						backgroundColor: globalStyles.Colors.inputColorOpacity,
						borderTopLeftRadius: 100,
						borderBottomLeftRadius: 100,
						borderTopRightRadius: 10,
						borderBottomRightRadius: 10,
						flexDirection: 'row',
					}}
					activeOpacity={0.75}
					onPress={() => {
						if (userProvider.username) {
							navigate(routes.profile)
						} else {
							navigate(routes.createWalletEmail)
						}
					}}
				>
					<View
						style={{
							...globalStyles.flex.center,
							width: 45,
							backgroundColor: globalStyles.Colors.inputColor,
							borderRadius: 100,
						}}
					>
						{/* <Entypo
							name="user"
							size={30}
							color={globalStyles.Colors.inputColor2}
						/> */}

						{userProfile ? <Image source={{ uri: `${userProfile}` }} style={{ width: 30, height: 30, borderRadius: 50 }} /> : <Entypo
							name="user"
							size={30}
							color={globalStyles.Colors.inputColor2}
						/>}
					</View>

					<View
						style={{ justifyContent: 'space-evenly', paddingHorizontal: 16 }}
					>
						<AppText bold typo="tiny">
							{/* {!user.email ? 'Login' : 'Register'} */}
							{userProvider.username ? userProvider.username : 'Login'}
						</AppText>
						<AppText typo="dot" color="text3">
							Vibranium Evagelist
						</AppText>
					</View>
				</TouchableOpacity>
			)
		}
	})

	const handelQR = qrData => {
		// setQr(qrData.data)
		state.address = qrData.data
		setState({ ...state })
		setShow(false)

		if (qrData.data && qrData.data.startsWith("wc:")) {
			navigate(routes.walletConnect, { pairData: qrData.data })
			// pair(qrData.data);
		}

	}

	return (
		<View
			style={{ flexDirection: 'row', marginVertical: 8, paddingHorizontal: 8 }}
		>
			{leftElement}
			<View
				style={{ flex: 1, justifyContent: 'flex-end', flexDirection: 'row' }}
			>
				<TouchableOpacity
					style={[styles.icon, { marginHorizontal: 8 }]}
					onPress={icon1.onPress}
				>
					{icon1.icon}
				</TouchableOpacity>
				<TouchableOpacity style={styles.icon} onPress={icon2.onPress}>
					{icon2.icon}
				</TouchableOpacity>
			</View>
			{/* <AppCamera show={show} onClose={onClose} /> */}
			<AppCamera
				show={show}
				onClose={onClose}
				qr
				onQR={handelQR}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	icon: {
		borderRadius: 10,
		width: 45,
		height: 45,
		borderStyle: 'solid',
		borderColor: globalStyles.Colors.inputColor,
		borderWidth: 1,
		...globalStyles.flex.center,
	},
})
