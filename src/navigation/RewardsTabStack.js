import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { routes } from '../config/routes'
import ReferralRewardsScreen from '../screens/app/HomeStack/ReferralRewardsScreen'
import TopTabBar from './TopTabBar'
import TransactionRewardsScreen from '../screens/app/HomeStack/TransactionRewardsScreen'

export const RewardsTab = createMaterialTopTabNavigator()

export function RewardsTabNavigator({ initialRouteName }) {
	return (
		<RewardsTab.Navigator
			initialRouteName={initialRouteName}
			tabBar={props => <TopTabBar {...props} />}
		>
			<RewardsTab.Screen
				name={routes.referralRewards}
				component={ReferralRewardsScreen}
			/>
			<RewardsTab.Screen
				name={routes.transactionRewards}
				component={TransactionRewardsScreen}
			/>
		</RewardsTab.Navigator>
	)
}
