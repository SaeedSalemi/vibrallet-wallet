import React from 'react'
import { View } from 'react-native'
import AppText from '../../../components/common/AppText'
import MarketIcon from '../../../components/common/MarketIcon/MarketIcon'
import Screen from '../../../components/Screen'
import { globalStyles } from '../../../config/styles'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather'
import Coin from '../../../components/common/Coin'
import NotificationItem from '../../../components/Notification/NotificationItem'
import DetailsItem from '../../../components/Details/DetailsItem'
import HR from '../../../components/common/HR/HR'
import AppButton from '../../../components/common/AppButton'

const items = [
	{
		title: 'Date & Time',
		detail: '2021.02.17, 1:00 PM',
	},
	{
		title: 'Sent to',
		detail: 'ox593r9jwwf093urj2fijoesfu9023weweetre',
	},
	{
		title: 'Tx hash',
		detail: 'ox593r9jwwf093urj2fijoesfu9023we234555',
	},
	{
		title: 'Status',
		detail: 'Completed',
		detailColor: 'success',
	},
]

export default function DetailedHistory() {
	return (
		<Screen style={{ ...globalStyles.gapScreen }}>
			<View style={{ flex: 1 }}>
				<View style={{ ...globalStyles.flex.center }}>
					<MarketIcon size={52} color={globalStyles.Colors.ethereum}>
						<MaterialCommunityIcons size={30} name="ethereum" color="#7037C9" />
					</MarketIcon>
					<View
						style={{
							...globalStyles.flex.row,
							marginVertical: 16,
						}}
					>
						<Feather
							name="upload"
							size={20}
							color={globalStyles.Colors.failure}
						/>
						<AppText color="failure" style={{ marginHorizontal: 8 }}>
							-10 ETH
						</AppText>
					</View>
				</View>
				<View style={{ marginVertical: 24 }}>
					{items.map((item, index) => (
						<View key={index}>
							<DetailsItem data={item} />
							{index + 1 === items.length ? null : <HR />}
						</View>
					))}
				</View>
			</View>
			<View style={{ ...globalStyles.flex.row, ...globalStyles.flex.between }}>
				<AppButton
					customStyle={{
						flex: 0.49,
						backgroundColor: globalStyles.Colors.bckColor,
						borderWidth: 1,
						borderColor: globalStyles.Colors.inputColor,
					}}
					title="Share"
				/>
				<AppButton customStyle={{ flex: 0.49 }} title="More Details" />
			</View>
		</Screen>
	)
}
