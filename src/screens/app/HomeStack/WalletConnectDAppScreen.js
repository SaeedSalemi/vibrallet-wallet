import React, { useState, useContext, useEffect, useLayoutEffect } from 'react'
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native'
import { showMessage } from 'react-native-flash-message'

import { Context } from '../../../context/Provider'

import Screen from './../../../components/Screen'
import AppText from './../../../components/common/AppText'
import { routes } from '../../../config/routes'
import AppButton from './../../../components/common/AppButton'
import { globalStyles } from '../../../config/styles'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AsyncStorage from '@react-native-async-storage/async-storage'



const WalletConnectDAppScreen = ({ route, navigation }) => {

  const { pairData } = route.params || {}

  const [modalStatus, setModalStatus] = useState('reject')
  const [state, setState] = useState()
  const { walletConnect, sessionRequestPair } = useContext(Context)
  const [showModal, setShowModal] = useState(true)

  useEffect(() => {

    if (showModal)
      navigation.navigate(routes.itemPicker, {
        items: [
          { id: "approve", title: "Approve" },
          { id: "reject", title: "Reject" },
        ],
        onSelect: (item) => {
          if (item.id === "approve") {
            setModalStatus('approve')
            // check the route params is exists
            if (pairData) {
              console.log('pair data params is', pairData)

              walletConnect(pairData).then(() => {

                console.log('get session request form the socket', sessionRequestPair)
                // TODO: check if the session request obj is exists
                if (sessionRequestPair) {
                  setState(sessionRequestPair)

                  console.log('dbg session request', sessionRequestPair)
                  console.log('dbg state session request', state);
                }

              }).catch(err => {
                console.log('err in the wallet connect', err)
              })
            }
          }
          else {
            showMessage({
              message: `You rejected connecting to wallet connect.`,
              description: null,
              type: 'danger',
              icon: null,
              duration: 2000,
              style: { backgroundColor: "#e74c3c" },
              position: 'top'
            })
            setModalStatus('reject')
            setShowModal(false)
            navigation.pop()
          }
        }
      })
  }, [])

  const handleWalletConnect = () => {

    // navigation.navigate(routes.newWallet)
  }

  return (
    <Screen style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.flex}>
        <View style={styles.topTexts}>


        </View>
        <View style={styles.formGroup}>
          <View style={{ flexDirection: 'column' }}>
            <View style={{ flexDirection: 'row' }}>
              <FontAwesome5Icon style={{ marginHorizontal: 8 }}
                size={15} color={globalStyles.Colors.darkTextColor} name="wallet" />
              <AppText typo="tiny" style={{ color: globalStyles.Colors.darkTextColor }}>
                View your wallet balance and activity
              </AppText>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <MaterialIcons
                name="verified-user"
                size={15}
                color={globalStyles.Colors.darkTextColor}
                style={{ marginHorizontal: 8 }}
              />
              <AppText typo="tiny" style={{ color: globalStyles.Colors.darkTextColor }}>
                Request approval for transactions
              </AppText>
            </View>
          </View>
        </View>
      </View>
      <View>
        <View style={styles.continueButton}>
          <AppButton
            title="Connect"
            typo="sm"
            onPress={handleWalletConnect}
          />
        </View>
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalStyles.Colors.bckColor,
  },
  flex: {
    flex: 1,
  },
  topTexts: {
    flex: 1,
    // justifyContent: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 50,
    paddingTop: 20,
  },
  topTextSub: {
    color: globalStyles.Colors.darkTextColor,
    paddingTop: 4,
  },
  formGroup: {
    flex: 3,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  label: {
    marginLeft: 5,
    color: globalStyles.Colors.lightGrayColor,
  },
  continueButton: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 20,
    width: '100%',
  },
  backToPhone: {
    marginTop: 10,
    marginBottom: 2,
    color: globalStyles.Colors.primaryColor,
    textAlign: 'center',
    alignSelf: 'center',
  },
  terms: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  termsText: {
    color: globalStyles.Colors.darkTextColor,
    textAlign: 'center',
  },
  back: {
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: globalStyles.Colors.primaryColor,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    width: 144,
    alignSelf: 'center',
  },


  continueButton: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    width: '100%',

  },
  terms: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,

  },
  termsText: {
    color: globalStyles.Colors.darkTextColor,
    textAlign: 'center',
  },

})

export default WalletConnectDAppScreen
