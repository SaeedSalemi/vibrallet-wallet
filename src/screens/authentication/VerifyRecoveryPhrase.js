import React, { useState, useContext, useLayoutEffect } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import AppText from '../../components/common/AppText'
import Screen from '../../components/Screen'

import globalStyles from '../../config/styles'
const defaultStyles = globalStyles()


import { getStoredMnemonic } from './../../utils/WalletFunctions'
import AppButton from '../../components/common/AppButton'
import { Context } from '../../context/Provider'
import HttpService from '../../services/HttpService'
import bitcoinManager from '../../blockchains/BitcoinManager'
import ethManager from '../../blockchains/EthManager'
import bscManager from '../../blockchains/BscManager'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { showMessage } from "react-native-flash-message";
import { routes } from '../../config/routes'

const VerifyRecoveryPhrase = ({ route, navigation }) => {

  const { generatedMnemonic } = route.params || {}
  const { setCoinsToSupport } = useContext(Context)

  const [state, setState] = useState({
    preDefinedCoinsColors: { BTC: '#F47169', BNB: '#FFCC01', ETH: '#7037C9', },
  })

  const [mnemonic, setMnemonic] = useState([])
  const [mnemonicHolder, setMnemonicHolder] = useState([])
  const [loading, setLoading] = useState(false)


  useLayoutEffect(() => {
    if (generatedMnemonic) {
      let shuffledArray = generatedMnemonic.split(' ').sort(() => Math.random() - 0.5)
      setMnemonic(shuffledArray)
    }
    return () => {
      setMnemonic([])
    }
  }, [])


  const handleToHolder = (mnemonicItem, idx) => {

    setMnemonicHolder(state => {
      const newState = [...state, mnemonicItem]
      return newState
    })

    // Pop from the main mnemonic array 
    let leftMnemos = mnemonic.filter(item => item !== mnemonicItem)
    setMnemonic(leftMnemos)
  }


  const handlePopFromHolder = (mnemonicItem, idx) => {

    setMnemonic(state => [...state, mnemonicItem])


    let leftMnemos = mnemonicHolder.filter(item => item !== mnemonicItem)
    setMnemonicHolder(leftMnemos)

  }


  const handleGotoAppStack = () => {

    const convertGeneratedMnemonicToArr = generatedMnemonic.split(' ')
    // console.log('convertGeneratedMnemonicToArr', convertGeneratedMnemonicToArr)
    // console.log('dani holder', mnemonicHolder)

    if (mnemonicHolder.length !== 12) {
      return
    } else {
      setLoading(true)

      // validate the mnemonic phrase
      let validate = false
      let inx = 0
      for (let i = 0; i <= convertGeneratedMnemonicToArr.length; i++) {
        if (convertGeneratedMnemonicToArr[i] === mnemonicHolder[i]) {
          validate = true
        } else {
          validate = false
          inx = i
          break;
        }
      }

      // alert(` ${validate}, ${inx}`)

      if (!validate) {

        showMessage({
          message: 'Your mnemonic phrase is not valid',
          description: null,
          type: 'success',
          icon: null,
          duration: 5000,
          style: { backgroundColor: "#e74c3c" },
          position: 'top'
        })
        setLoading(false)
        return;
      }

      supportedCoins(xhr_response => {
        showMessage({
          message: 'Your wallet has been created successfully',
          description: null,
          type: 'success',
          icon: null,
          duration: 2000,
          style: { backgroundColor: "#16a085" },
          position: 'top'
        })
        setLoading(false)
        navigation.replace(routes.appTab)
      })
    }
  }



  const supportedCoins = (xhr_response) => {

    try {
      new HttpService("", {
        "uniqueId": "abc1",
        "action": "supportedCoins",
      }).Post(async (response) => {

        try {
          if (response) {
            console.log('supportedCoins WORD BACKYUp----> ', backup, response);
            // if (wallet) {
            const items = response
            for (let item of items) {
              item.balance = 0
              item.color = state.preDefinedCoinsColors[item.symbol]
              item.hide = false
              item.fav = false
              if (item.symbol === 'BTC') {
                const coininfo = await bitcoinManager.getWalletFromMnemonic(backup)
                item.publicKey = coininfo.publicKey
                item.privateKey = coininfo.privateKey
                item.address = coininfo.address
                // item.balance = await bitcoinManager.getBalance(item.address)
              }
              if (item.symbol.toUpperCase() === 'ETH') {
                const coininfo = await ethManager.getWalletFromMnemonic(backup)
                item.publicKey = coininfo.publicKey
                item.privateKey = coininfo.privateKey
                item.address = coininfo.address
                // item.balance = await ethManager.getBalance(item.address)
              }
              if (item.symbol.toUpperCase() === 'BNB') {
                const coininfo = await bscManager.getWalletFromMnemonic(backup)
                item.publicKey = coininfo.publicKey
                item.privateKey = coininfo.privateKey
                item.address = coininfo.address
                // item.balance = await bscManager.getBalance(item.address)
              }
            }
            setCoinsToSupport(items)
            AsyncStorage.setItem("supportedCoins", JSON.stringify(items)).then().catch()
            xhr_response(items)
          }
        } catch (error) {
          console.log('debug error', error)
        }
      })


    } catch (err) {
      console.log(err)
    }

  }







  return (
    <Screen style={defaultStyles.screen} gap>
      <View style={styles.topTexts}>
        <AppText bold typo="xl">Verify Recovery Phrase</AppText>
        <AppText style={styles.topTextSub} typo="sm">
          Tab the words to put them next to each other in correct order.
        </AppText>

      </View>
      <View style={styles.resendContainer}>


        <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', marginVertical: 12 }}>
          {mnemonicHolder.length > 0 &&

            mnemonicHolder.map((word, idx) => {
              return <TouchableOpacity
                key={word + '' + idx} style={{ margin: 6, paddingHorizontal: 6, paddingVertical: 8, borderRadius: 6, borderColor: 'white', borderWidth: .5 }}
                onPress={() => handlePopFromHolder(word, idx)}
              >
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                  <AppText color="text3">{idx + 1} </AppText>
                  <AppText>{word}</AppText>
                </View>
              </TouchableOpacity>
            })

          }
        </View>



        <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', marginVertical: 12 }}>
          {mnemonic.length > 0 &&

            mnemonic.map((word, idx) => {
              return <TouchableOpacity
                key={word} style={{ margin: 6, paddingHorizontal: 6, paddingVertical: 8, borderRadius: 6, borderColor: 'white', borderWidth: .5 }}
                onPress={() => handleToHolder(word, idx)}
              >
                <AppText>{word}</AppText>
              </TouchableOpacity>
            })

          }
        </View>

      </View>

      <View style={styles.continueButton}>
        <AppButton
          loading={loading}
          title="Continue"
          typo="sm"
          onPress={handleGotoAppStack}
        />
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  topTexts: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 50,
    paddingTop: 20,
  },
  continueButton: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 20,
    width: '100%',
  },
  topTextSub: {
    color: defaultStyles.Colors.darkTextColor,
    paddingTop: 4,
    marginVertical: 12,
    alignSelf: 'center',
    textAlign: 'center'
  },
  formGroup: {
    flex: 3,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  squareInput: {
    width: '20%',
    marginHorizontal: 5,
  },
  squareInputNumber: {
    color: defaultStyles.Colors.whiteColor,
    fontSize: 20,
    textAlign: 'center',
  },
  resendContainer: {
    flex: 5,
    padding: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
})


export default VerifyRecoveryPhrase