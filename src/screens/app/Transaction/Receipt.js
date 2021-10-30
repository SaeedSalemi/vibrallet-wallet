import React, { useMemo, useState } from 'react'
import { ScrollView, View } from 'react-native'
import AppButton from '../../../components/common/AppButton'
import HR from '../../../components/common/HR/HR'
import Screen from '../../../components/Screen'
import CoinTitle from '../../../components/SendScreen/CoinTitle'
import InfoItems from '../../../components/SendScreen/InfoItems/InfoItem'
import { routes } from '../../../config/routes'
import { globalStyles } from '../../../config/styles'
import ethManager from './../../../blockchains/EthManager'
import bscManager from './../../../blockchains/BscManager'



export default function Receipt({ navigation, route }) {
  const { navigate } = navigation
  const { coin, amount, wallet, address, receipt } = route.params || {}


  const items = useMemo(
    () => [
      {
        title: 'From',
        // detail: wallet.address,
        detail: 'sdkflsjflksjflkds'
      },
      {
        title: 'To',
        detail: 'adjadldl',
      },
      {
        title: 'Receipt',
        value: `ds43jlkl435lk43lk5lk43j5j43l`,
      },
    ],
    []
  )

  const handleSend = async () => {

    // try {
    //   setIsPosting(true)
    //   const coinSelector = { ETH: ethManager, BSC: bscManager }
    //   let selectedCoin = coinSelector[coin.slug];

    //   const result = await selectedCoin.transfer(
    //     null,
    //     wallet,
    //     address,
    //     amount
    //   )

    // } catch (ex) {
    //   console.error('log', ex)
    // }
    navigation.reset({
      index: 1,
      routes: [
        { name: routes.appTab },
        { name: routes.rewards, params: { tabIndex: 1 } },
      ],
    })
  }

  return (
    <Screen style={{ ...globalStyles.gapScreen }} edges={['top', 'bottom']}>
      <ScrollView>
        <View>
          <CoinTitle
            // value={`-${amount} ${coin.slug}`}
            value={`Transaction Hash`}
            failureTitle
            amount="kjh424l23hl4h32h4lk2h3jkh4khkjlhc"
            icon={coin.title?.toLowerCase()}
          />
        </View>
        <View style={{ flex: 1, marginVertical: 18 }}>
          {items.map((item, i) => (
            <View key={i}>
              <InfoItems
                title={item.title}
                detail={item.detail}
                value={item.value}
              />
              {i + 1 === items.length ? null : <HR />}
            </View>
          ))}
        </View>
      </ScrollView>
      <AppButton
        onPress={handleSend}
        title="Done"
        bold
        typo="sm"
        customStyle={{ backgroundColor: globalStyles.Colors.primaryColor }}
      />
    </Screen>
  )
}
