import React, { useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Icons } from '../../assets'
import { globalStyles } from '../../config/styles'
import AppIcon from '../common/AppIcon'
import AppSwitch from '../common/AppSwitch'
import AppText from '../common/AppText'
import MarketIcon from '../common/MarketIcon/MarketIcon'

export default function WalletItem({ item, index }) {
	const [up, setUp] = useState()
	return (
		<View
			style={{
				paddingVertical: 18,
				paddingHorizontal: 10,
				backgroundColor: globalStyles.Colors.inputColor,
				borderRadius: 10,
			}}
		>
			<View style={{ ...globalStyles.flex.row }}>
				<View
					style={{
						flex: 1,
						...globalStyles.flex.row,
						alignItems: 'center',
						...globalStyles.flex.row.between,
					}}
				>
					<View style={{ paddingHorizontal: 8 }}>
						<AppIcon name="wallet2" />
					</View>
					<AppText bold>{item.title}</AppText>
				</View>
				<TouchableOpacity
					style={{
						...globalStyles.flex.row,
						alignItems: 'center',
						paddingHorizontal: 8,
					}}
				>
					<View style={{ paddingHorizontal: 10 }}>
						<AppIcon name="plus2" />
					</View>
					<AppText bold color="secondaryColor">
						Add Coin
					</AppText>
				</TouchableOpacity>
			</View>
			<View style={{ ...globalStyles.flex.row, marginTop: 16 }}>
				{item?.coins?.map((coin, i) => (
					<MarketIcon
						size={40}
						color={globalStyles.Colors.ethereum}
						key={i}
						style={{ marginEnd: 8 }}
					>
						{coin.icon}
					</MarketIcon>
				))}
			</View>
		</View>
	)
}
