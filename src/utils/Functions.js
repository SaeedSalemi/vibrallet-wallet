import AsyncStorage from '@react-native-async-storage/async-storage';
import { Share, Platform } from 'react-native'
const CryptoJS = require("crypto-js")


const SECRET = 'bitrasecret'
export function decrypt(text) {
  try {
    var bytes = CryptoJS.AES.decrypt(text, SECRET);
    var originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText
  } catch (e) {
    console.error(e)
  }
}

export function encrypt(text) {
  try {
    let originalText = CryptoJS.AES.encrypt(text, SECRET).toString();
    return originalText
  } catch (e) {
    console.log(e)
  }
}


export function share(title = '', msg = '', url = 'https://app.vibrallet.com') {
  try {
    Share.share(
      {
        ...Platform.select({
          ios: {
            message: title + '\n' + (msg || '') + '\n' + (url || ''),
          },
          android: {
            message: title + '\n' + (msg || '') + '\n' + (url || ''),
          },
        }),
        title: title,
        // url: url && url !== '' ? url : null, 
      },
      {
        ...Platform.select({
          ios: {
            // iOS only: 
            excludedActivityTypes: ['com.apple.UIKit.activity.PostToTwitter'],
          },
          android: {
            // Android only: 
            dialogTitle: "Share",
          },
        }),
      },
    );
  } catch (e) {
    console.error(e);
  }
}

export const setToStorage = async (item, data) => await AsyncStorage.setItem(item, data)

export const getFromStorage = async (item) => {
  const getData = await AsyncStorage.getItem(item)
  if (getData !== null)
    return getData
  else return false
}