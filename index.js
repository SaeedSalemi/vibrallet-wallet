import './shim'
import 'react-native-gesture-handler'

import App from './App'
import { AppRegistry } from 'react-native'
import './src/helper/Prototpye'

AppRegistry.registerComponent('main', () => App)
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
