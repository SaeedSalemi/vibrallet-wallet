import * as React from 'react'
import RootNavigation from './src/navigation/root'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { StatusBar } from 'react-native'
import { globalStyles } from './src/config/styles'
import { Provider } from 'react-redux'
import configStore from './src/redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import SplashScreen from './src/screens/SplashScreen'
import { Keyboard, TouchableWithoutFeedback } from 'react-native'
import HideKeyboard from './src/utils/HideKeyboard'

const { store, persistor } = configStore()

export default function App() {
	return (
		<Provider store={store}>
			<PersistGate loading={<SplashScreen />} persistor={persistor}>
				<SafeAreaProvider
					style={{ backgroundColor: globalStyles.Colors.bckColor }}
				>
					<StatusBar translucent barStyle="light-content" />
					<HideKeyboard>
						<RootNavigation />
					</HideKeyboard>
				</SafeAreaProvider>
			</PersistGate>
		</Provider>
	)
}