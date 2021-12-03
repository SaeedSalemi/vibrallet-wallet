import React, { useContext } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { globalStyles } from '../../config/styles'
import AppText from '../common/AppText'
import MarketHeaderContainer from './MarketHeaderContainer'
import { Context } from '../../context/Provider'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export default function RatingSortHeader() {
	const { changeFCASSort, FCASSort } = useContext(Context)

	const DEFAULT_COLOR = '#615F69';
	const PRIMARY_COLOR = '#FF9901';

	return (
		<MarketHeaderContainer style={{ justifyContent: 'center', alignItems: 'center', }}>

			<View style={{ flex: 2, alignItems: 'flex-end' }}>
				<AppText typo="tiny" color="text2">
				</AppText>
			</View>

			<View style={{ flex: 2, }}>


				<TouchableOpacity onPress={() => {
					FCASSort === 'rank' ? changeFCASSort('-rank') : changeFCASSort('rank')
				}}
				>
					<AppText color={FCASSort === 'rank' || FCASSort === "-rank" ? 'primaryColor' : 'text3'} typo="tiny">
						Rank <MaterialCommunityIcons name={FCASSort === 'rank' ? 'arrow-up' : 'arrow-down'}
							color={FCASSort === 'rank' || FCASSort === "-rank" ? `${PRIMARY_COLOR}` : `${DEFAULT_COLOR}`}
						/>
					</AppText>
				</TouchableOpacity>


				{/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
					<AppText typo="tiny" color="text2" style={{ paddingEnd: 2 }}>
						Rank
					</AppText>
				</View> */}


			</View>
			<View style={{ flex: 3 }}>
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
						FCASSort === 'score' ? changeFCASSort('-score') : changeFCASSort('score')
					}}>
						<AppText color={FCASSort === 'score' || FCASSort === "-score" ? 'primaryColor' : 'text3'} typo="tiny">
							FCAS <MaterialCommunityIcons name={FCASSort === 'score' ? 'arrow-up' : 'arrow-down'}
								color={FCASSort === 'score' || FCASSort === "-score" ? `${PRIMARY_COLOR}` : `${DEFAULT_COLOR}`} />
						</AppText>
					</TouchableOpacity>
				</View>
			</View>
		</MarketHeaderContainer>
	)
}
