import { useNavigation } from '@react-navigation/core'
import React, { useContext, useEffect, useState } from 'react'
import { View, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import { routes } from '../../config/routes'
import { globalStyles } from '../../config/styles'
import AppText from '../common/AppText'
import HR from '../common/HR/HR'
import SwapableRow from '../common/Swapable/SwapableRow'
import { SvgUri } from 'react-native-svg'

export default function DAppItem({
  coin: item,
  index,
  length,
  // noChart,
  noPrice,
  hideDetails,
  // hasSwitch,
  onPress,
  // onHideHandler
}) {



  const { navigate } = useNavigation()
  return (
    <SwapableRow
    >
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
                {
                  item.logo.includes('svg') ? <SvgUri
                    style={{ width: 30, height: 30, }}
                    uri={item.logo}
                  /> : <Image resizeMode={"stretch"}
                    style={{ width: 30, height: 30, }} source={{ uri: item.logo }} />
                }
              </View>

              <View style={{ paddingStart: 4, paddingTop: 2, flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start' }}>
                <AppText bold typo="tiny">
                  {item.name}
                </AppText>
                <AppText color="text2" typo="tiny" style={{ marginTop: 2 }}>
                  {item.description}
                </AppText>
              </View>

            </View>
          </View>


          {/* Category */}
          {/* <View style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
            marginLeft: 50,
          }}>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <AppText typo="tiny">
                mother fucker
              </AppText>
            </View>
          </View> */}

        </View>
        <View style={{ marginVertical: 8 }}>
          {/* {index + 1 !== (length || coins.length) ? <HR /> : null} */}
          <HR />
        </View>
      </TouchableOpacity>
    </SwapableRow>
  )
}
