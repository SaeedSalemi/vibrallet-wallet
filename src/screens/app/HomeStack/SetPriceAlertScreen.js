import React from 'react'
import { View } from 'react-native'
import Screen from './../../../components/Screen'
import { routes } from '../../../config/routes'
import { globalStyles } from '../../../config/styles'
import PPriceAlertItem from '../../../components/PriceAlert/PriceAlertItem'

const SetPriceAlertScreen = ({ route, navigation }) => {
  const { coin } = route.params || {}
  return (
    <Screen
      edges={['bottom']}
      style={[globalStyles.gapScreen, { paddingVertical: 8 }]}
    >
      <View
        style={{
          flex: 1,
        }}
      >

        <PPriceAlertItem
          item={coin}
          index={0}
          key={0}
          length={1}
          initialOpen={0}
        />

      </View>

    </Screen>
  )
}


export default SetPriceAlertScreen