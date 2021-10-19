import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { FlatList, TouchableOpacity, View } from 'react-native'
import { globalStyles } from '../../config/styles'
import AppText from '../common/AppText'
import HR from '../common/HR/HR'
import SwapableRow from '../common/Swapable/SwapableRow'

export default function ProfileMenu({ data }) {
	const { navigate } = useNavigation()

	return (
		<FlatList
			style={{ marginVertical: 24, paddingHorizontal: 6 }}
			data={data}
			keyExtractor={(_, index) => index.toString()}
			renderItem={({ item, index }) => (
				<SwapableRow
					leftItems={[{ title: 'Mark as read', icon: 'check' }]}
					measure={100}
				>
					<TouchableOpacity
						activeOpacity={item.route ? undefined : 1}
						onPress={() => (item.route ? navigate(item.route) : undefined)}
					>
						<View style={{ ...globalStyles.flex.row, paddingVertical: 3 }}>
							{item.icon ? (
								<View style={{ paddingVertical: 3 }}>{item.icon}</View>
							) : null}
							<View style={{ paddingStart: 16, paddingEnd: 40, flex: 1 }}>
								<AppText
									typo="xs"
									color={item.read ? 'text3' : 'text1'}
									style={{ paddingVertical: 3 }}
									bold
								>
									{item.title}
								</AppText>
								{item.detail ? (
									<AppText
										style={{ flex: 1 }}
										typo="dot"
										color="text3"
										style={{}}
									>
										{item.detail}
									</AppText>
								) : null}
							</View>
							{item.time ? (
								<View style={{ marginTop: 4 }}>
									<AppText typo="tiny" color={item.read ? 'text3' : 'text1'}>
										{item.time}
									</AppText>
								</View>
							) : null}
						</View>
						<View style={{ marginVertical: 12 }}>
							{index + 1 === data.length ? null : <HR />}
						</View>
					</TouchableOpacity>
				</SwapableRow>
			)}
		/>
	)
}
