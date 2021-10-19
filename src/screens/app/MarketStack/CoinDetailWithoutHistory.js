import React from 'react'
import { Image, ScrollView, View } from 'react-native'
import MarketIcon from '../../../components/common/MarketIcon/MarketIcon'
import Screen from '../../../components/Screen'
import { globalStyles } from '../../../config/styles'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AppText from '../../../components/common/AppText'
import { Images } from '../../../assets'
import CoinDetailChartItem from '../../../components/Market/CoinDetailChartItem'
import AppButton from '../../../components/common/AppButton'

const values = ['$1850', '$1750', '$1650', '$1550']
const dates = ['5 Nov', '10 Nov', '15 Nov', '25 Nov', '30 Nov']
const chartItems = [
	{ title: '1D', active: true },
	{ title: '1W' },
	{ title: '1M' },
	{ title: '1Y' },
	{ title: 'ALL' },
]
export default function CoinDetailWithoutHistory({ route }) {
	const { coin } = route.params || {}
	console.log(coin)

	return (
		<ScrollView>
			<View style={{ ...globalStyles.flex.center, marginVertical: 24 }}>
				<MarketIcon
					size={52}
					style={{ marginVertical: 8 }}
					color={globalStyles.Colors.ethereum}
				>
					<MaterialCommunityIcons size={30} name="ethereum" color="#7037C9" />
				</MarketIcon>
				<AppText color="text2">{coin.title} Balance</AppText>
				<AppText bold typo="xl">
					12.432 ETH
				</AppText>
				<View
					style={{
						...globalStyles.flex.row,
						alignItems: 'center',
					}}
				>
					<AppText color="text3" typo="tiny">
						24h Change
					</AppText>
					<AppText color="success" typo="dot" style={{ marginHorizontal: 8 }}>
						+1.2%
					</AppText>
				</View>
			</View>
			<View style={{ ...globalStyles.flex.row, marginVertical: 32 }}>
				<Image style={{ flex: 0.98 }} source={Images.inlineChart} />
				<View style={{ justifyContent: 'space-between' }}>
					{values.map((item, index) => (
						<AppText
							style={{ paddingHorizontal: 8 }}
							color="text3"
							typo="dot"
							key={index}
						>
							{item}
						</AppText>
					))}
				</View>
			</View>
			<View style={{ ...globalStyles.flex.row }}>
				{dates.map((item, index) => (
					<AppText
						style={{ marginHorizontal: 16 }}
						color="text3"
						typo="dot"
						key={index}
					>
						{item}
					</AppText>
				))}
			</View>
			<View
				style={{
					...globalStyles.flex.row,
					justifyContent: 'space-evenly',
					marginVertical: 32,
				}}
			>
				{chartItems.map((item, index) => (
					<CoinDetailChartItem
						key={index}
						title={item.title}
						active={item.active}
					/>
				))}
			</View>
			<View
				style={{ ...globalStyles.flex.center, marginVertical: 32, flex: 1 }}
			>
				<Image source={Images.marketImage} />
				<AppText color="text2">No transactions yet</AppText>
				<AppText color="text3">Your transactions will appear here.</AppText>
			</View>
			<View
				style={{
					...globalStyles.flex.row,
					...globalStyles.gapScreen,
					justifyContent: 'space-between',
				}}
			>
				<AppButton
					title="Recieve"
					icon="arrow-downward"
					customStyle={{
						flex: 0.48,
						backgroundColor: globalStyles.Colors.success,
					}}
				/>
				<AppButton
					title="Send"
					icon="arrow-upward"
					customStyle={{
						flex: 0.48,
						backgroundColor: globalStyles.Colors.failure,
					}}
				/>
			</View>
		</ScrollView>
	)
}
