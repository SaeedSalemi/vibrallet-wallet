import React, { useContext } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { globalStyles } from '../../config/styles'
// import AppIcon from '../common/AppIcon'
import AppText from '../common/AppText'
import MarketHeaderContainer from './MarketHeaderContainer'
import { Context } from '../../context/MarketProvider'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export default function RatingSortHeader() {
	const { changeFCASSort, FCASSort } = useContext(Context)

	const DEFAULT_COLOR = '#615F69';
	const PRIMARY_COLOR = '#FF9901';

	return (
		<MarketHeaderContainer style={{}}>
			<View style={{ flex: 2 }}>
				<View style={{ flexDirection: 'row', alignItems: 'center' }}>
					<AppText typo="tiny" color="text2" style={{ paddingEnd: 2 }}>
						Rank
					</AppText>
					{/* <AppIcon name="arrowDownSm2" /> */}
				</View>
			</View>
			<View style={{ flex: 3 }}>
				{/* <AppText typo="tiny" color="text2">
					Project
				</AppText> */}

				<TouchableOpacity onPress={() => {
					FCASSort === 'name' ? changeFCASSort('-name') : changeFCASSort('name')
				}}>
					<AppText color={FCASSort === 'name' || FCASSort === "-name" ? 'primaryColor' : 'text3'} typo="tiny">
						Project <MaterialCommunityIcons name={FCASSort === 'name' ? 'arrow-up' : 'arrow-down'}
							color={FCASSort === 'name' || FCASSort === "-name" ? `${PRIMARY_COLOR}` : `${DEFAULT_COLOR}`} />
					</AppText>
				</TouchableOpacity>
			</View>
			<View style={{ flex: 3 }}>
				<View style={{ flexDirection: 'row', ...globalStyles.flex.center }}>
					{/* <AppText typo="tiny" color="text2" style={{ paddingEnd: 2 }}>
						FCAS
					</AppText>
					<AppIcon name="arrowDownSm" /> */}
					<TouchableOpacity onPress={() => {
						FCASSort === 'grade' ? changeFCASSort('-grade') : changeFCASSort('grade')
					}}>
						<AppText color={FCASSort === 'grade' || FCASSort === "-grade" ? 'primaryColor' : 'text3'} typo="tiny">
							FCAS <MaterialCommunityIcons name={FCASSort === 'grade' ? 'arrow-up' : 'arrow-down'}
								color={FCASSort === 'grade' || FCASSort === "-grade" ? `${PRIMARY_COLOR}` : `${DEFAULT_COLOR}`} />
						</AppText>
					</TouchableOpacity>
				</View>
			</View>
			<View style={{ flex: 2, alignItems: 'flex-end' }}>
				<AppText typo="tiny" color="text2">
					Last 30D
				</AppText>
			</View>
		</MarketHeaderContainer>
	)
}
