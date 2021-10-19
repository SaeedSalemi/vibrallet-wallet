import React from 'react'
import { FlatList, Image, View } from 'react-native'
import { globalStyles } from '../../config/styles'
import AppIcon from '../common/AppIcon'
import AppText from '../common/AppText'
import HR from '../common/HR/HR'

export default function Regions({ data }) {
	return (
		<FlatList
			style={{ paddingVertical: 24, paddingHorizontal: 18 }}
			data={data}
			keyExtractor={(_, index) => index.toString()}
			renderItem={({ item, index }) => (
				<View>
					<View
						style={{
							...globalStyles.flex.row,
							...globalStyles.flex.between,
							alignItems: 'center',
						}}
					>
						<View
							style={{
								...globalStyles.flex.row,
								alignItems: 'center',
								paddingVertical: 18,
							}}
						>
							<Image source={item.image} />
							<View style={{ marginHorizontal: 14 }}>
								<AppText bold typo="xs">
									{item.title}
								</AppText>
								{item.detail ? (
									<AppText color="text3" typo="dot">
										{item.detail}
									</AppText>
								) : null}
							</View>
						</View>
						{index === 0 ? <AppIcon name="checked" /> : null}
					</View>
					{index + 1 === data.length ? null : (
						<View>
							<HR />
						</View>
					)}
				</View>
			)}
		/>
	)
}
