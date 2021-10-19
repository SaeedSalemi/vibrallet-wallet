// Import
// import { ApiPromise, WsProvider } from '@polkadot/api';

const { ApiPromise, WsProvider, HttpProvider } = require('@polkadot/api');
const { Keyring } = require('@polkadot/keyring');
const { mnemonicGenerate } = require('@polkadot/util-crypto');

// const {Keypair} = require('@polkadot/util-crypto/types');
// const wsProvider = new WsProvider('wss://polkadot-westend--ws.datahub.figment.io/apikey/b4b7018adafd2d3e1de13270d0f5fc03');
const wsProvider = new HttpProvider("https://polkadot-westend--rpc.datahub.figment.io/apikey/b4b7018adafd2d3e1de13270d0f5fc03");
// const wsProvider = new WsProvider('wss://rpc.polkadot.io');


class DotManager {

    // Construct
    constructor() {
        this.api = null;
        this.init();
    }

    async init() {
        if (!this.api || this.api == null)
            this.api = await ApiPromise.create({ provider: wsProvider });
    }

    // https://polkadot.js.org/docs/keyring/start/sign-verify


    async balance(address) {
        // const balance = await tronWeb.trx.getBalance(address);
        // return balance;

        let account = await this.api.query.system.account("EGVQCe73TpFyAZx5uKfE1222XfkT3BSKozjgcqzLBnc5eYo");
        let balance = account.data.free.toHuman();
        return balance;
    }

    /**
     * Transfer
     * @param {Object} wallet format is { publicKey, privateKey }
     * @param {Float} amount 
     * @param {BigInt} toAddress 
     */
    async transfer(wallet, amount, toAddress) {

        /// https://wiki.polkadot.network/docs/learn-DOT
        //TODO: check if need to convert
        amount = amount * 1e10;

        // this.api = await ApiPromise.create({ provider: wsProvider });
        console.log(' -----------> POLKADOT is OK now!!!!  <---------- ')
        let keyring = new Keyring();

        let keypair = {
            publicKey: wallet.publicKey,
            secretKey: wallet.privateKey
        }

        // let keyringPair = keyring.createFromPair(keypair, {}, 'ecdsa' );
        let keyringPair = keyring.addFromMnemonic(wallet.mnemonic);

        // console.log(keyringPair.address);
        // console.log(keyring.encodeAddress(keyringPair.address, 0));

        // const alice = keyring.addFromUri('//Alice');

        // Create a extrinsic, transferring 12345 units to Bob
        const transfer = this.api.tx.balances.transfer(toAddress, amount);
        console.log(' -----------> POLKADOT transfer 1  <---------- ')

        const hash = await transfer.signAndSend(keyringPair);

        console.log(' -----------> POLKADOT transfer 2 <---------- ')

        console.log('Transfer sent with hash', hash.toHex());

        // // generate a mnemonic with default params (we can pass the number
        // // of words required 12, 15, 18, 21 or 24, less than 12 words, while
        // // valid, is not supported since it is more-easily crackable)
        // const mnemonic = WalletManager.mnemonic_testporpose;  //mnemonicGenerate();
        // console.log(mnemonic);

        // // create & add the pair to the keyring with the type and some additional
        // // metadata specified
        // const pair = keyring.addFromUri(mnemonic, { name: 'first pair' }, 'ed25519');

        // // the pair has been added to our keyring
        // console.log(keyring.pairs.length, 'pairs available');

        // // log the name & address (the latter encoded with the ss58Format)
        // console.log(pair.meta.name, 'has address', pair.address);

        // const hash = await api.tx.balances
        //         .transfer(to, amount)
        //         .signAndSend(from, { tip, nonce: -1 })
        //         .catch(e => {
        //             throw e;
        //         });

        //     return hash.toHex();

        return hash.toHex();
    }


    // async transfer(amount) {
    //     // Instantiate the API
    //     // const api = await ApiPromise.create();
    //     const BOB = '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty';

    //     // Constuct the keyring after the API (crypto has an async init)
    //     const keyring = new Keyring({ type: 'sr25519' });

    //     // Add Alice to our keyring with a hard-deived path (empty phrase, so uses dev)
    //     const alice = keyring.addFromUri('//Alice');

    //     // Create a extrinsic, transferring 12345 units to Bob
    //     const transfer = api.tx.balances.transfer(BOB, amount);

    //     // Sign and send the transaction using our account
    //     const hash = await transfer.signAndSend(alice);

    //     console.log('Transfer sent with hash', hash.toHex());
    // }


}

// // Import the API, Keyring and some utility functions
// const { ApiPromise } = require('@polkadot/api');
// const { Keyring } = require('@polkadot/keyring');

// const BOB = '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty';

// async function main () {
//   // Instantiate the API
//   const api = await ApiPromise.create();

//   // Constuct the keyring after the API (crypto has an async init)
//   const keyring = new Keyring({ type: 'sr25519' });

//   // Add Alice to our keyring with a hard-deived path (empty phrase, so uses dev)
//   const alice = keyring.addFromUri('//Alice');

//   // Create a extrinsic, transferring 12345 units to Bob
//   const transfer = api.tx.balances.transfer(BOB, 12345);

//   // Sign and send the transaction using our account
//   const hash = await transfer.signAndSend(alice);

//   console.log('Transfer sent with hash', hash.toHex());
// }

// main().catch(console.error).finally(() => process.exit());

// new DotManager().get1().then(()=>{
//     console.log('done!');
// }).catch(console.log);

var dotManager = new DotManager();
export default dotManager;