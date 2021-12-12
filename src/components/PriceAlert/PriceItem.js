import { useNavigation } from '@react-navigation/core'
import React, { useContext, useEffect, useState } from 'react'
import { View, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import { routes } from '../../config/routes'
import { globalStyles } from '../../config/styles'
import AppSwitch from '../common/AppSwitch'
import AppText from '../common/AppText'
import HR from '../common/HR/HR'
import SwapableRow from '../common/Swapable/SwapableRow'
import { SvgUri } from 'react-native-svg'
export default function PriceItem({
  logo,
  name,
  symbol,
  coin,
  index,
  length,
  noChart,
  noPrice,
  hideDetails,
  hasSwitch,
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
                {noPrice ? null : (

                  <AppText color="text2" bold style={{ marginTop: 2 }}>
                    {/* {coin.currency} */}
                    {/* {isLoading ? <ActivityIndicator
											size={15}
											color={globalStyles.Colors.primaryColor} /> : } */}
                    {111}
                  </AppText>
                )}
              </View>
            </View>
          </View>
          {noChart ? null : (
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
          )}
          {hideDetails ? null : (
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <AppText typo="tiny">
                {0} 	{symbol}
              </AppText>
              <AppText
                typo="dot"
                bold
                color={1 > 0 ? 'success' : 'failure'}
                style={{ marginVertical: 2 }}
              >
                {3 > 0 ? '+' : ''}
                {4}
              </AppText>

              <AppText bold color="text2">
                {4} $
              </AppText>
            </View>
          )}
          {hasSwitch ? (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <AppSwitch value={true} />
            </View>
          ) : null}
        </View>
        <View style={{ marginVertical: 8 }}>
          {/* {index + 1 !== (length || coins.length) ? <HR /> : null} */}
          <HR />
        </View>
      </TouchableOpacity>
    </SwapableRow>
  )
}
