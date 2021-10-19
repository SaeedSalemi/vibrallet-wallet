import React from 'react'
import { View } from 'react-native'
import { globalStyles } from '../../config/styles'
import ProfileDetail from './ProfileDetail'
import AppText from '../common/AppText'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

export default function ProfileDetailsSection() {
	const items = [
		{
			icon: (
				<FontAwesome5 name="gift" size={15} color={globalStyles.Colors.text3} />
			),
			title: 'Rewards',
			children: (
				<>
					<AppText bold typo="sm">
						0
					</AppText>
					<AppText typo="tiny" color="text3">
						PRX
					</AppText>
				</>
			),
		},
		{
			icon: (
				<FontAwesome name="send" color={globalStyles.Colors.text2} size={15} />
			),
			title: 'Level',
			children: (
				<>
					<AppText bold color="lightOrange" typo="sm">
						0
					</AppText>
				</>
			),
		},
		{
			icon: (
				<FontAwesome5
					name="user-plus"
					color={globalStyles.Colors.text2}
					size={15}
				/>
			),
			title: 'Referrals',
			children: (
				<>
					<AppText bold typo="sm">
						0
					</AppText>
				</>
			),
		},
	]
	return (
		<View
			style={{
				...globalStyles.flex.row,
				justifyContent: 'space-around',
				flex: 1,
			}}
		>
			{items.map((item, i) => {
				return (
					<ProfileDetail icon={item.icon} title={item.title} key={i}>
						{item.children}
					</ProfileDetail>
				)
			})}
		</View>
	)
}
