import React, { useContext } from 'react'
import { View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { routes } from '../../config/routes'
import { globalStyles } from '../../config/styles'
import AppText from '../common/AppText'
import Header from '../Header/Header'
import { Context } from '../../context/Provider'

export default function DAppTabHeader({ isMarket, setIsMarket }) {
  // const { setMarketScreenActiveFilter } = useContext(Context)
  const borderStyle = {
    borderBottomWidth: 1,
    borderBottomColor: globalStyles.Colors.secondaryColor,
    borderStyle: 'solid',
  }
  return (
    <View style={{ paddingHorizontal: 8 }}>
      {/* <Header route={routes.market}> */}
      <View
        style={{ flexDirection: 'row', marginVertical: 8, paddingHorizontal: 8 }}
      >
        <View
          style={{
            alignItems: 'center',
            ...globalStyles.flex.row,
            flex: 1,
            justifyContent: 'space-between',
          }}
        >
          <TouchableOpacity
            activeOpacity={0.75}
            style={isMarket ? borderStyle : null}
          // onPress={() => {
          //   setMarketScreenActiveFilter("Market")
          //   setIsMarket(true)
          // }}
          >
            <AppText typo="tiny">
              History
            </AppText>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.75}
            style={isMarket ? null : borderStyle}
            onPress={() => {
              // setMarketScreenActiveFilter("FCAS")
              // setIsMarket(false)
            }}
          >
            <AppText typo="tiny">
              Defy
            </AppText>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.75}
            style={isMarket ? null : borderStyle}
            onPress={() => {
              // setMarketScreenActiveFilter("FCAS")
              // setIsMarket(false)
            }}
          >
            <AppText typo="tiny">
              Exhchanges
            </AppText>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.75}
            style={isMarket ? null : borderStyle}
            onPress={() => {
              // setMarketScreenActiveFilter("FCAS")
              // setIsMarket(false)
            }}
          >
            <AppText typo="tiny">
              Market
            </AppText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
