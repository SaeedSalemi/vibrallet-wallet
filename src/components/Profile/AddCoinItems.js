import React, { useState } from 'react'
import { FlatList, View } from 'react-native'
import { globalStyles } from '../../config/styles'
import AppIcon from '../common/AppIcon'
import AppSwitch from '../common/AppSwitch'
import AppText from '../common/AppText'
import HR from '../common/HR/HR'

export default function AddCoinItems({ coins }) {
	const [up, setUp] = useState()
	return (
		<FlatList
			style={{ marginVertical: 18 }}
			data={coins}
			renderItem={({ item, index }) => (
				<View>
					<View
						style={{
							...globalStyles.flex.row,
							alignItems: 'center',
							marginVertical: 24,
							...globalStyles.flex.between,
						}}
					>
						<View style={{ ...globalStyles.flex.row }}>
							<AppIcon name={item.icon} />
							<View style={{ paddingStart: 8 }}>
								<AppText bold typo="md">
									{item.slug}
								</AppText>
								<AppText typo="tiny" color="text3">
									{item.title}
								</AppText>
							</View>
						</View>

						<AppSwitch
							value={up}
							onValueChange={() => {
								setUp(!up)
							}}
						/>
					</View>
					{index + 1 === coins.length ? null : <HR />}
				</View>
			)}
			keyExtractor={(_, index) => index.toString()}
		/>
	)
}
