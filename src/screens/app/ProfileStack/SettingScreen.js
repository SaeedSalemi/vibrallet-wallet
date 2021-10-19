import React, { useMemo, useState } from 'react'
import { View } from 'react-native'
import { globalStyles } from '../../../config/styles'
import ProfileMenu from '../../../components/Profile/ProfileMenu'
import { routes } from '../../../config/routes'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useDispatch, useSelector } from 'react-redux'
import {
	setLightMode,
	setTurnOnNotifications,
	setTurnOnSounds,
} from '../../../redux/modules/appSettings'

export default function SettingScreen() {
	const { lightMode, turnOnNotifications, turnOnSounds } = useSelector(
		state => state.appSettings
	)
	const dispatch = useDispatch()
	console.log(lightMode, turnOnNotifications, turnOnSounds, '<=== States')
	const items = useMemo(() => [
		{
			title: 'Light Mode',
			detail:
				'The lite mode is for those who enjoys to have transactions in bright areas',
			icon: (
				<MaterialIcons
					name="wb-sunny"
					size={25}
					color={globalStyles.Colors.primaryColor}
				/>
			),
			appSwitch: {
				value: lightMode,
				onPress: () => {
					dispatch(setLightMode(!lightMode))
				},
			},
		},
		{
			title: 'Notifications',
			detail: 'Show a notification when funds are sent or recieved',
			icon: <Ionicons name="notifications" size={25} color="#666FF1" />,
			appSwitch: {
				value: turnOnNotifications,
				onPress: () => {
					dispatch(setTurnOnNotifications(!turnOnNotifications))
				},
			},
		},
		{
			title: 'Language',
			detail: 'Change your Binrex Wallets language from this section',
			icon: <Entypo name="language" size={25} color="#9299C2" />,
			route: routes.language,
		},
		{
			title: 'Sounds',
			detail: 'Play sounds when sending and recieving funds',
			icon: <Entypo name="sound" size={25} color="#1496F3" />,
			appSwitch: {
				value: turnOnSounds,
				onPress: () => {
					dispatch(setTurnOnSounds(!turnOnSounds))
				},
			},
		},
		{
			title: 'Currency',
			detail: 'Set your preferred local currency',
			children: { title: 'USD' },
			route: routes.localCurrency,
			icon: (
				<MaterialCommunityIcons
					name="currency-usd-circle"
					color={globalStyles.Colors.success}
					size={25}
				/>
			),
		},
	])
	return (
		<View style={{ ...globalStyles.screen }}>
			<ProfileMenu data={items} />
		</View>
	)
}
