import AsyncStorage from '@react-native-async-storage/async-storage'
import bitcoinManager from '../blockchains/BitcoinManager'
import bscManager from '../blockchains/BscManager'
import ethManager from '../blockchains/EthManager'

export const useReduxWallet = async (coin) => {
  if (!coin)
    return {}

  const getStoredMnemonic = async () => {
    const persist = await AsyncStorage.getItem('persist:root')
    if (persist !== null) {
      let item = JSON.parse(persist)
      if (item !== null) {
        let wallets = JSON.parse(item["wallets"])
        return wallets.data ? wallets.data[0] : null
      }
    }
  }

  const mnemonic = await getStoredMnemonic()

  try {
    let balance = 0
    const coinManager = { ETH: ethManager, BNB: bscManager, BTC: bitcoinManager }
    let selectedCoin = coinManager[coin.symbol];
    const wallet = await selectedCoin.getWalletFromMnemonic(mnemonic?.backup)
    balance = await selectedCoin.getBalance(wallet.address, false)
    return balance
  } catch (err) {
    console.log('useReduxWallet', err)
  }

}