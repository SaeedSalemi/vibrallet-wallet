import React, { useContext } from 'react'
import { View, Text } from 'react-native'
// import SortHeader from '../../../components/Market/SortHeader'
import { globalStyles } from '../../../config/styles'
import { Context } from '../../../context/Provider'
// import MarketData from './MarketData'

export default function DAppHistoryScreen() {
  // const { MarketListing } = useContext(Context)
  return (
    <View style={globalStyles.screen}>
      {/* <SortHeader />
      <MarketData type="market" items={MarketListing} /> */}
      <Text>This is history</Text>
    </View>
  )
}
