var bip39 = require('bip39');
var hdkey = require('hdkey');
var createHash = require('crypto').createHash;
// var createHash = require('create-hash');
var bs58check = require('bs58check');
// const axios = require("axios");

const mnemonic_testporpose = "source purpose antenna demise desert outdoor panel blush actor master transfer initial";

/// https://github.com/satoshilabs/slips/blob/master/slip-0044.md
const NetworkCoinTypes = {
    "BTC": 0,
    "Testnet": 1, //all network
    "LTC": 2,
    "ETH": 60,
    "BNB": 714, //Binance
    "EOS": 194,
    "TRX": 195, //Tron
    "ADA": 1815, //Cardano
    "DOT": 354, //Polkadot

}

class WalletManager {

    get mnemonic_testporpose() {
        return mnemonic_testporpose;
    }

    generateMnemonic() {
        const mnemonic = bip39.generateMnemonic(); //generates string
        return mnemonic;
    }

    async getWalletFromMnemonic(mnemonic, derivationPath) {
        const seed = await bip39.mnemonicToSeed(mnemonic, derivationPath); //creates seed buffer
        return this.getWallet(seed, derivationPath);
    }

    /**
     * 
     * @param {*} seed 
     * @param {*} derivationPath 
     * @returns 
     */
    getWallet(seed, derivationPath) {
        // const seed = await bip39.mnemonicToSeed(mnemonic); //creates seed buffer
        // console.log('Seed: ' + seed);

        const root = hdkey.fromMasterSeed(seed);
        const masterPrivateKey = root.privateKey.toString('hex');
        // console.log('masterPrivateKey: ' + masterPrivateKey);

        // const addrnode = root.derive("m/44'/1'/0'/0/0");
        const addrnode = root.derive(derivationPath);

        return {
            masterPrivateKey: masterPrivateKey,
            // WIF: bitcore.PrivateKey(addrnode.privateKey.toString("hex"), bitcore.Networks.testnet).toWIF(),
            publicKey: addrnode.publicKey.toString("hex"),
            privateKey: addrnode.privateKey.toString("hex"),
        }
    }


    async getBtcAddressFromMnemonic(mnemonic) {

        // let path = `m/44'/${NetworkCoinTypes.Testnet}'/0'/0/0`;
        // let path = `m/44'/${NetworkCoinTypes.BTC}'/0'/0/0`;
        let path = `m/84'/${NetworkCoinTypes.BTC}'/0'/0/0`;

        let wallet = await this.getWalletFromMnemonic(mnemonic, path);

        // //const mnemonic = bip39.generateMnemonic(); //generates string
        // const seed = await bip39.mnemonicToSeed(mnemonic); //creates seed buffer
        // // console.log('Seed: ' + seed);
        // // console.log('mnemonic: ' + mnemonic);

        // const root = hdkey.fromMasterSeed(seed);
        // const masterPrivateKey = root.privateKey.toString('hex');
        // console.log('masterPrivateKey: ' + masterPrivateKey);

        // const addrnode = root.derive("m/44'/1'/0'/0/0");
        // const addrnode = root.derive("m/84'/1'/0'/0/1");
        // console.log('addrnodePublicKey: ' + addrnode._publicKey, addrnode.privateKey)

        // const step1 = addrnode._publicKey;
        const step1 = wallet.publicKey;
        const step2 = createHash('sha256').update(step1).digest();
        const step3 = createHash('rmd160').update(step2).digest();

        var step4 = Buffer.allocUnsafe(21);
        
         /*
            Mainnet
            pubKeyHash: 0x00, 
            Testnet
            pubKeyHash: 0x6f,
        */
        let networkIdValue = 0x6f; //Testnet pubKeyHash

        step4.writeUInt8(networkIdValue, 0);
        step3.copy(step4, 1); //step4 now holds the extended RIPMD-160 result
        const step9 = bs58check.encode(step4);
        // console.log('Base58Check: ' + step9);
       

        return {
            // masterPrivateKey: masterPrivateKey,
            // WIF: bitcore.PrivateKey(addrnode.privateKey.toString("hex"), bitcore.Networks.testnet).toWIF(),
            publicKey: wallet.publicKey.toString("hex"),
            privateKey: wallet.privateKey.toString("hex"),

            // privateExtendedKey: wallet.privateExtendedKey,
            // publicExtendedKey: wallet.publicExtendedKey,

            address: step9,
            // base58: step9
        }




        // const tronWeb = new TronWeb({
        //     fullHost: 'https://api.shasta.trongrid.io/',
        //     // headers: { "TRON-PRO-API-KEY": 'your api key' },
        //     // privateKey: addrnode.privateKey.toString("hex")
        // });

        // const ownerAddress = tronWeb.address.fromPrivateKey(wallet.privateKey);

        return wallet;
        // return Object.assign(wallet, {
        //     address: ownerAddress
        // });
    }

    async getDotAddressFromMnemonic(mnemonic) {

        // let path = `m/44'/${NetworkCoinTypes.Testnet}'/0'/0/0`;
        let path = `m/44'/${NetworkCoinTypes.DOT}'/0'/0/0`;

        let wallet = await this.getWalletFromMnemonic(mnemonic, path);
        // const tronWeb = new TronWeb({
        //     fullHost: 'https://api.shasta.trongrid.io/',
        //     // headers: { "TRON-PRO-API-KEY": 'your api key' },
        //     // privateKey: addrnode.privateKey.toString("hex")
        // });

        // const ownerAddress = tronWeb.address.fromPrivateKey(wallet.privateKey);

        return wallet;
        // return Object.assign(wallet, {
        //     address: ownerAddress
        // });
    }

    async getTronAddressFromMnemonic(mnemonic) {

        let path = `m/44'/${NetworkCoinTypes.Testnet}'/0'/0/0`;
        // let path = `m/44'/${NetworkCoinTypes.TRX}'/1'/0/0`;

        let wallet = await this.getWalletFromMnemonic(mnemonic, path);
        // const tronWeb = new TronWeb({
        //     fullHost: 'https://api.shasta.trongrid.io/',
        //     // headers: { "TRON-PRO-API-KEY": 'your api key' },
        //     // privateKey: addrnode.privateKey.toString("hex")
        // });

        // const ownerAddress = tronWeb.address.fromPrivateKey(wallet.privateKey);
        return wallet;
        // return Object.assign(wallet, {
        //     address: ownerAddress
        // });
    }



    async getEtherAddressFromMnemonic(mnemonic, index) {

        index = index || 0;
        // let path = `m/44'/${NetworkCoinTypes.Testnet}'/0'/0/0`;
        let path = `m/44'/${NetworkCoinTypes.ETH}'/0'/0/${index}`;

        let wallet = await this.getWalletFromMnemonic(mnemonic, path);
        // const tronWeb = new TronWeb({
        //     fullHost: 'https://api.shasta.trongrid.io/',
        //     // headers: { "TRON-PRO-API-KEY": 'your api key' },
        //     // privateKey: addrnode.privateKey.toString("hex")
        // });

        // const ownerAddress = tronWeb.address.fromPrivateKey(wallet.privateKey);
        return wallet;
        // return Object.assign(wallet, {
        //     address: ownerAddress
        // });
    }

    async getBscAddressFromMnemonic(mnemonic, index) {

        index = index || 0;
        // let path = `m/44'/${NetworkCoinTypes.Testnet}'/0'/0/0`;
        let path = `m/44'/${NetworkCoinTypes.BNB}'/0'/0/${index}`;

        let wallet = await this.getWalletFromMnemonic(mnemonic, path);
        // const tronWeb = new TronWeb({
        //     fullHost: 'https://api.shasta.trongrid.io/',
        //     // headers: { "TRON-PRO-API-KEY": 'your api key' },
        //     // privateKey: addrnode.privateKey.toString("hex")
        // });

        // const ownerAddress = tronWeb.address.fromPrivateKey(wallet.privateKey);
        return wallet;
        // return Object.assign(wallet, {
        //     address: ownerAddress
        // });
    }

    async getBasicAddressFromMnemonic(mnemonic, index) {

        index = index || 0;
        // let path = `m/44'/${NetworkCoinTypes.Testnet}'/0'/0/0`;
        let path = `m/44'/${NetworkCoinTypes.ETH}'/0'/0/${index}`;

        let wallet = await this.getWalletFromMnemonic(mnemonic, path);
        // const tronWeb = new TronWeb({
        //     fullHost: 'https://api.shasta.trongrid.io/',
        //     // headers: { "TRON-PRO-API-KEY": 'your api key' },
        //     // privateKey: addrnode.privateKey.toString("hex")
        // });

        // const ownerAddress = tronWeb.address.fromPrivateKey(wallet.privateKey);
        return wallet;
        // return Object.assign(wallet, {
        //     address: ownerAddress
        // });
    }

}

let walletManager = new WalletManager();
export default walletManager;