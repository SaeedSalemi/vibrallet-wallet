import React, { useState, useEffect, useLayoutEffect } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { View, StyleSheet, ScrollView } from 'react-native'
import AppInput from '../common/AppInput/AppInput'

import DAppItem from './DAppItem'
import TopTabBar from '../../navigation/TopTabBar'
import { routes } from '../../config/routes'
import DAppTabHeader from '../Home/DAppTabHeader'
import DAppHistoryScreen from '../../screens/app/HomeStack/DAppHistoryScreen'
const DAppTabNavigatior = createMaterialTopTabNavigator()




const DAPPSDATA = [
  {
    id: 0,
    name: 'Sushi',
    logo: 'https://sushi.com/static/media/logo.dec926df.png',
    description: 'This is test description',
    url: 'Sushi.com'
  },
  {
    id: 3,
    name: '1inch',
    // logo: 'https://app.1inch.io/assets/images/logo.svg',
    logo: 'https://sushi.com/static/media/logo.dec926df.png',
    description: 'This is test description',
    url: 'https://app.1inch.io/'
  }
  ,
  {
    id: 4,
    name: 'Bakeryswap',
    logo: 'https://www.bakeryswap.org/static/media/logo.4e93c681.svg',
    description: 'This is test description',
    url: 'https://www.bakeryswap.org/#/home'
  },
  {
    id: 1,
    name: 'Pancakeswap',
    logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1.png',
    description: 'This is test description',
    url: 'https://pancakeswap.finance/'
  },

]


const DAppList = (props) => {


  const [filterdItems, setFilterItems] = useState(DAPPSDATA)
  const [searchDApp, setSearchDApp] = useState()
  const arrayHolder = DAPPSDATA

  const searchFilterFunction = () => {
    const includes = str => str.toLowerCase().includes(searchDApp.toLowerCase())
    const newData = arrayHolder.filter(item => {
      if (includes(item.name) || includes(item.name)) {
        return item
      }
    })
    if (newData.length > 0) {
      setFilterItems(newData)
    } else {
      // concat with array
      const newDAppItem = {
        name: 'Google',
        url: `https://www.google.com/search?${searchDApp}`,
        description: `https://www.google.com/search?${searchDApp}`,
        // logo: 'https://image.similarpng.com/thumbnail/2020/12/Flat-design-Google-logo-design-Vector-PNG.png'
        logo: 'https://w7.pngwing.com/pngs/249/19/png-transparent-google-logo-g-suite-google-guava-google-plus-company-text-logo.png'
      }
      // setFilterItems.push(prev => [...prev, newDAppItem])
      setFilterItems(prev => [...prev, newDAppItem])
      navigation.navigate(routes.dAppWebview, { name: 'Google', url: `https://www.google.com/search?q=${searchDApp}` })
    }
  }





  return (
    <>
      <View>
        <AppInput
          placeholder={"Search"}
          icon={"search"}
          onChangeText={(text) => setSearchDApp(text)}
          onSubmitEditing={searchFilterFunction}
        />
        <View style={{ marginLeft: 10, marginBottom: 4 }}>
          <DAppTabHeader isMarket={true} setIsMarket={true} />
          <AllDAppsNavigator />
        </View>
      </View>

    </>
  )
}



export default DAppList