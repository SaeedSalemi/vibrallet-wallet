import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { routes } from '../config/routes'
import TopTabBar from './TopTabBar'
import MarketTabScreen from '../screens/app/MarketStack/MarketTab'
import FavTabScreen from '../screens/app/MarketStack/FavTab'

export const MarketTab = createMaterialTopTabNavigator()

export function MarketTabNavigator() {
	return (
		<MarketTab.Navigator tabBar={props => <TopTabBar {...props} />}>
			<MarketTab.Screen name={routes.markets} component={MarketTabScreen} />
			<MarketTab.Screen name={routes.favMarket} component={FavTabScreen} />
		</MarketTab.Navigator>
	)
}
