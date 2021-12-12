import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { View, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import { routes } from '../../config/routes'
import { globalStyles } from '../../config/styles'
import AppSwitch from '../common/AppSwitch'
import AppText from '../common/AppText'
import HR from '../common/HR/HR'
import SwapableRow from '../common/Swapable/SwapableRow'
export default function PriceItem({
  logo,
  name,
  symbol,
  price,
  type,
  status,
  coin,
  index,
  length,
  onPress,
}) {

  const { navigate } = useNavigation()
  return (
    <SwapableRow>
      <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
        <View style={{ flexDirection: 'row', zIndex: 9 }}>
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{
                backgroundColor: globalStyles.Colors.inputColor2,
                height: 50,
                ...globalStyles.flex.center,
                borderRadius: 8,
                paddingHorizontal: 8,
                paddingVertical: 0,
                marginHorizontal: 4
              }}>
                <Image resizeMode={"stretch"}
                  style={{ width: 30, height: 30, }} source={{ uri: logo }} />
              </View>

              <View style={{ paddingStart: 4, paddingTop: 2, flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start' }}>
                <AppText bold typo="tiny">
                  {name}
                </AppText>
                {/* <AppText typo="dot" bold color="text3">
									{coin.name}
								</AppText> */}
                <AppText color="text2" bold style={{ marginTop: 2 }}>
                  {/* {coin.currency} */}
                  {/* {isLoading ? <ActivityIndicator
											size={15}
											color={globalStyles.Colors.primaryColor} /> : } */}
                  {price}
                </AppText>
              </View>
            </View>
          </View>
          <View style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 0,
            marginLeft: 50,
            maxHeight: 0,
          }}>
          </View>
          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            {/* <AppText typo="tiny">
              {0} 	{symbol}
            </AppText> */}
            <AppText
              typo="dot"
              bold
              color={1 > 0 ? 'success' : 'failure'}
              style={{ marginVertical: 0 }}
            >

            </AppText>

            <AppText color="text2">
              {type}
            </AppText>
          </View>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            {/* <AppSwitch value={status} /> */}
          </View>
        </View>
        <View style={{ marginVertical: 8 }}>
          {/* {index + 1 !== (length || coins.length) ? <HR /> : null} */}
          <HR />
        </View>
      </TouchableOpacity>
    </SwapableRow>
  )
}
