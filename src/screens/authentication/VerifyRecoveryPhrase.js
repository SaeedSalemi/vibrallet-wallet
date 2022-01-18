import React, { useState, useEffect, useLayoutEffect } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import AppText from '../../components/common/AppText'
import Screen from '../../components/Screen'

import globalStyles from '../../config/styles'
const defaultStyles = globalStyles()


import { getStoredMnemonic } from './../../utils/WalletFunctions'
import AppButton from '../../components/common/AppButton'

const VerifyRecoveryPhrase = ({ navigation }) => {
  const [mnemonic, setMnemonic] = useState([])

  const [mnemonicHolder, setMnemonicHolder] = useState([])

  useLayoutEffect(() => {
    getStoredMnemonic().then(mnemonic => {
      if (mnemonic.backup) {
        let shuffledArray = mnemonic.backup.split(' ').sort(() => Math.random() - 0.5)
        setMnemonic(shuffledArray)
      }
    }).catch(err => {

    })
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