import React, { useContext, useEffect, useState } from 'react'
import { FlatList, Image, View } from 'react-native'
import AppText from '../../../components/common/AppText'
import HR from '../../../components/common/HR/HR'
import SwapableRow from '../../../components/common/Swapable/SwapableRow'
import RatingSortHeader from '../../../components/Market/RatingSortHeader'
import { globalStyles } from '../../../config/styles'
import { Context } from '../../../context/Provider'
import { SvgUri } from 'react-native-svg'
import { showMessage } from 'react-native-flash-message'


export default function FCASFavTab() {

  const { fcasFavCoins, deleteFCASFav } = useContext(Context)
  console.log('fcas fav coins', fcasFavCoins)


  const colors = {
    'S': '#67B010',
    'A': '#4ED69D',
    'B': '#87C0A9',
    'D': '#F69B4F',
    'C': '#F84837',
  }
  const renderFCASItem = ({ item, index }) => {
    return (
      <SwapableRow leftItems={[{
        color: item.favorite && '#f1c40f',
        title: 'Favorite', icon: 'star', onPress: function () {
          item.favorite = false
          deleteFCASFav(item)
          showMessage({
            message: `${item.symbol} removed to your favorite list.`,
            description: null,
            type: 'success',
            icon: null,
            duration: 1000,
            style: { backgroundColor: "#c0392b" },
            position: 'top'
          })
        }
      }]}>
        <View
          style={{
            paddingVertical: 8,
            paddingHorizontal: 20,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <View style={{ flex: 2 }}>
            <AppText bold>{index + 1}</AppText>
          </View>
          <View style={{ flex: 3 }}>
            <AppText bold>{item.name}</AppText>
            <AppText typo="tiny" color="text3">
              ({item.symbol})
            </AppText>
          </View>
          <View
            style={{
              flex: 3,
              ...globalStyles.flex.row,
              ...globalStyles.flex.center,
            }}
          >
            <View
              style={{
                backgroundColor: colors[item.grade],
                width: 28,
                height: 20,
                borderRadius: 6,
                ...globalStyles.flex.center,
                marginHorizontal: 2,
              }}
            >
              <AppText typo="tiny" color="whiteColor">
                {item.grade}
              </AppText>
            </View>
            <AppText style={{ marginHorizontal: 2 }} bold>
              {item.score}
            </AppText>
          </View>
          <View style={{ flex: 2, paddingHorizontal: 10 }}>
            {item.svgUri ? <SvgUri
              width={80}
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
              }}
              uri={item.svgUri}
            /> : <></>}

          </View>
        </View>
        <View style={{ marginVertical: 12 }}>
          {index + 1 !== fcasFavCoins.length ? <HR /> : null}
        </View>
      </SwapableRow>
    )
  }


  return (
    <View style={globalStyles.screen}>
      <RatingSortHeader />
      <FlatList
        data={fcasFavCoins}
        renderItem={renderFCASItem}
        keyExtractor={(item, index) => `fcas_fav_${index}`}
      />
    </View>
  )
}
