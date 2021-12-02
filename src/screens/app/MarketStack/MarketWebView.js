import React from 'react'
import {
  ScrollView,
  View,
} from 'react-native'
import Screen from '../../../components/Screen'
import { useNavigation } from '@react-navigation/core'
import { WebView } from 'react-native-webview';


export default function MarketWebView({ route, navigation }) {
  const { coin } = route.params || {}

  const { navigate } = useNavigation()
  let name = coin.name.replace(/\s+/g, '-').toLowerCase();
  return (
    <Screen >
      <ScrollView>
        <View style={{ marginVertical: 2, height: 750 }}>
          <WebView
            source={{ uri: `https://coinmarketcap.com/currencies/${name}/` }}
            style={{ marginTop: 20 }}
          />
        </View>
      </ScrollView>

    </Screen>
  )
}
