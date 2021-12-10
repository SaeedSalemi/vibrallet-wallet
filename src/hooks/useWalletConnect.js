import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import ethManager from '../blockchains/EthManager'
import bscManager from '../blockchains/BscManager'
import WalletConnect from "@walletconnect/client";

// import { Context } from '../context/Provider'

const useWalletConnect = ({ coins }) => {
  // const { coinManager } = useContext(Context);
  const [connector, setConnector] = useState(null);

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
      let address = null;
      let chainId = payload.params[0].chainId;

      if (chainId == 1) {
        address = coins.find(p => p.symbol == "ETH")?.address;
      } else if (chainId == 56) {
        address = coins.find(p => p.symbol == "BNB")?.address;
      }

      console.log('---->selected Address', address);
      // Approve Session
      connector.approveSession({
        accounts: [                 // required
          address
        ],
        chainId: chainId                 // required
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
    connector.on("call_request", async (error, payload) => {
      if (error) {
        throw error;
      }

      // Handle Call Request
      console.log("call_request  -->", JSON.stringify(payload));

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

      let address = null;
      // let privateKey = null;

      let chainId = payload.params[0].chainId;
      let selectedNetwork = null
      let selectedCoin = null
      if (chainId == 1) {
        selectedNetwork = ethManager;
        selectedCoin = coins.find(p => p.symbol == "ETH");;
      } else if (chainId == 56) {
        selectedNetwork = bscManager;
        selectedCoin = coins.find(p => p.symbol == "BNB");
      }

      if (payload.method) {
        if (payload.method === 'eth_sendTransaction') {
          try {
            const txParams = {};
            txParams.to = payload.params[0].to;
            txParams.from = payload.params[0].from;
            txParams.value = payload.params[0].value;
            txParams.gas = payload.params[0].gas;
            txParams.gasLimit = payload.params[0].gasLimit;
            txParams.gasPrice = payload.params[0].gasPrice;
            txParams.data = payload.params[0].data;
            const hash = await selectedNetwork.sendTransaction(txParams, selectedCoin.privateKey);
            connector.approveRequest({
              id: payload.id,
              result: hash,
            });
          } catch (error) {
            connector.rejectRequest({
              id: payload.id,
              error,
            });
          }
        } else if (payload.method === 'eth_sign') {
          let rawSig = null;
          try {
            if (payload.params[2]) {
              throw new Error('Autosign is not currently supported');
              // Leaving this in case we want to enable it in the future
              // once WCIP-4 is defined: https://github.com/WalletConnect/WCIPs/issues/4
              // rawSig = await KeyringController.signPersonalMessage({
              // 	data: payload.params[1],
              // 	from: payload.params[0]
              // });
            } else {
              const data = payload.params[1];
              const from = payload.params[0];
              rawSig = await selectedNetwork.signTransaction({
                data,
                from,
                meta: {
                  title: meta && meta.name,
                  url: meta && meta.url,
                  icon: meta && meta.icons && meta.icons[0],
                },
                origin: WALLET_CONNECT_ORIGIN,
              }, selectedCoin.privateKey);
            }
            connector.approveRequest({
              id: payload.id,
              result: rawSig,
            });
          } catch (error) {
            connector.rejectRequest({
              id: payload.id,
              error,
            });
          }
        } else if (payload.method === 'personal_sign') {
          let rawSig = null;
          try {
            if (payload.params[2]) {
              throw new Error('Autosign is not currently supported');
              // Leaving this in case we want to enable it in the future
              // once WCIP-4 is defined: https://github.com/WalletConnect/WCIPs/issues/4
              // rawSig = await KeyringController.signPersonalMessage({
              // 	data: payload.params[1],
              // 	from: payload.params[0]
              // });
            } else {
              const data = payload.params[0];
              const from = payload.params[1];

              rawSig = await selectedNetwork.signTransaction({
                data,
                from,
                meta: {
                  title: meta && meta.name,
                  url: meta && meta.url,
                  icon: meta && meta.icons && meta.icons[0],
                },
                // origin: WALLET_CONNECT_ORIGIN,
              }, );
            }
            this.walletConnector.approveRequest({
              id: payload.id,
              result: rawSig,
            });
          } catch (error) {
            this.walletConnector.rejectRequest({
              id: payload.id,
              error,
            });
          }
        } else if (payload.method === 'eth_signTypedData' || payload.method === 'eth_signTypedData_v3') {
          const { TypedMessageManager } = Engine.context;
          try {
            const rawSig = await TypedMessageManager.addUnapprovedMessageAsync(
              {
                data: payload.params[1],
                from: payload.params[0],
                meta: {
                  title: meta && meta.name,
                  url: meta && meta.url,
                  icon: meta && meta.icons && meta.icons[0],
                },
                origin: WALLET_CONNECT_ORIGIN,
              },
              'V3'
            );

            this.walletConnector.approveRequest({
              id: payload.id,
              result: rawSig,
            });
          } catch (error) {
            this.walletConnector.rejectRequest({
              id: payload.id,
              error,
            });
          }
        } else if (payload.method === 'eth_signTypedData_v4') {
          const { TypedMessageManager } = Engine.context;
          try {
            const rawSig = await TypedMessageManager.addUnapprovedMessageAsync(
              {
                data: payload.params[1],
                from: payload.params[0],
                meta: {
                  title: meta && meta.name,
                  url: meta && meta.url,
                  icon: meta && meta.icons && meta.icons[0],
                },
                origin: WALLET_CONNECT_ORIGIN,
              },
              'V4'
            );

            this.walletConnector.approveRequest({
              id: payload.id,
              result: rawSig,
            });
          } catch (error) {
            this.walletConnector.rejectRequest({
              id: payload.id,
              error,
            });
          }
        }
        this.redirectIfNeeded();
      }
    });

    connector.on("disconnect", (error, payload) => {
      if (error) {
        throw error;
      }

      console.log("disconnect  ", JSON.stringify(payload));


      // Delete connector
      setConnector(null);
    });

    setConnector(connector);
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