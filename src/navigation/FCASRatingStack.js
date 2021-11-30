import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { routes } from '../config/routes'
import TopTabBar from './TopTabBar'
import FCASFavTab from '../screens/app/MarketStack/FCASFavTab'
import FCASRatingScreen from '../screens/app/MarketStack/FCASRatingScreen'

export const FCASRatingTab = createMaterialTopTabNavigator()

export function FCASRatingTabNavigator() {
	return (
		<FCASRatingTab.Navigator tabBar={props => <TopTabBar {...props} />}>
			<FCASRatingTab.Screen
				name={routes.ratings}
				component={FCASRatingScreen}
			/>
			<FCASRatingTab.Screen name={routes.favRating} component={FCASFavTab} />
		</FCASRatingTab.Navigator>
	)
}
