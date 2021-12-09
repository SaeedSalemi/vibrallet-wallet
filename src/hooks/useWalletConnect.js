import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import ethManager from '../blockchains/EthManager'
import bscManager from '../blockchains/BscManager'
import WalletConnect from "@walletconnect/client";

// import { Context } from '../context/Provider'

const useWalletConnect = (coins) => {

  // const { coinManager } = useContext(Context);

  // const [state, setState] = useState({
  //   wallet: {},
  //   balance: 0,
  // })


  let pair = async (uri) => {

    console.log(coins);
    
    // Create connector
    const connector = new WalletConnect(
      {
        // Required
        uri: uri,
        // Required
        clientMeta: {
          description: "WalletConnect Vibranium",
          url: "https://walletconnect.org",
          icons: ["https://walletconnect.org/walletconnect-logo.png"],
          name: "WalletConnect Vibranium",
        },
      }
    );

    // Subscribe to session requests
    connector.on("session_request", (error, payload) => {
      if (error) {
        throw error;
      }

      // Handle Session Request
      console.log("session_request  ,,,", JSON.stringify(payload));

      // Approve Session
      connector.approveSession({
        accounts: [                 // required
          // '0x4292...931B3',
          // '0xa4a7...784E8',
        ],
        chainId: payload.params.chainId                 // required
      })

      /* payload:
      {
        id: 1,
        jsonrpc: '2.0'.
        method: 'session_request',
        params: [{
          peerId: '15d8b6a3-15bd-493e-9358-111e3a4e6ee4',
          peerMeta: {
            name: "WalletConnect Example",
            description: "Try out WalletConnect v1.0",
            icons: ["https://example.walletconnect.org/favicon.ico"],
            url: "https://example.walletconnect.org"
          }
        }]
      }
      */
    });

    // Subscribe to call requests
    connector.on("call_request", (error, payload) => {
      if (error) {
        throw error;
      }

      // Handle Call Request
      console.log("call_request  ,,,", JSON.stringify(payload));

      // connector.approveRequest({
      //   id: 1,
      //   result: "0x41791102999c339c844880b23950704cc43aa840f3739e365323cda4dfa89e7a"
      // });
      
      /* payload:
      {
        id: 1,
        jsonrpc: '2.0'.
        method: 'eth_sign',
        params: [
          "0xbc28ea04101f03ea7a94c1379bc3ab32e65e62d3",
          "My email is john@doe.com - 1537836206101"
        ]
      }
      */
    });

    connector.on("disconnect", (error, payload) => {
      if (error) {
        throw error;
      }

      console.log("call_request  ,,,", JSON.stringify(payload));


      // Delete connector
    });
  }
  // const wallet = useSelector(state => {
  //   state.wallets.data ? state.wallets.data[0] : null
  // }
  // )

  // useEffect(() => {

  //   if (wallet) {

  //     const coinSelector = { ETH: ethManager, BSC: bscManager }
  //     let selectedCoin = coinSelector[coinItem.slug];

  //     selectedCoin.getWalletFromMnemonic(wallet.backup)
  //       .then(wallet => {
  //         state.wallet = wallet;
  //         setState({ ...state });

  //         selectedCoin.getBalance(wallet?.address, false).then(result => {
  //           setState({ ...state, balance: result })
  //           setIsLoading(false)
  //         })
  //       })
  //       .catch(ex => console.error('balance wallet error', ex))

  //   }
  // }, [wallet])



  return {
    pair
    // wallet,
    // balance: state.balance,
  }
}

export default useWalletConnect