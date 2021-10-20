import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import React from 'react'
import AddressScreen from '../../../components/ReceiveScreen/AddressScreen'
import UsernameScreen from '../../../components/ReceiveScreen/UsernameScreen'
import Screen from '../../../components/Screen'
import { routes } from '../../../config/routes'
import TopTabBar from '../../../navigation/TopTabBar'

export const ReceiveTab = createMaterialTopTabNavigator()

export default function ReceiveScreen({ route, navigation }) {
	const { coin } = route.params || {}

	return (
		<Screen gap={false} edges={['bottom']}>
			<ReceiveTab.Navigator tabBar={props => <TopTabBar {...props} />}>
				<ReceiveTab.Screen
					initialParams={{ coin }}
					name={routes.receiveAddressTab}
					component={AddressScreen}
				/>
				<ReceiveTab.Screen
					initialParams={{ coin }}
					name={routes.receiveUsernameTab}
					component={UsernameScreen}
				/>
			</ReceiveTab.Navigator>
		</Screen>
	)
}
