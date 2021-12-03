import { useSelector } from 'react-redux'
import bitcoinManager from '../blockchains/BitcoinManager'
import bscManager from '../blockchains/BscManager'
import ethManager from '../blockchains/EthManager'

export const useReduxWallet = (coin) => {
  if (!coin)
    return {}

  const wallet = useSelector(state => { state.wallets.data ? state.wallets.data[0] : null })
  const coinSelector = { ETH: ethManager, BNB: bscManager, BTC: bitcoinManager }

  let balance = 0
  if (wallet) {
    coinSelector[coin.symbol].getBalance(coin.address, false).then(result => {
      balance = result
    }).catch(err => {
      console.log('useReduxWallet', err)
    })
  }

  return {
    balance
  }
}

