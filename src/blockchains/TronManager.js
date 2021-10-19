const TronWeb = require('tronweb');
// const WalletManager = require('./walletManager');

class TronManager {

    tronWeb(privateKey) {
        let tronWeb = new TronWeb({
            fullHost: 'https://api.shasta.trongrid.io/',
            headers: { "TRON-PRO-API-KEY": '76c79ef2-432d-4649-9b70-2a87f419a87f' },
            privateKey: privateKey
        });
        return tronWeb;
    }

    async balance(address){
        const balance = await tronWeb.trx.getBalance(address);
        return balance;
    }

    /**
     * Token transfer
     * @param {Object} wallet format {publicKet, privateKey}
     * @param {Float} amount 
     * @param {String} toAddress 
     * @returns 
     */
    async transfer(wallet, amount, toAddress) {
        let tronWeb = this.tronWeb(wallet.privateKey);

        // let tronWeb = 
        toAddress = toAddress || "TGTYiEi1Zz9K948WHasjXZXcTN4kN9sL9V";
        
        //TODO: آیا باید تبدیل کنیم
        //TODO: توجه: روی شبکه bsc 1e18
        // amount = amount * 1e6; 

        let fromAddress = tronWeb.address.fromPrivateKey(wallet.privateKey);

        // console.log('--====--> ', fromAddress);
        // const balance = await tronWeb.trx.getUnconfirmedBalance('TVGrD5fokEGwTA1G6MzgbTJumRxqriMFVg');

        // console.log({
        //     balance,
        //     toAddress: toAddress,
        //     fromAddress: fromAddress
        // })

        //Creates an unsigned TRX transfer transaction
        let tradeobj = await tronWeb.transactionBuilder.sendTrx(
            toAddress, 
            amount,
            fromAddress
        );
        const signedtxn = await tronWeb.trx.sign(
            tradeobj,
            wallet.privateKey
        );
        const receipt = await tronWeb.trx.sendRawTransaction(
            signedtxn
        );
        console.log('- Output:', receipt, '\n');

        return receipt;
    }

}


var tronManager = new TronManager();
export default tronManager;