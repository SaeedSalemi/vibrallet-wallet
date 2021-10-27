/**
 * 
 * 
 * 
 * https://medium.com/pixelpoint/track-blockchain-transactions-like-a-boss-with-web3-js-c149045ca9bf
 */


// const Tx = require('ethereumjs-tx').Transaction
//  var ethUtils = require('ethereumjs-util');
// const Common = require('ethereumjs-common').default;
const Web3 = require('web3');
import assert from 'minimalistic-assert';
import WalletManager from '../blockchains/walletManager'

// let networkUrl = `https://bsc-dataseed.binance.org/`;
let networkUrl = `https://data-seed-prebsc-1-s1.binance.org:8545`;  //BSC 
const BEP20_ABI = require('./ABIs/BEP20.json');

// const common = Common.forCustomChain('mainnet', {
//     name: 'bnb',
//     networkId: 56,
//     chainId: 56
// }, 'petersburg');

// const common = Common.forCustomChain('mainnet', {
//     name: 'bnb',
//     networkId: 97, //BSC TESTNET
//     chainId: 97  //BSC TESTNET
// },  'petersburg');

const common =
{
    baseChain: 'mainnet',
    hardfork: 'petersburg',
    customChain: {
        name: 'bnb',
        chainId: 97, //BSC TESTNET
        networkId: 97, //BSC TESTNET
    }
}

class BscManager {
    constructor() {
        // const wssProvider = new Web3.providers.WebsocketProvider(blockChainWebSocketUrl);
        // this.web3 = new Web3(wssProvider);
        this.web3 = new Web3(networkUrl);
        this.defaultDecimals = 18;
        // this.common = common;
    }

    /**
    * get latest block number
    * @returns {int}
    */
    async getLastBlockNumber() {
        return await this.web3.eth.getBlockNumber();
    }

    async getWalletFromMnemonic(mnemonic) {
        let wallet = await WalletManager.getBscAddressFromMnemonic(mnemonic);
        console.log(mnemonic);
        let account = await this.web3.eth.accounts.privateKeyToAccount(wallet.privateKey);
        wallet.address = account.address;
        console.log(wallet);
        return wallet;
    }

    async getWalletFromPrivateKey(privateKey) {
        let address = await this.web3.eth.accounts.privateKeyToAccount(privateKey);
        let wallet = {
            privateKey: privateKey,
            address: address
        }

        return wallet;
    }




    // /**
    //  * Get transaction info دریافت اطلاعات تراکنش 
    //  * @param {*} hash 
    //  * @returns 
    //  */
    // async getTransaction(hash) {
    //     var result = await this.web3.eth.getTransactionReceipt(hash);
    //     console.log(' BSC Transaction result: ', result);
    //     if (result == null) throw this.Errors.Transaction_Not_Exists

    //     if (!Array.isArray(result.logs) || result.logs.length == 0)
    //         throw this.Errors.Transaction_BSC_Fail

    //     let transferData = result.logs[result.logs.length - 1];

    //     let amountHex = parseInt(transferData.data.substring(2), 16);
    //     let amount = amountHex / 1e9; // 1000000000;
    //     let contract_address = transferData.address;
    //     let from = transferData.topics[1].replace('000000000000000000000000', '').toLowerCase();
    //     let to = transferData.topics[2].replace('000000000000000000000000', '').toLowerCase();

    //     if (contract_address.toLowerCase() != crypto.PRXToken.contractAddress.toLowerCase())
    //         throw this.Errors.Wallet_Company_PRX_BEP20_Access_Is_Denided

    //     // if (to != crypto.prx_wallet_address.toLowerCase())
    //     //     throw this.Errors.Wallet_Company_PRX_BEP20_Access_Is_Denided

    //     return {
    //         from,
    //         to,
    //         amount: parseFloat(parseFloat(amount).toFixed(2)),
    //         data: result
    //     }
    // }

    async getTransaction(hash) {
        let result = await this.web3.eth.getTransaction(hash);
        return result;
    }

    async getTransactionDetail(hash) {
        let result = await this.web3.eth.getTransactionReceipt(hash);
        return result;
    }

    async getTimestampFromBlock(blockNumber) {
        let result = await this.web3.eth.getBlock(blockNumber);
        return result.timestamp;
    }

    /**
     * Get Address kind (token/address)
     * @param {*} address 
     * @returns {string} "token " | "address"
     */
    async getAddressKind(address) {
        var code = await this.web3.eth.getCode(address)
        if (code === '0x')
            return 'address'; //console.log('Not an ERC20 token address')
        else
            return 'token'; //console.log('ERC20 token detected')
    }

    /**
     * Generate Wallet تولید ولت
     * @returns {publicKey, privateKey}
     */
    async generateWallet() {
        // return { publicKey: '0xC0B48566a571f6BFEdec473De804887BCFc3836F', privateKey: '0x457e7ecb720f6c2366c2b686719e97ba5441d96e934ffe14821aba0d3cffcfab' }

        let result = await this.web3.eth.accounts.create();
        return {
            publicKey: result.address,
            privateKey: result.privateKey
        }
    }


    async getBalanceByPrivateKey(privateKey) {
        let account = await this.web3.eth.accounts.privateKeyToAccount(privateKey);
        let balance = await this.getBalance(account.address);
        return {
            publicKey: account.address,
            privateKey: account.privateKey,
            balance
        }
    }

    /**
     * Get BNB balance 
     * @param {*} address 
     * @returns 
     */
    async getBalance(address, rawValue) {
        let result = await this.web3.eth.getBalance(address);
        if (rawValue === true)
            return result;
        let amount = result / 1e18;
        return amount;
    }

    /**
     * گرفتن تعداد تراکنش مربوط به یک آدرس ولت
     * @param {*} address is wallet address 
     * @returns {Number}
     */
    async getTransactionCount(address) {
        // const nonce = await web3.eth.getTransactionCount(myAddress, 'latest');
        let result = await this.web3.eth.getTransactionCount(address);
        return result;
    }

    convertAmount(amount, decimals) {
        return amount * (10 ** decimals)
    }

    /**
     * انتقال توکن 
     * @param {Object} wallet format is { publicKey, privateKey , address }
     * @param {*} toAddress 
     * @param {BigInt} amount 
     * @returns 
     */
    async transferCoin(wallet, toAddress, amount) {

        assert(amount > 0, 'amount must be greater than 0');
        assert(this.web3.utils.isAddress(toAddress), 'toAddress is not valid!');
        assert(wallet.privateKey, 'wallet.privateKey not defined!');
        assert(wallet.publicKey, 'wallet.publicKey not defined!');
        assert(wallet.address, 'wallet.address not defined!');

        amount = this.convertAmount(amount, this.defaultDecimals);

        let nonce = await this.web3.eth.getTransactionCount(wallet.address);
        // let tokenContract = new this.web3.eth.Contract(crypto.StandardBep20TokenABI, 'BNB');

        // let amountBigInt = BigInt(Math.trunc(amount * 1e18));
        // var transferAmount = amount.toString();

        // let gasPrice = '5000000000';
        console.log('estimateGas ...');

        let estimateGas = '21000';
        // let estimateGas = await this.web3.eth.estimateGas({
        //     "from": wallet.address,
        //     "nonce": this.web3.utils.toHex(nonce),
        //     // "gasPrice": this.web3.utils.toHex(gasPrice),
        // });
        console.log('estimateGas for coin --->', estimateGas);

        var rawTransaction = {
            "from": wallet.address,
            "to": toAddress,
            "nonce": this.web3.utils.toHex(nonce),
            "gas": this.web3.utils.toHex(estimateGas),
            // "gasLimit": this.web3.utils.toHex(estimateGas),
            // "gasPrice": this.web3.utils.toHex(gasPrice),
            "value": this.web3.utils.toHex(amount),
            // "common": common
        };

        console.log(rawTransaction);

        var txHash = null;
        try {
            let signedTx = await this.web3.eth.accounts.signTransaction(rawTransaction, wallet.privateKey);
            txHash = this.web3.utils.sha3(signedTx.raw || signedTx.rawTransaction);

            console.log('sendSignedTransaction ...', signedTx);

            this.web3.eth.sendSignedTransaction(signedTx.raw || signedTx.rawTransaction).then(receipt => {
                console.log(`Receipt info:  ${JSON.stringify(receipt, null, '\t')}`);
            });

        } catch (ex) {
            console.log(' APP EXCEPTION: during send transaction', ex);
            throw ex;
        }
        return txHash;
    }


    /**
     * انتقال توکن 
     * @param {Object} wallet format is { publicKey, privateKey , address }
     * @param {*} toAddress 
     * @param {BigInt} amount 
     * @returns 
     */
    async transfer(tokenContractAddress, wallet, toAddress, amount) {
        console.log(' transfer params: ', tokenContractAddress, wallet, toAddress, amount);
        assert(amount > 0, 'amount must be greater than 0');
        assert(this.web3.utils.isAddress(toAddress), 'toAddress is not valid!');
        assert(wallet.privateKey, 'wallet.privateKey not defined!');
        assert(wallet.publicKey, 'wallet.publicKey not defined!');
        assert(wallet.address, 'wallet.address not defined!');

        if (!tokenContractAddress || tokenContractAddress == null || tokenContractAddress.toLowerCase() == 'bnb') {
            return this.transferCoin(wallet, toAddress, amount)
        }
        amount = this.convertAmount(amount, this.defaultDecimals);
        // publicKey = this.web3.eth.accounts.privateKeyToAccount(privateKey);

        let tokenContract = new this.web3.eth.Contract(BEP20_ABI, tokenContractAddress);

        let nonce = await this.web3.eth.getTransactionCount(wallet.address);


        // let amountBigInt = BigInt(Math.trunc(amount * 1e18));

        // let gasPrice = '5000000000';
        let methodData = tokenContract.methods.transfer(toAddress, amount);

        let estimateGas = await methodData.estimateGas({
            "from": fromAddress,
            // "gasPrice": this.web3.utils.toHex(gasPrice),
        });

        console.log('estimateGas for token --->', estimateGas);
        var rawTransaction = {
            "from": wallet.address,
            "to": tokenContractAddress,
            "nonce": this.web3.utils.toHex(nonce),
            "gasLimit": this.web3.utils.toHex(estimateGas),
            // "gasPrice": this.web3.utils.toHex(gasPrice),
            "value": "0x0",
            "data": methodData.encodeABI(),
            // "chainId": 56
        };

        let signedTx = await this.web3.eth.accounts.signTransaction(rawTransaction, wallet.privateKey);

        let txHash = this.web3.utils.sha3(signedTx.raw || signedTx.rawTransaction);

        console.log('sendSignedTransaction ...', signedTx);

        this.web3.eth.sendSignedTransaction(signedTx.raw || signedTx.rawTransaction).then(receipt => {
            console.log(`Receipt info:  ${JSON.stringify(receipt, null, '\t')}`);
        }).catch(error => console.log);

        // var privKey = new Buffer.from(fromAddressPrivateKey, 'hex');

        // var tx = new Tx(rawTransaction, { common: common });
        // tx.sign(privKey);
        // var serializedTx = tx.serialize();

        // // this.web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
        // //     .then(receipt => {
        // //         console.log(`Receipt info:  ${JSON.stringify(receipt, null, '\t')}`);
        // //         return receipt;
        // //     })
        // //     .catch(err => console.log(err));

        // var receipt = await this.web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'));
        // console.log(`Receipt info:  ${JSON.stringify(receipt, null, '\t')}`);
        return txHash;
    }


    /**
     * انتقال توکن PRX
     * @param {*} fromAddressPublicKey 
     * @param {*} fromAddressPrivateKey 
     * @param {*} toAddress 
     * @param {BigInt} amount 
     * @returns 
     */
    async transferApprove(tokenContractAddress, fromAddress, privateKey, toAddress, transferAmount) {
        let tokenContract = new this.web3.eth.Contract(ERC20_ABI, tokenContractAddress);

        console.log('get nonce ...');
        let nonce = await this.web3.eth.getTransactionCount(fromAddress);

        let gasPrice = '5000000000'

        let methodData = tokenContract.methods.approve(toAddress, transferAmount);
        let estimateGas = await methodData.estimateGas({
            "from": fromAddress,
            "gasPrice": this.web3.utils.toHex(gasPrice)
        });

        var rawTransaction = {
            "from": fromAddress,
            "to": tokenContractAddress,
            "nonce": "0x" + nonce.toString(16),
            "gasLimit": this.web3.utils.toHex(estimateGas),
            "gasPrice": this.web3.utils.toHex(gasPrice),
            "value": "0x0",
            "data": methodData.encodeABI(),
        };


        let signedTx = await this.web3.eth.accounts.signTransaction(rawTransaction, privateKey);

        console.log('sendSignedTransaction ...', signedTx);
        var receipt = await this.web3.eth.sendSignedTransaction(signedTx.raw || signedTx.rawTransaction);
        console.log(`Receipt info:  ${JSON.stringify(receipt, null, '\t')}`);

        // var privateKeyBuffer = new Buffer.from(privateKey, 'hex');

        // var tx = new Tx(rawTransaction, { common: BscManager.common });
        // tx.sign(privateKeyBuffer);
        // var serializedTx = tx.serialize();

        // var receipt = await this.web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'));
        // console.log(`Receipt info:  ${JSON.stringify(receipt, null, '\t')}`);
        return receipt;
    }
}

var bscManager = new BscManager();
export default bscManager;