import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { routes } from '../config/routes'
import { globalStyles } from '../config/styles'
import CreateAccountWithEmailScreen from '../screens/authentication/CreateAccountWithEmailScreen'
import CreateAccountWithPhoneScreen from '../screens/authentication/CreateAccountWithPhoneScreen'
import RestoreModalScreen from '../screens/authentication/RestoreModalScreen'
import VerifyEmailScreen from '../screens/authentication/VerifyEmailScreen'
import VerifyPhoneScreen from '../screens/authentication/VerifyPhoneScreen'
import WelcomeScreen from '../screens/WelcomeScreen'
import BackButton from './BackButton'
import HeaderTitle from './HeaderTitle'
import NewWallet from '../screens/app/ProfileStack/NewWallet'
import AppText from '../components/common/AppText'
import SetPincode from '../screens/app/ProfileStack/SetPincode'
import WordBackup from '../screens/app/ProfileStack/WordBackup'
import ProfileWalletScreen from '../screens/app/ProfileStack/ProfileWalletScreen'

export const AuthStack = createNativeStackNavigator()

export function AuthStackNavigation() {
	return (
		<AuthStack.Navigator
			screenOptions={({ navigation }) => ({
				headerStyle: {
					backgroundColor: globalStyles.Colors.bckColor,
				},
				headerTitleAlign: 'center',
				headerTintColor: globalStyles.Colors.textColor,
				headerTitleStyle: {
					color: globalStyles.Colors.textColor,
				},
				headerBackVisible: false,
				headerLeft: props => <BackButton navigation={navigation} {...props} />,
			})}
		>
			<AuthStack.Screen
				name={routes.welcome}
				options={{ headerShown: false }}
				component={WelcomeScreen}
			/>
			<AuthStack.Screen
				name={routes.createWalletPhone}
				options={{
					headerTitle: () => <HeaderTitle>Create With Phone</HeaderTitle>,
				}}
				component={CreateAccountWithPhoneScreen}
			/>
			<AuthStack.Screen
				name={routes.createWalletEmail}
				options={{
					headerTitle: () => <HeaderTitle>Create With Email</HeaderTitle>,
				}}
				component={CreateAccountWithEmailScreen}
			/>
			<AuthStack.Screen
				name={routes.verifyPhone}
				options={{ headerTitle: () => <HeaderTitle>Verify Phone</HeaderTitle> }}
				component={VerifyPhoneScreen}
			/>
			<AuthStack.Screen
				name={routes.verifyEmail}
				options={{ headerTitle: () => <HeaderTitle>Verify Email</HeaderTitle> }}
				component={VerifyEmailScreen}
			/>
			<AuthStack.Screen
				name={routes.restore}
				options={{
					headerTitle: () => <HeaderTitle>Restore Wallet</HeaderTitle>,
				}}
				component={RestoreModalScreen}
			/>
		</AuthStack.Navigator>
	)
}
