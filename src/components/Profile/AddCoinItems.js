import React, { useState, useContext } from 'react'
import { FlatList, View } from 'react-native'
import { globalStyles } from '../../config/styles'
import AppIcon from '../common/AppIcon'
import AppSwitch from '../common/AppSwitch'
import AppText from '../common/AppText'
import HR from '../common/HR/HR'
import { Context } from '../../context/Provider'

export default function AddCoinItems({ coins }) {
	const [up, setUp] = useState()
	const { setCoin, coins: allCoins } = useContext(Context)
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
								<AppText bold typo="sm">
									{item.name}
								</AppText>
								<AppText typo="tiny" color="text3">
									{item.symbol}
								</AppText>
							</View>
						</View>

						<AppSwitch
							value={item.hide}
							onValueChange={() => {
								// setUp(!up)
								const curr_coin = allCoins.findIndex((itm) => itm.name === item.name)
								allCoins[curr_coin].hide = !allCoins[curr_coin].hide
								console.log(allCoins[curr_coin])
								setCoin(allCoins)
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
