import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { FlatList, TouchableOpacity, View } from 'react-native'
import { globalStyles } from '../../config/styles'
import AppIcon from '../common/AppIcon'
import AppSwitch from '../common/AppSwitch'
import AppText from '../common/AppText'
import HR from '../common/HR/HR'

export default function ProfileMenu({ data }) {
	const { navigate } = useNavigation()

	return (
		<FlatList
			style={{ paddingVertical: 24, paddingHorizontal: 18 }}
			data={data}
			keyExtractor={(_, index) => index.toString()}
			renderItem={({ item, index }) => (
				<TouchableOpacity
					activeOpacity={item.route ? undefined : 1}
					onPress={() => (item.route ? navigate(item.route) : undefined)}
				>
					<View style={{ ...globalStyles.flex.row, paddingVertical: 3 }}>
						{item.icon ? (
							<View style={{ paddingVertical: 3 }}>{item.icon}</View>
						) : null}
						<View style={{ paddingStart: 16, paddingEnd: 40, flex: 1 }}>
							<AppText style={{ paddingVertical: 3 }} bold>
								{item.title}
							</AppText>
							{item.detail ? (
								<AppText typo="dot" color="text3" style={{}}>
									{item.detail}
								</AppText>
							) : null}
						</View>
						{item.time ? (
							<View>
								<AppText>{item.time}</AppText>
							</View>
						) : null}
						{item.appSwitch ? (
							<AppSwitch
								value={item.appSwitch?.value}
								onValueChange={item.appSwitch?.onPress}
							/>
						) : null}
						{item.route && !item.children ? (
							<AppIcon name="arrowRightCircle" />
						) : null}
						{item.children ? (
							<View
								style={{
									alignSelf: 'flex-start',
									backgroundColor: globalStyles.Colors.inputColor,
									borderRadius: 8,
								}}
							>
								<AppText
									style={{ paddingVertical: 8, paddingHorizontal: 18 }}
									color={item.children.color}
								>
									{item.children.title}
								</AppText>
							</View>
						) : null}
					</View>

					{index + 1 === data.length ? null : (
						<View style={{ paddingVertical: 16 }}>
							<HR />
						</View>
					)}
				</TouchableOpacity>
			)}
		/>
	)
}
