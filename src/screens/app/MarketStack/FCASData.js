import React, { useContext, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/core'
import { FlatList, TouchableOpacity, View, Platform, RefreshControl, Image, ActivityIndicator } from 'react-native'
import { showMessage } from 'react-native-flash-message'
import AppText from '../../../components/common/AppText'
import HR from '../../../components/common/HR/HR'
import SwapableRow from '../../../components/common/Swapable/SwapableRow'
import { routes } from '../../../config/routes'
import { globalStyles } from '../../../config/styles'
import { Context } from '../../../context/MarketProvider'

export default function FCASData(props) {

  const { marketPagination, MarketListingPageSize } = useContext(Context)
  return (
    <>
      {props.items && <FlatList
        data={props.items}
        renderItem={({ item, index }) => <RenderMarketItem item={item} index={index} type={props.type} />}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => {
              // alert('refreshing')
              // setRender(true)
              // console.log('refreshing', render)
              // // setRender(true)
              // console.log('refreshing 2', render)
            }} />
        }

      // onEndReachedThreshold={0.8}
      // onEndReached={() => {
      // 	marketPagination(MarketListingPageSize + 5)
      // }}

      // removeClippedSubviews={
      // 	Platform.OS === "android"
      // }
      />}
    </>
  )
}

const RenderMarketItem = ((props) => {
  let { item, index, type } = props
  const { navigate } = useNavigation()
  const { adder, deleteFav } = useContext(Context)
  return (
    <SwapableRow
      measure={75}
      leftItems={[{
        title: 'Favorite', icon: 'star', onPress: function () {

          if (type === "fav") {
            item.favorite = false
            deleteFav(item)
            // new HttpService(
            // 	"", {
            // 	"uniqueId": "abc",
            // 	"action": "removeFavoriteCurrency",
            // 	"data": {
            // 		"kind": "MARKET",
            // 		"currency": item.symbol
            // 	}
            // }
            // ).Post(response => {
            // 	const { success, code } = response
            // 	if (success === false && code === 5010) {
            // 		showMessage({
            // 			message: `In order to add coin to your favorite list you have sign in`,
            // 			description: null,
            // 			type: 'success',
            // 			icon: null,
            // 			duration: 8000,
            // 			style: { backgroundColor: "#e74c3c" },
            // 			position: 'top'
            // 		})
            // 	} else
            // 		showMessage({
            // 			message: `${item.name} is removed from the favorite list.`,
            // 			description: null,
            // 			type: 'success',
            // 			icon: null,
            // 			duration: 1000,
            // 			style: { backgroundColor: "#6BC0B1" },
            // 			position: 'top'
            // 		})

            // })


          }

          else if (type === "market") {

            item.favorite = true
            adder(item)

            // item.favorite = true
            // setFavcoins(prevCoins => [...prevCoins, item])
            // // console.log(`'list' ${favcoins.length}`, favcoins)
            // // 
            // CoinMap.set(item.symbol, item)

            // console.log('entries', CoinMap.size)
            // console.log('entries', CoinMap.entries())
            // console.log('to json', CoinMap.toJSON())


            // store.set('market', item)
            // console.log('store', store)
            // AsyncStorage.setItem('favCoins', JSON.stringify(store))



            // AsyncStorage.getItem('favCoins').then(favCoins => {
            // 	if (favCoins !== null) {
            // 		console.log('bekhon va beriz toi map')
            // 	}
            // 	else {

            // 	}
            // }).catch(error => {
            // 	console.log('error hichi tosh nist')
            // })



            // const itemsInStore = store.get('market')
            // console.log('items in store', itemsInStore)

            // AsyncStorage.setItem('market', JSON.stringify(store))

            // new HttpService(
            // 	"", {
            // 	"uniqueId": "abc",
            // 	"action": "addFavoriteCurrency",
            // 	"data": {
            // 		"kind": "MARKET",
            // 		"currency": item.symbol
            // 	}
            // }
            // ).Post(response => {
            // 	const { success, code } = response
            // 	if (success === false && code === 5010) {
            // 		showMessage({
            // 			message: `In order to add coin to your favorite list you have sign in`,
            // 			description: null,
            // 			type: 'success',
            // 			icon: null,
            // 			duration: 8000,
            // 			style: { backgroundColor: "#e74c3c" },
            // 			position: 'top'
            // 		})
            // 	} else {
            // 		showMessage({
            // 			message: `${item.name} is added to the favorite list.`,
            // 			description: null,
            // 			type: 'success',
            // 			icon: null,
            // 			duration: 1000,
            // 			style: { backgroundColor: "#6BC0B1" },
            // 			position: 'top'
            // 		})
            // 	}
            // })
          }
        }
      }]}
    >
      <TouchableOpacity
        style={{ paddingHorizontal: 20 }}
        onPress={() => {

          navigate(routes.marketWebview, { coin: item })
        }}
      >
        <View
          style={{
            paddingVertical: 4,
            flexDirection: 'row',
          }}
        >
          <View style={{ flex: 1, flexDirection: 'row' }}>

            <View style={{
              backgroundColor: globalStyles.Colors.inputColor2,
              height: 40,
              ...globalStyles.flex.center,
              borderRadius: 8,
              paddingHorizontal: 8,
              paddingVertical: 0,
              marginHorizontal: 4
            }}>
              <Image resizeMode={"stretch"}
                style={{ width: 30, height: 30, }} source={{ uri: item.logo }} />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <AppText bold typo="tiny">
                {item.symbol}
              </AppText>
              <AppText typo="dot" color="text3">
                /USDT
              </AppText>
            </View>
            {/* <AppText typo="tiny" color="text3" >
							Vol. {parseFloat(item.volume_24h).toFixed(3)}
						</AppText> */}
          </View>
          <View
            style={{
              flex: 1,
              ...globalStyles.flex.center,
            }}
          >
            <AppText typo="sm" bold
              color={item.percent_change_24h > 0 ? 'success' : 'failure'}>
              {parseFloat(item.price).toFixed(3)}
            </AppText>
            <AppText typo="tiny" color="text3">
              {parseFloat(item.price).toFixed(3)}
            </AppText>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'flex-end',
              justifyContent: 'center',
            }}
          >
            <View
              style={{
                width: 96,
                height: 40,
                borderRadius: 10,
                backgroundColor:
                  globalStyles.Colors[
                  item.percent_change_24h > 0 ? 'successOpacity' : 'failureOpacity'
                  ],
                ...globalStyles.flex.center,
              }}
            >
              <AppText
                bold
                typo="sm"
                color={item.percent_change_24h > 0 ? 'success' : 'failure'}
              >
                {/* {item.increase ? '+' : '-'} 1.42% */}
                {item.percent_change_24h > 0 ? '+' : ''}
                {parseFloat(item.percent_change_24h).toFixed(2)}
              </AppText>
            </View>
          </View>
        </View>
        <View style={{ marginVertical: 12 }}>
          {/* {index + 1 !== items.length ? <HR /> : null} */}
        </View>
      </TouchableOpacity>
    </SwapableRow>
  )
})