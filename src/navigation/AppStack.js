import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { routes } from '../config/routes'
import { globalStyles } from '../config/styles'
import MarketScreen from '../screens/app/MarketStack/MarketScreen'
import WalletScreen from '../screens/app/WalletScreen'
import TransactionScreen from '../screens/app/Transaction/TransactionScreen'
import TabBar from './TabBar'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/app/HomeStack/HomeScreen'
import ExchangeScreen from '../screens/app/HomeStack/ExchangeScreen'
import P2PScreen from '../screens/app/HomeStack/P2PScreen'
import RewardsScreen from '../screens/app/HomeStack/RewardsScreen'
import PriceAlertScreen from '../screens/app/HomeStack/PriceAlertScreen'
import CreatePriceAlertScreen from '../screens/app/HomeStack/CreatePriceAlertScreen'
import NewCoinAlertScreen from '../screens/app/HomeStack/NewCoinAlertScreen'
import SingleSliderScreen from '../screens/app/HomeStack/SingleSliderScreen'
import BackButton from './BackButton'
import ProfileScreen from '../screens/app/ProfileStack/ProfileScreen'
import EditProfileScreen from '../screens/app/ProfileStack/EditProfileScreen'
import AppText from '../components/common/AppText'
import ProfileRewardsScreen from '../screens/app/ProfileStack/ProfileRewardsScreen'
import ProfileWalletScreen from '../screens/app/ProfileStack/ProfileWalletScreen'
import SecurityScreen from '../screens/app/ProfileStack/SecurityScreen'
import SettingScreen from '../screens/app/ProfileStack/SettingScreen'
import SupportScreen from '../screens/app/ProfileStack/SupportScreen'
import NewWallet from '../screens/app/ProfileStack/NewWallet'
import SetPincode from '../screens/app/ProfileStack/SetPincode'
import WordBackup from '../screens/app/ProfileStack/WordBackup'
import UserCoinsScreen from '../screens/app/ProfileStack/UserCoinsScreen'
import AddCoinOrToken from '../screens/app/ProfileStack/AddCoinOrTokem'
import AboutUs from '../screens/app/ProfileStack/AboutUsScreen'
import LanguageScreen from '../screens/app/ProfileStack/LanguageScreen'
import LocalCurrencyScreen from '../screens/app/ProfileStack/LocalCurrencyScreen'
import EditFavorites from '../screens/app/MarketStack/EditFavorites'
import SearchPairsScreen from '../screens/app/MarketStack/SearchPairsScreen'
import SelectCoinScreen from '../screens/app/Transaction/SelectCoinScreen'
import BuyScreen from '../screens/app/Transaction/BuyScreen'
import ReceiveScreen from '../screens/app/Transaction/ReceiveScreen'
import SendScreen from '../screens/app/Transaction/SendScreen'
import ConfirmTransaction from '../screens/app/Transaction/ConfirmTransaction'
import NotificationScreen from '../screens/app/HomeStack/NotificationScreen'
import WelcomeBack from '../screens/app/HomeStack/WelcomeBack'
import NewPasswordScreen from '../screens/app/ProfileStack/NewPasswordScreen'
import ChangePasswordScreen from '../screens/app/ProfileStack/ChangePasswordScreen'
import FiltersScreen from '../screens/app/WalletScreen/FIltersScreen'
import DetailedHistory from '../screens/app/MarketStack/DetailedHistory'
import CoinDetailWithoutHistory from '../screens/app/MarketStack/CoinDetailWithoutHistory'
import MarketCoinDetail from '../screens/app/MarketStack/MarketCoinDetailScreen'
import MarketCoinDetailScreen from '../screens/app/MarketStack/MarketCoinDetailScreen'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { TouchableOpacity, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { setModal } from '../redux/modules/appSettings'

export const AppTab = createBottomTabNavigator()

export function AppTabNavigation() {
	return (
		<AppTab.Navigator
			screenOptions={{
				headerShown: false,
				tabBarStyle: {
					backgroundColor: globalStyles.Colors.inputColor,
					borderTopWidth: 0,
				},
			}}
			tabBar={props => <TabBar {...props} />}
			initialRouteName={routes.home}
		>
			<AppTab.Screen name={routes.home} component={HomeScreen} />
			<AppTab.Screen name={routes.wallet} component={WalletScreen} />
			<AppTab.Screen name={routes.transaction} component={TransactionScreen} />
			<AppTab.Screen name={routes.market} component={MarketScreen} />
			<AppTab.Screen name={routes.profile} component={ProfileScreen} />
		</AppTab.Navigator>
	)
}

export const AppStack = createNativeStackNavigator()
export function AppStackNavigation() {
	const dispatch = useDispatch()

	return (
		<AppStack.Navigator
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
				headerShadowVisible: false,
				contentStyle: {
					backgroundColor: globalStyles.Colors.bckColor,
				},
			})}
		>
			<AppTab.Screen
				name={routes.appTab}
				component={AppTabNavigation}
				options={{ headerShown: false }}
			/>
			<AppStack.Screen
				name={routes.coinDetailWithoutHistory}
				component={CoinDetailWithoutHistory}
				options={{
					headerTitle: () => (
						<AppText typo="md" bold>
							Ethereum
						</AppText>
					),
				}}
			/>
			<AppStack.Screen
				name={routes.welcomeBack}
				component={WelcomeBack}
				options={{ headerShown: false }}
			/>
			<AppStack.Screen
				options={{
					headerTitle: () => (
						<AppText typo="sm">150,000 PAX TO GIVE AWAY!</AppText>
					),
				}}
				name={routes.singleSlider}
				component={SingleSliderScreen}
			/>
			<AppStack.Screen name={routes.exchange} component={ExchangeScreen} />
			<AppStack.Screen
				name={routes.p2pTrading}
				options={{
					headerTitle: () => <AppText typo="sm">P2P Trading</AppText>,
				}}
				component={P2PScreen}
			/>
			<AppStack.Screen
				name={routes.rewards}
				component={RewardsScreen}
				options={{
					headerTitle: () => <AppText typo="sm">Rewards</AppText>,
				}}
			/>
			<AppStack.Screen
				name={routes.priceAlert}
				component={PriceAlertScreen}
				options={{
					headerTitle: () => <AppText typo="sm">Price Alert</AppText>,
				}}
			/>
			<AppStack.Screen
				name={routes.createPriceAlert}
				component={CreatePriceAlertScreen}
				options={{
					headerTitle: () => <AppText typo="sm">Create Price Alert</AppText>,
				}}
			/>
			<AppStack.Screen
				name={routes.detailedHistory}
				component={DetailedHistory}
				options={{ headerTitle: () => <AppText typo="md">Sent</AppText> }}
			/>
			<AppStack.Screen
				name={routes.newCoinAlert}
				component={NewCoinAlertScreen}
				options={{
					headerTitle: () => <AppText typo="sm">New ETH Alert</AppText>,
				}}
			/>
			<AppStack.Screen
				options={{
					headerTitle: () => (
						<AppText typo="md" bold>
							Edit Profile
						</AppText>
					),
				}}
				name={routes.editProfile}
				component={EditProfileScreen}
			/>
			<AppStack.Screen
				name={routes.profileRewards}
				component={ProfileRewardsScreen}
				options={{
					headerTitle: () => (
						<AppText typo="md" bold>
							Rewards
						</AppText>
					),
				}}
			/>
			<AppStack.Screen
				name={routes.filters}
				component={FiltersScreen}
				options={{
					headerTitle: () => (
						<AppText typo="md" bold>
							Filters
						</AppText>
					),
				}}
			/>
			<AppStack.Screen
				name={routes.profileWallet}
				component={ProfileWalletScreen}
				options={{
					headerTitle: () => (
						<AppText typo="md" bold>
							Wallets
						</AppText>
					),
				}}
			/>
			<AppStack.Screen
				name={routes.security}
				component={SecurityScreen}
				options={{
					headerTitle: () => (
						<AppText typo="md" bold>
							Security
						</AppText>
					),
				}}
			/>
			<AppStack.Screen
				name={routes.setting}
				component={SettingScreen}
				options={{
					headerTitle: () => (
						<AppText typo="md" bold>
							Settings
						</AppText>
					),
				}}
			/>

			<AppStack.Screen
				name={routes.support}
				component={SupportScreen}
				options={{
					headerTitle: () => (
						<AppText typo="md" bold>
							Support
						</AppText>
					),
				}}
			/>
			<AppStack.Screen
				name={routes.newWallet}
				component={NewWallet}
				options={{
					headerTitle: () => (
						<AppText typo="md" bold>
							New Wallet
						</AppText>
					),
				}}
			/>
			<AppStack.Screen
				name={routes.wordBackup}
				component={WordBackup}
				options={{
					headerTitle: () => (
						<AppText typo="md" bold>
							12-Word Backup
						</AppText>
					),
				}}
			/>

			<AppStack.Screen
				name={routes.setPincode}
				component={SetPincode}
				options={{
					headerTitle: () => (
						<AppText typo="md" bold>
							Set Pincode
						</AppText>
					),
				}}
			/>
			<AppStack.Screen
				name={routes.userCoins}
				component={UserCoinsScreen}
				options={{
					headerTitle: () => (
						<AppText typo="md" bold>
							Amin Coins
						</AppText>
					),
				}}
			/>
			<AppStack.Screen
				name={routes.addCoinOrToken}
				component={AddCoinOrToken}
				options={{
					headerTitle: () => (
						<AppText bold typo="md">
							Add Coin/Token
						</AppText>
					),
				}}
			/>
			<AppStack.Screen
				name={routes.language}
				component={LanguageScreen}
				options={{
					headerTitle: () => (
						<AppText bold typo="md">
							Language
						</AppText>
					),
				}}
			/>
			<AppStack.Screen
				name={routes.aboutUs}
				component={AboutUs}
				options={{
					headerTitle: () => (
						<AppText bold typo="md">
							About Us
						</AppText>
					),
				}}
			/>
			<AppStack.Screen
				name={routes.localCurrency}
				component={LocalCurrencyScreen}
				options={{
					headerTitle: () => (
						<AppText typo="md" bold>
							Local Currency
						</AppText>
					),
				}}
			/>
			<AppStack.Screen
				name={routes.favorites}
				component={EditFavorites}
				options={{
					headerTitle: () => (
						<AppText typo="md" bold>
							Edit Favorites
						</AppText>
					),
				}}
			/>
			<AppStack.Screen
				name={routes.search}
				component={SearchPairsScreen}
				options={{
					headerTitle: () => (
						<AppText typo="md" bold>
							Search Paris
						</AppText>
					),
				}}
			/>
			<AppStack.Screen
				name={routes.selectCoin}
				component={SelectCoinScreen}
				options={{
					headerTitle: () => (
						<AppText typo="md" bold>
							Select a coin
						</AppText>
					),
				}}
			/>
			<AppStack.Screen
				name={routes.buy}
				component={BuyScreen}
				options={({ route }) => ({
					headerTitle: () => (
						<AppText typo="md" bold>
							Buy {route.params?.coin.title}
						</AppText>
					),
				})}
			/>
			<AppStack.Screen
				name={routes.receive}
				component={ReceiveScreen}
				options={({ route }) => ({
					headerTitle: () => (
						<AppText typo="md" bold>
							Receive {route.params?.coin.title}
						</AppText>
					),
				})}
			/>
			<AppStack.Screen
				name={routes.send}
				component={SendScreen}
				options={({ route }) => ({
					headerTitle: () => (
						<AppText typo="md" bold>
							Send {route.params?.coin.title}
						</AppText>
					),
				})}
			/>
			<AppStack.Screen
				name={routes.confirmTransaction}
				component={ConfirmTransaction}
				options={{
					headerTitle: () => (
						<AppText bold typo="md">
							Confirm Transaction
						</AppText>
					),
				}}
			/>
			<AppStack.Screen
				name={routes.notification}
				component={NotificationScreen}
			/>
			<AppStack.Screen
				name={routes.newPassword}
				component={NewPasswordScreen}
				options={{
					headerTitle: () => (
						<AppText bold typo="md">
							New Password
						</AppText>
					),
				}}
			/>
			<AppStack.Screen
				name={routes.marketCoinDetail}
				component={MarketCoinDetailScreen}
				options={({ route }) => {
					const { coin } = route.params || {}

					return {
						headerTitle: () => (
							<AppText bold typo="md">
								{coin.slug}/USDT
							</AppText>
						),
						headerRight: () => (
							<TouchableOpacity
								onPress={() => {
									dispatch(setModal(true))
								}}
								style={{
									...globalStyles.flex.center,
									width: 45,
									height: 45,
									borderRadius: 10,
									borderWidth: 1,
									borderColor: globalStyles.Colors.inputColor,
								}}
							>
								<MaterialCommunityIcons
									name="bell-plus-outline"
									color={globalStyles.Colors.text1}
									size={20}
								/>
							</TouchableOpacity>
						),
					}
				}}
			/>
			<AppStack.Screen
				name={routes.changePassword}
				component={ChangePasswordScreen}
				options={{
					headerTitle: () => (
						<AppText bold typo="md">
							Change Password
						</AppText>
					),
				}}
			/>
		</AppStack.Navigator>
	)
}
