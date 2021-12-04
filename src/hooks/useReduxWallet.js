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

  const getBalanceFromMnemonic = async (coin) => {
    const coinSelector = { ETH: ethManager, BNB: bscManager, BTC: bitcoinManager }
    const balance = await coinSelector[coin.symbol].getBalance(coin.address, false)
    console.log('getBalanceFromMnemonic debug', coin.symbol, `Balance is  ${balance}`)
    return balance
  }

  const mnemonic = await getStoredMnemonic()

  if (mnemonic) {
    const balance = await getBalanceFromMnemonic(coin)
    console.log('real balance', balance)
    return {
      balance
    }
  } else
    return {}

}

