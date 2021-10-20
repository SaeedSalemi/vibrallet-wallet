/**
 * 
 * 
 * 
 * https://medium.com/pixelpoint/track-blockchain-transactions-like-a-boss-with-web3-js-c149045ca9bf
 */


// const Tx = require('ethereumjs-tx').Transaction
//  var ethUtils = require('ethereumjs-util');
//  var Common = require('ethereumjs-common').default;
var Web3 = require('web3');
// const crypto = require('../../../const/crypto')

// let networkUrl = `https://mainnet.infura.io/v3/58b50bb378ad450996a9e32ce2985ab3`; //BSC MAINNET
let networkUrl = `https://ropsten.infura.io/v3/58b50bb378ad450996a9e32ce2985ab3`;  //BSC TESTBET
const ERC20_ABI = require('./ABIs/ERC20.json');


// const bscScanAPIKEY = "S1KWGAPDWKNX47X6WMC59FVWBAM9E6EKQM";

// const common = Common.forCustomChain('mainnet', {
//     name: 'bnb',
//     networkId: 56,
//     chainId: 56
// }, 'petersburg');

class EthManager {
    constructor() {
        // const wssProvider = new Web3.providers.WebsocketProvider(blockChainWebSocketUrl);
        // this.web3 = new Web3(wssProvider);
        this.web3 = new Web3(networkUrl);
        this.tokenContract = new this.web3.eth.Contract(ERC20_ABI, tokenContractAddress);

        // this.common = common;
    }

    /**
     * get latest block number
     * @returns {int}
     */
    async getLastBlockNumber() {
        return await this.web3.eth.getBlockNumber();
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

    /**
     * انتقال توکن 
     * @param {*} fromAddressPublicKey 
     * @param {*} fromAddressPrivateKey 
     * @param {*} toAddress 
     * @param {BigInt} amount 
     * @returns 
     */
    async transferCoin(fromAddress, privateKey, toAddress, amount) {

        let nonce = await this.web3.eth.getTransactionCount(fromAddress);
        // let tokenContract = new this.web3.eth.Contract(crypto.StandardBep20TokenABI, 'BNB');

        // let amountBigInt = BigInt(Math.trunc(amount * 1e18));
        // var transferAmount = amount.toString();

        let gasPrice = '5000000000';

        console.log('estimateGas ...');
        // let estimateGas = '200000';
        let estimateGas =  await this.web3.eth.estimateGas({
            "from"      : fromAddress,       
            "nonce"     : this.web3.utils.toHex(nonce), 
            "gasPrice": this.web3.utils.toHex(gasPrice),
            "to"        : toAddress,     
       });

        var rawTransaction = {
            "from": fromAddress,
            "to": toAddress,
            "nonce": this.web3.utils.toHex(nonce),
            "gasLimit": this.web3.utils.toHex(estimateGas),
            "gasPrice": this.web3.utils.toHex(gasPrice),
            "value": this.web3.utils.toHex(amount),
        };

        var receipt = null;
        try {
            let signedTx = await this.web3.eth.accounts.signTransaction(rawTransaction, privateKey);

            console.log('sendSignedTransaction ...', signedTx);
            
            receipt = await this.web3.eth.sendSignedTransaction(signedTx.raw || signedTx.rawTransaction);

            console.log(`Receipt info:  ${JSON.stringify(receipt, null, '\t')}`);
        } catch (ex) {
            console.log(' APP EXCEPTION: during send transaction', ex);
        }
        return receipt;
    }


    /**
     * انتقال توکن 
     * @param {*} fromAddressPublicKey 
     * @param {*} fromAddressPrivateKey 
     * @param {*} toAddress 
     * @param {BigInt} amount 
     * @returns 
     */
    async transfer(tokenContractAddress, publicKey, privateKey, toAddress, amount) {
        if (!tokenContractAddress || tokenContractAddress == null || tokenContractAddress.toLowerCase() == 'bnb') {
            return this.transferCoin(publicKey, privateKey, toAddress, amount)
        }

        let nonce = await this.web3.eth.getTransactionCount(publicKey);


        // let amountBigInt = BigInt(Math.trunc(amount * 1e18));
        var transferAmount = amount.toString();

        let gasPrice = '5000000000'
        let methodData = tokenContract.methods.transfer(toAddress, transferAmount);

        let estimateGas = await methodData.estimateGas({
            "from": fromAddress,
            "gasPrice": this.web3.utils.toHex(gasPrice)
        });

        var rawTransaction = {
            "from": publicKey,
            "to": tokenContractAddress,
            "nonce": this.web3.utils.toHex(nonce),
            "gasLimit": this.web3.utils.toHex(estimateGas),
            "gasPrice": this.web3.utils.toHex(gasPrice),
            "value": "0x0",
            "data": methodData.encodeABI(),
            // "chainId": 56
        };

        let signedTx = await this.web3.eth.accounts.signTransaction(rawTransaction, privateKey);

        console.log('sendSignedTransaction ...', signedTx);
        var receipt = await this.web3.eth.sendSignedTransaction(signedTx.raw || signedTx.rawTransaction);
        console.log(`Receipt info:  ${JSON.stringify(receipt, null, '\t')}`);

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
        return receipt;
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

        console.log('get nonce ...');
        let nonce = await this.web3.eth.getTransactionCount(fromAddress);

        let gasPrice = '5000000000'

        let methodData = this.tokenContract.methods.approve(toAddress, transferAmount);
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

var ethManager = new EthManager();
export default ethManager;