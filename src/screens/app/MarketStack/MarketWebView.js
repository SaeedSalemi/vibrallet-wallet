import React, { useEffect, useState } from 'react'
import {
  Image,
  Modal,
  ScrollView,
  TouchableOpacity,
  View,
  ViewPropTypes,
} from 'react-native'
import { routes } from '../../../config/routes'
import { globalStyles } from '../../../config/styles'
import AppText from '../../../components/common/AppText'
import Header from '../../../components/Header/Header'
import Screen from '../../../components/Screen'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Images } from '../../../assets'
import MarketCoinDetailItems from '../../../components/Market/MarketCoinDetailItems'
import AppButton from '../../../components/common/AppButton'
import { useDispatch, useSelector } from 'react-redux'
import { setModal } from '../../../redux/modules/appSettings'
import SetAlert from '../../../components/Market/SerAlert'
import { useNavigation } from '@react-navigation/core'
// import TradingViewWidget from '../../../components/TradingViewWidget/TradingViewWidget'
import MarketWebViewWidget from '../../../components/MarketWebView/MarketWebView'
import { WebView } from 'react-native-webview';


export default function MarketWebView({ route, navigation }) {
  const { coin } = route.params || {}

  console.log('web view', coin)
  const { navigate } = useNavigation()

  console.log('coin is here', coin.name);
  return (
    <Screen >
      <ScrollView>
        <View style={{ marginVertical: 2, height: 750 }}>
          {/* <MarketWebViewWidget name={coin.name} /> */}
          <WebView
            source={{ uri: `https://coinmarketcap.com/currencies/${coin.name.toLowerCase().replace(" ", "-")}/` }}
            style={{ marginTop: 20 }}
          />
        </View>

      </ScrollView>

    </Screen>
  )
}
