// var bip39 = require('bip39');
// var hdkey = require('hdkey');
// var createHash = require('create-hash');
// var btcLib = require('bitcoinjs-lib');
// var bs58check = require('bs58check');
const bitcore = require('bitcore-lib')
const axios = require('axios')

// const bitcoinfees = require('bitcoinfees-21co');
const feeutil = require('bitcoin-util-fee')

class BitcoinManager {
	// async generateAddress() {
	//     //const mnemonic = bip39.generateMnemonic(); //generates string
	//     const mnemonic = "source purpose antenna demise desert outdoor panel blush actor master transfer initial";
	//     const seed = await bip39.mnemonicToSeed(mnemonic); //creates seed buffer
	//     // console.log('Seed: ' + seed);
	//     // console.log('mnemonic: ' + mnemonic);

	//     const root = hdkey.fromMasterSeed(seed);
	//     const masterPrivateKey = root.privateKey.toString('hex');
	//     console.log('masterPrivateKey: ' + masterPrivateKey);

	//     // const addrnode = root.derive("m/44'/1'/0'/0/0");
	//     const addrnode = root.derive("m/84'/1'/0'/0/1");
	//     console.log('addrnodePublicKey: ' + addrnode._publicKey, addrnode.privateKey)

	//     const step1 = addrnode._publicKey;
	//     const step2 = crypto.createHash('sha256').update(step1).digest();
	//     const step3 = crypto.createHash('rmd160').update(step2).digest();

	//     var step4 = Buffer.allocUnsafe(21);
	//     step4.writeUInt8(0x6f, 0);
	//     step3.copy(step4, 1); //step4 now holds the extended RIPMD-160 result
	//     const step9 = bs58check.encode(step4);
	//     console.log('Base58Check: ' + step9);

	//     /*
	//         Mainnet
	//         pubKeyHash: 0x00,
	//         Testnet
	//         pubKeyHash: 0x6f,
	//     */

	//     return {
	//         masterPrivateKey: masterPrivateKey,
	//         WIF: bitcore.PrivateKey(addrnode.privateKey.toString("hex"), bitcore.Networks.testnet).toWIF(),
	//         publicKey: addrnode.publicKey.toString("hex"),
	//         privateKey: addrnode.privateKey.toString("hex"),

	//         privateExtendedKey: addrnode.privateExtendedKey,
	//         publicExtendedKey: addrnode.publicExtendedKey,

	//         address: step9,
	//         // base58: step9
	//     }
	// }

	async balance(address) {
		let balance = 0

		try {
			const sochain_network = 'BTCTEST'
			let minCofirm = 32 //MINIMUM CONFIRMATIONS

			// https://chain.so/api/#get-balance
			const result = await axios.get(
				`https://sochain.com/api/v2/get_address_balance/${sochain_network}/${address}/${minCofirm}`
			)

			balance = result.data.confirmed_balance
			// let balance = result.data.unconfirmed_balance
		} catch (ex) {
			console.log(ex)
		}
		return balance
	}

	/**
	 * Bitcoin transfer
	 * @param {Object} wallet format {publicKet, privateKey}
	 * @param {Float} amount
	 * @param {String} toAddress
	 * @returns
	 */
	async transfer(wallet, amount, toAddress) {
		// let generatedAddress = await this.generateAddress();
		// console.log(generatedAddress);

		const sochain_network = 'BTCTEST'

		// const privateKey = bitcore.PrivateKey(generatedAddress.privateKey).toAddress(bitcore.Networks.testnet)
		// const privateKey = generatedAddress.privateKey; //"6900448534c1eff7830ec111e3dd5ad0acdf17cc637ba53b2d211b51f402e6d0";
		const sourceAddress = wallet.address // "moFC6NafSLjxSQehKgxNfj8hL2A9bhVKYT";

		var privateKey = new bitcore.PrivateKey(
			wallet.privateKey,
			bitcore.Networks.testnet
		)
		// var address111 = privateKey.toAddress(bitcore.Networks.testnet)
		// console.log(address111.toString());
		// console.log(privateKey111);
		// console.log("=======================");

		const satoshiToSend = amount * 1e8
		let fee = 0
		let inputCount = 0
		let outputCount = 2
		const utxos = await axios.get(
			`https://sochain.com/api/v2/get_tx_unspent/${sochain_network}/${sourceAddress}`
		)
		const transaction = new bitcore.Transaction()
		let totalAmountAvailable = 0

		let inputs = []
		utxos.data.data.txs.forEach(async element => {
			let utxo = {}
			utxo.satoshis = Math.floor(Number(element.value) * 1e8)
			utxo.script = element.script_hex
			utxo.address = utxos.data.data.address
			utxo.txId = element.txid
			utxo.outputIndex = element.output_no
			totalAmountAvailable += utxo.satoshis
			inputCount += 1
			inputs.push(utxo)
		})

		let transactionSize = inputCount * 180 + outputCount * 34 + 10 - inputCount
		// Check if we have enough funds to cover the transaction and the fees assuming we want to pay 20 satoshis per byte

		fee = transactionSize * 20
		if (totalAmountAvailable - satoshiToSend - fee < 0) {
			throw new Error('Balance is too low for this transaction')
		}

		//Set transaction input
		transaction.from(inputs)

		// set the recieving address and the amount to send
		transaction.to(toAddress, satoshiToSend)

		// Set change address - Address to receive the left over funds after transfer
		transaction.change(sourceAddress)

		const satoshi = feeutil.p2pkh_tx_calc_fee(inputCount, outputCount)

		//manually set transaction fees: 20 satoshis per byte
		// transaction.fee(fee * 20);
		transaction.fee(satoshi)

		// Sign transaction with your private key
		transaction.sign(privateKey)

		// serialize Transactions
		const serializedTransaction = transaction.serialize()
		// Send transaction
		const result = await axios({
			method: 'POST',
			url: `https://sochain.com/api/v2/send_tx/${sochain_network}`,
			data: {
				tx_hex: serializedTransaction,
			},
		})
		return result.data.data
	}
}

var bitcoinManager = new BitcoinManager()
export default bitcoinManager

// sendBitcoin("mtVE8anM63kQcgKUC6oQQD9K6xiV4wsr7q", 0.000014).then(p=>console.log(p));

// generateAddress().then(p => console.log(" Result: ", p));
