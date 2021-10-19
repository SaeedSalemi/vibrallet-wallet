import React from 'react'
import { View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { routes } from '../../config/routes'
import { globalStyles } from '../../config/styles'
import AppText from '../common/AppText'
import Header from '../Header/Header'

export default function MarketHeader({ isMarket, setIsMarket }) {
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
						onPress={() => setIsMarket(true)}
					>
						<AppText bold typo="sm">
							Market
						</AppText>
					</TouchableOpacity>
					<TouchableOpacity
						activeOpacity={0.75}
						style={isMarket ? null : borderStyle}
						onPress={() => setIsMarket(false)}
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
