import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import ethManager from '../blockchains/EthManager'
import bscManager from '../blockchains/BscManager'

const useWallet = ({ coinItem }) => {

  const [state, setState] = useState({
    wallet: {},
    balance: 0,
  })


  const wallet = useSelector(state => {
    state.wallets.data ? state.wallets.data[0] : null
  }
  )

  useEffect(() => {

    if (wallet) {

      const coinSelector = { ETH: ethManager, BSC: bscManager }
      let selectedCoin = coinSelector[coinItem.slug];

      selectedCoin.getWalletFromMnemonic(wallet.backup)
        .then(wallet => {
          state.wallet = wallet;
          setState({ ...state });

          selectedCoin.getBalance(wallet?.address, false).then(result => {
            setState({ ...state, balance: result })
            setIsLoading(false)
          })
        })
        .catch(ex => console.error('balance wallet error', ex))

    }
  }, [wallet])

  return {
    wallet,
    balance: state.balance,
  }
}

export default useWallet