import React, { useContext } from 'react'
import { View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { routes } from '../../config/routes'
import { globalStyles } from '../../config/styles'
import AppText from '../common/AppText'
import Header from '../Header/Header'
import { Context } from '../../context/Provider'

export default function MarketHeader({ isMarket, setIsMarket }) {
	const { setMarketScreenActiveFilter } = useContext(Context)
	const borderStyle = {
		borderBottomWidth: 1,
		borderBottomColor: globalStyles.Colors.secondaryColor,
		borderStyle: 'solid',
	}
	return (
		<View style={{ paddingHorizontal: 8 }}>
			<Header route={routes.market}>
				<View
					style={{
						alignItems: 'center',
						...globalStyles.flex.row,
						flex: 1,
						justifyContent: 'space-between',
					}}
				>
					<TouchableOpacity
						activeOpacity={0.75}
						style={isMarket ? borderStyle : null}
						onPress={() => {
							setMarketScreenActiveFilter("Market")
							setIsMarket(true)
						}}
					>
						<AppText bold typo="sm">
							Market
						</AppText>
					</TouchableOpacity>
					<TouchableOpacity
						activeOpacity={0.75}
						style={isMarket ? null : borderStyle}
						onPress={() => {
							setMarketScreenActiveFilter("FCAS")
							setIsMarket(false)
						}}
					>
						<AppText bold typo="sm">
							FCAS Rating
						</AppText>
					</TouchableOpacity>
				</View>
			</Header>
		</View>
	)
}
