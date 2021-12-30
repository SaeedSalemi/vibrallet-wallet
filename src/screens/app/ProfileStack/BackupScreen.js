import React, { useEffect, useState, useContext, useLayoutEffect } from 'react'
import { View, TouchableOpacity, Pressable } from 'react-native'
import { useDispatch } from 'react-redux'
import AppButton from '../../../components/common/AppButton'
import AppText from '../../../components/common/AppText'
import HR from '../../../components/common/HR/HR'
import Screen from '../../../components/Screen'
import { globalStyles } from '../../../config/styles'
import { finalCreateWallet } from '../../../redux/modules/wallets'
import WalletManager from '../../../blockchains/walletManager'
import Clipboard from '@react-native-community/clipboard'
import { showMessage } from "react-native-flash-message";
import { routes } from '../../../config/routes'
import AsyncStorage from '@react-native-async-storage/async-storage'
import HttpService from '../../../services/HttpService'
import bitcoinManager from '../../../blockchains/BitcoinManager'
import ethManager from '../../../blockchains/EthManager'
import bscManager from '../../../blockchains/BscManager'
import { Context } from '../../../context/Provider'
import QRCode from 'react-native-qrcode-svg'
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {
  GDrive,
  MimeTypes
} from "@robinbobin/react-native-google-drive-api-wrapper";
import { gettingBackup } from '../../../utils/Functions'
import { getStoredMnemonic, checkExistsWallet } from '../../../utils/WalletFunctions'

export default function WordBackup({ navigation }) {
  const { setCoinsToSupport } = useContext(Context)
  const [googleInformation, setGoogleInformation] = useState({})
  const [backupPlan, setBackupPlan] = useState()

  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()
  const { navigate } = navigation
  const [backup, setBackup] = useState('')
  const [state, setState] = useState({
    preDefinedCoinsColors: { BTC: '#F47169', BNB: '#FFCC01', ETH: '#7037C9', },
  })

  GoogleSignin.configure({
    scopes: ['https://www.googleapis.com/auth/drive.readonly'], // [Android] what API you want to access on behalf 
    webClientId: '226354431357-ep3eo9tnlau5vil2s5cph88igtca45ut.apps.googleusercontent.com', // client ID of type
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    hostedDomain: '', // specifies a hosted domain restriction
    forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
    accountName: '', // [Android] specifies an account name on the device that should be used
  });

  useLayoutEffect(() => {

    checkExistsWallet().then(wallet => {
    }).catch(err => { console.log('splash screen catch', err) })
  }, [])

  const signIn = async () => {

    try {
      const hasPlayServices = await GoogleSignin.hasPlayServices()
      if (hasPlayServices) {
        const userInfo = await GoogleSignin.signIn();
        console.log('user info', userInfo)
        this.setGoogleInformation({ userInfo });
      }
      // const gdrive = new GDrive();

      // gdrive.accessToken = (await GoogleSignin.getTokens()).accessToken;
      // console.log('GDRIVE', await gdrive.files.list());

      // const id = (await gdrive.files.newMultipartUploader()
      // 	.setData([1, 2, 3, 4, 5], MimeTypes.BINARY)
      // 	.setRequestBody({
      // 		name: "multipart_bin"
      // 	})
      // 	.execute()
      // ).id;
      // console.log('kossher ', await gdrive.files.getBinary(id));
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        alert('user cancelled the login flow');
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert('IN_PROGRESS')
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        alert('Play services is not available');
      } else {
        // some other error happened
        alert('Something went wrong');
        console.log('google went wrong!', error)
      }
    }
  };

  const backupList = backup.split(' ').map((word, i) => `${i + 1}. ${word}`)

  const handleCopy = () => {
    Clipboard.setString(backup)
    showMessage({
      message: `Backup copied to clipboard`,
      description: null,
      type: 'success',
      icon: null,
      duration: 1000,
      style: { backgroundColor: "#6BC0B1" },
      position: 'top'
    })
  }


  const handleBackup = () => {
    gettingBackup(backup)
  }


  return (
    <Screen edges={['bottom']} style={{ ...globalStyles.gapScreen }}>
      <View style={{
        ...globalStyles.flex.center,
        paddingHorizontal: 12,
        paddingVertical: 18,
      }}>
        <View style={{ backgroundColor: globalStyles.Colors.inputColor, padding: 10, borderRadius: 12, }}>
          {backup ? <QRCode
            size={150}
            value={backup}
            logoBackgroundColor="transparent"
          /> : <></>}
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <View
          style={{
            borderStyle: 'solid',
            borderRadius: 10,
            borderColor: globalStyles.Colors.inputColor,
            borderWidth: 1,
          }}
        >
          <View
            style={{
              // flex: 1,
              alignSelf: 'stretch',

              paddingHorizontal: 16,
              paddingVertical: 8,
              ...globalStyles.flex.row,
              flexWrap: 'wrap',
            }}
          >
            {backupList.map((item, i) => (
              <View style={{ width: '25%', paddingVertical: 8 }} key={i}>
                <AppText typo="tiny">{item}</AppText>
              </View>
            ))}
          </View>
          <HR />

          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            paddingHorizontal: 22,
            paddingVertical: 2
          }}>
            <TouchableOpacity
              style={{ ...globalStyles.flex.center }}
              onPress={handleCopy}
            >
              <AppText
                bold
                color="secondaryColor"
                style={{ paddingVertical: 12 }}
              >
                Copy
              </AppText>
            </TouchableOpacity>

            <View style={{ height: '100%', borderStyle: 'solid', borderColor: '#272627', borderRightWidth: 1 }} />

            <TouchableOpacity
              style={{ ...globalStyles.flex.center }}
            // onPress={handleBackup}
            >
              {/* <AppText
								bold
								color="secondaryColor"
								style={{ paddingVertical: 12 }}
							>
								Backup
							</AppText> */}
              <Pressable
                onPress={() => {
                  navigate(routes.itemPicker, {
                    items: [
                      { id: 1, title: 'Local Phone' },
                      { id: 2, title: 'Google Drive' },
                    ],
                    onSelect: (item) => {
                      setBackupPlan(item)
                    }
                  })
                }}

              // style={{
              // 	backgroundColor: globalStyles.Colors.inputColor,
              // 	borderRadius: 10,
              // 	height: 55,
              // 	alignItems: 'center',
              // 	justifyContent: 'space-between',
              // 	alignSelf: 'stretch',
              // 	flexDirection: 'row',
              // 	paddingHorizontal: 16,
              // }}
              >
                <View style={{ flexDirection: 'row' }}>
                  {/* <FontAwesome5Icon style={{ marginLeft: 4 }} size={15} color={globalStyles.Colors.text2} name="map-marker-alt" /> */}
                  <AppText bold
                    color="secondaryColor"
                    style={{ paddingVertical: 12 }}>Backup</AppText>
                </View>
                {/* <AppIcon name="arrowRightCircle" /> */}
              </Pressable>
            </TouchableOpacity>


          </View>
        </View>

        {backup && backupPlan?.id === 1 ? handleBackup() : <></>}

        {backup && backupPlan?.id === 2 ? <View style={{ ...globalStyles.flex.center }}>
          <AppText
            style={{
              textAlign: 'center',
              paddingHorizontal: 36,
              paddingVertical: 8,
            }}
            typo="tiny"
          >
            Upload your Backup on your Google Drive.
          </AppText>
          <GoogleSigninButton
            onPress={signIn}
            style={{ width: 192, height: 48 }}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
          />
        </View> : <></>}

        <View style={{ ...globalStyles.flex.center, marginVertical: 24 }}>
          <AppText
            style={{
              textAlign: 'center',
              paddingHorizontal: 36,
              paddingVertical: 8,
            }}
            typo="tiny"
          >
            Please write down 12-word Backup Phrase and keep a copy in a secure
            place so you can restore your wallet at any time.
          </AppText>
          <AppText typo="tiny" color="failure">
            Never share recovery phrase wth anyone!
          </AppText>
        </View>
      </View>
    </Screen>
  )
}
