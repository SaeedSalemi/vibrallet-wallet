import React from 'react'
import {
  ScrollView,
  View,
} from 'react-native'
import Screen from '../../../components/Screen'
import { WebView } from 'react-native-webview';


export default function DAppWebView({ route, navigation }) {
  const { url } = route.params || {}

  return (
    <Screen >
      <ScrollView>
        <View style={{ marginVertical: 2, height: 750 }}>
          <WebView
            source={{ uri: url }}
            style={{ marginTop: 20 }}
            javaScriptEnabled
            // domStorageEnabled
            decelerationRate="normal"
            startInLoadingState={true}
          />
        </View>
      </ScrollView>

    </Screen>
  )
}
