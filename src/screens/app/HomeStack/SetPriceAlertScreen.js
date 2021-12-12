import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import Screen from './../../../components/Screen'
import { routes } from '../../../config/routes'
import { globalStyles } from '../../../config/styles'
import PPriceAlertItem from '../../../components/PriceAlert/PriceAlertItem'
import AsyncStorage from '@react-native-async-storage/async-storage'

const SetPriceAlertScreen = ({ route, navigation }) => {
  const { coin } = route.params || {}
  const [state, setState] = useState({
    items: []
  })

  useEffect(() => {
    AsyncStorage.getItem("alerts").then((data) => {
      console.log("amr ", data)
      state.items = JSON.parse(data)
      setState({ ...state })
    })
  }, [])
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
        {/* {Object.keys(state.items).map((item, i) => {
          return (
            <PPriceAlertItem
              item={state.items[item].coin}
              index={i}
              key={i}
              length={Object.keys(state.items).length}
              initialOpen={i === 0}
            />
          )
        })} */}
        {/* <PPriceAlertItem
          item={coin}
          index={0}
          key={0}
          length={1}
          initialOpen={0}
        /> */}

      </View>

    </Screen>
  )
}


export default SetPriceAlertScreen