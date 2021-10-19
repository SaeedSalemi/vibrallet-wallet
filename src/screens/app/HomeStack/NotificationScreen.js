import React, { useMemo } from 'react'
import { FlatList, View } from 'react-native'
import HR from '../../../components/common/HR/HR'
import NotificationItem from '../../../components/Notification/NotificationItem'
import ProfileMenu from '../../../components/Profile/ProfileMenu'
import { globalStyles } from '../../../config/styles'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AppButton from '../../../components/common/AppButton'

const withdrawal = 'Withdrawal Successful'
const deposit = 'Deposit Unsuccessful'
const detail =
	'You have successfully withdrawn 234.5 Usdt at 2021-02-29 18:21:14 (UTC).'
const time = '18:21:14'
export default function NotificationScreen() {
	const items = useMemo(
		() => [
			{
				icon: (
					<Ionicons
						name="notifications-outline"
						size={25}
						color={globalStyles.Colors.text1}
					/>
				),
				title: withdrawal,
				detail: detail,
				time: time,
			},
			{
				icon: (
					<Ionicons
						name="notifications-outline"
						size={25}
						color={globalStyles.Colors.text3}
					/>
				),
				title: deposit,
				detail: detail,
				time: time,
				read: true,
			},
			{
				icon: (
					<Ionicons
						name="notifications-outline"
						size={25}
						color={globalStyles.Colors.text1}
					/>
				),
				title: withdrawal,
				detail: detail,
				time: time,
			},
			{
				icon: (
					<Ionicons
						name="notifications-outline"
						size={25}
						color={globalStyles.Colors.text3}
					/>
				),
				title: deposit,
				detail: detail,
				time: time,
				read: true,
			},
			{
				icon: (
					<Ionicons
						name="notifications-outline"
						size={25}
						color={globalStyles.Colors.text1}
					/>
				),
				title: deposit,
				detail: detail,
				time: time,
			},
			{
				icon: (
					<Ionicons
						name="notifications-outline"
						size={25}
						color={globalStyles.Colors.text3}
					/>
				),
				title: withdrawal,
				detail: detail,
				time: time,
				read: true,
			},
			{
				icon: (
					<Ionicons
						name="notifications-outline"
						size={25}
						color={globalStyles.Colors.text1}
					/>
				),
				title: deposit,
				detail: detail,
				time: time,
			},
			{
				icon: (
					<Ionicons
						name="notifications-outline"
						size={25}
						color={globalStyles.Colors.text1}
					/>
				),
				title: deposit,
				detail: detail,
				time: time,
			},
		],
		[]
	)
	return (
		<View style={{ ...globalStyles.gapScreen }}>
			<NotificationItem data={items} />
			<AppButton
				textStyle={{ color: globalStyles.Colors.primaryColor }}
				title="Mark all as Read"
				customStyle={{
					backgroundColor: globalStyles.Colors.bckColor,
					borderWidth: 1,
					borderColor: globalStyles.Colors.inputColor,
				}}
			/>
		</View>
	)
}
