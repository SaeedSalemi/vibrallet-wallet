import AsyncStorage from '@react-native-async-storage/async-storage'
import { persist_root } from './../config/async-storage.json'
export const getStoredMnemonic = async () => {
  const persist = await AsyncStorage.getItem(persist_root)
  if (persist !== null) {
    let item = JSON.parse(persist)
    if (item !== null) {
      let wallets = JSON.parse(item["wallets"])
      return wallets.data ? wallets.data[0] : null
    }
  }
}


export const checkExistsWallet = async () => {
  const persist = await AsyncStorage.getItem(persist_root)
  if (persist) {
    let persistObj = JSON.parse(persist)
    const wallets = JSON.parse(persistObj["wallets"])
    if (wallets.data && wallets["data"].length > 0) {
      return true
    } else {
      return false
    }
  }
}