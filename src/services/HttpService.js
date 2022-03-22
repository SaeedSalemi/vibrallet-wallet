import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { Platform } from 'react-native'
import { showMessage } from 'react-native-flash-message'

export default class HttpService {
	constructor(url, data, notif = false, notif_time = 1, version = '') {
		// let token = ""

		this.data = data || {}
		this.notif = notif
		this.danger_notif = true
		this.notif_time = notif_time
		this.base_url = 'https://appapi.vibrallet.com/' + url
		this.time_out = Platform.OS === 'android' ? 10000 : 12000
		this.maxRedirects = 1
		this.headers = {
			'X-Requested-With': 'XMLHttpRequest',
			'Content-Type': 'application/json',
			token: axios.defaults.token || '',
		}
	}

	Get(xhr_response, err = null, prgDownload, prgUpload = null) {
		try {
			axios({
				method: 'get',
				params: this.data,
				url: this.base_url,
				responseType: 'json',
				timeout: this.time_out,
				headers: this.headers,
				maxRedirects: this.maxRedirects,
				onDownloadProgress: prgDownload
					? progressEvent => {
							let progress = Math.floor(
								(progressEvent.loaded * 100) / progressEvent.total
							)
							// console.log("downloading .... "  + this.url  + "  " ,progress)
							prgDownload(progress)
					  }
					: null,
				onUploadProgress: prgUpload
					? progressEvent => {
							let progress = Math.floor(
								(progressEvent.loaded * 100) / progressEvent.total
							)
							// console.log("uploading .... "  + this.url  + "  " ,progress)
							prgUpload(progress)
					  }
					: null,
			})
				.catch(error => {
					// this.check_status(error)
					if (err) {
						// console.error(error)
						err(error.response)
					}
				})
				.then(response => {
					if (response) {
						let responseData = response?.data || { item: {}, items: [] }
						this.log(
							'RESPONSE GET ' + this.url + ' :::  data response = ',
							responseData
						)
						if (this.notif && responseData?.note) {
							showMessage({
								message: 'Error handling!',
								description: null,
								type: 'danger',
								icon: null,
								duration: 1000,
								style: { backgroundColor: '#6BC0B1' },
								position: 'top',
							})
						}
						xhr_response(responseData)
					}
				})
		} catch (e) {
			if (err) {
				err(error)
			}
		}
	}

	Post(xhr_response, err = null, prgDownload = null, prgUpload = null) {
		try {
			this.log('POST ::: ' + this.base_url, this.data)
			axios({
				method: 'post',
				data: this.data,
				url: this.base_url,
				responseType: 'json',
				timeout: this.time_out,
				headers: this.headers,
				maxRedirects: this.maxRedirects,
				onDownloadProgress: prgDownload
					? progressEvent => {
							let progress = Math.floor(
								(progressEvent.loaded * 100) / progressEvent.total
							)
							// console.log("downloading .... "  + this.url  + "  " ,progress)
							prgDownload(progress)
					  }
					: null,
				onUploadProgress: prgUpload
					? progressEvent => {
							let progress = Math.floor(
								(progressEvent.loaded * 100) / progressEvent.total
							)
							// console.log("uploading .... "  + this.url  + "  " ,progress)
					  }
					: null,
			})
				.catch(error => {
					// this.check_status(error)
					if (err) {
						// console.error(error)
						console.log('POST ERROR', error)
						err(error.response)
					}
				})
				.then(async response => {
					let responseData = response?.data || { item: {}, items: [] }
					this.log(
						'RESPONSE POST ' + this.url + ' :::  data response = ',
						responseData
					)
					if (this.notif && responseData.note) {
						// console.log(responseData.note)
						// func.notif({ title: responseData.note, status: "success" })
					}
					xhr_response(responseData)
				})
		} catch (e) {
			console.log('XHR POST ERROR', e)
			if (this.url !== 'mobile_log') {
				// func.exeption("err getting"+this.url+" = " + e);
				// console.error(e)
			} else {
				// console.error("error mobile log "  , e)
			}
			return null
		}
	}

	config_data() {
		let data = this.data
		if (this.url !== 'upload') {
			let newData = {}
			if (typeof data === 'object') {
				for (let [key, value] of Object.entries(data)) {
					if (value === null) {
						continue
					}
					newData[key] = value
				}
			}
			//  else {
			//   newData = this.convertLetters(this.convertNumbers(data));
			//   // newData = newData.toLowerCase()
			//   newData = newData.en()

			// }
			this.data = newData
		}
	}

	log(text, value = '') {
		// console.group("request" , this.url)
		// console.log(this.base_url , this.data)
		// console.log(text , value)
		// console.groupEnd()
	}
}
