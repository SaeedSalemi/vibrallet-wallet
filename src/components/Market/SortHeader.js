import React, { useContext } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { globalStyles } from '../../config/styles'
import AppText from '../common/AppText'
import MarketHeaderContainer from './MarketHeaderContainer'
import { Context } from '../../context/MarketProvider'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export default function SortHeader() {
	const { changeMarketSort, MarketListingSort } = useContext(Context)
	const DEFAULT_COLOR = '#615F69';
	const PRIMARY_COLOR = '#FF9901';
	return (
		<MarketHeaderContainer>
			<View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, justifyContent: 'center' }}>
				<TouchableOpacity onPress={() => {
					MarketListingSort === 'symbol' ? changeMarketSort('-symbol') : changeMarketSort('symbol')
				}}>
					<AppText color={MarketListingSort === 'symbol' || MarketListingSort === "-symbol" ? 'primaryColor' : 'text3'} typo="tiny">
						Name <MaterialCommunityIcons name={MarketListingSort === 'symbol' ? 'arrow-up' : 'arrow-down'}
							color={MarketListingSort === 'symbol' || MarketListingSort === "-symbol" ? `${PRIMARY_COLOR}` : `${DEFAULT_COLOR}`} />
					</AppText>
				</TouchableOpacity>

				{/* <AppText typo="tiny" color="text3" style={{ marginHorizontal: 1 }}>
					/
				</AppText> */}
				{/* <TouchableOpacity onPress={() => {
					MarketListingSort === 'volume_24h' ? changeMarketSort('-volume_24h') : changeMarketSort('volume_24h')
				}}>

					<AppText color={MarketListingSort === 'volume_24h' || MarketListingSort === "-volume_24h" ? 'primaryColor' : 'text3'} typo="tiny">
						Vol <MaterialCommunityIcons name={MarketListingSort === 'volume_24h' ? 'arrow-up' : 'arrow-down'}
							color={MarketListingSort === 'volume_24h' || MarketListingSort === "-volume_24h" ? `${PRIMARY_COLOR}` : `${DEFAULT_COLOR}`} />
					</AppText>
				</TouchableOpacity> */}
			</View>
			<View
				style={{
					...globalStyles.flex.center,
					...globalStyles.flex.row,
					flex: 1,
				}}
			>
				<TouchableOpacity onPress={() => {
					MarketListingSort === 'price' ? changeMarketSort('-price') : changeMarketSort('price')
				}}>
					<AppText color={MarketListingSort === 'price' || MarketListingSort === "-price" ? 'primaryColor' : 'text3'} typo="tiny">
						Last Price <MaterialCommunityIcons name={MarketListingSort === 'price' ? 'arrow-up' : 'arrow-down'}
							color={MarketListingSort === 'price' || MarketListingSort === "-price" ? `${PRIMARY_COLOR}` : `${DEFAULT_COLOR}`} />
					</AppText>
				</TouchableOpacity>
			</View>
			<View
				style={{
					...globalStyles.flex.center,
					...globalStyles.flex.row,
					flex: 1,
					justifyContent: 'flex-end',
				}}
			>
				<TouchableOpacity onPress={() => {
					MarketListingSort === 'percent_change_24h' ? changeMarketSort('-percent_change_24h') : changeMarketSort('percent_change_24h')
				}}>
					<AppText color={MarketListingSort === 'percent_change_24h' || MarketListingSort === "-percent_change_24h" ? 'primaryColor' : 'text3'} typo="tiny">
						24h Chg% <MaterialCommunityIcons name={MarketListingSort === 'percent_change_24h' ? 'arrow-up' : 'arrow-down'}
							color={MarketListingSort === 'percent_change_24h' || MarketListingSort === "-percent_change_24h" ? `${PRIMARY_COLOR}` : `${DEFAULT_COLOR}`} />
					</AppText>
				</TouchableOpacity>

			</View>
		</MarketHeaderContainer>
	)
}
