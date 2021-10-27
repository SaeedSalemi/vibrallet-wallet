import axios from 'axios'
import { Platform } from 'react-native'
import { showMessage } from "react-native-flash-message";

export default class XHR {
  constructor(url, data, notif = false, notif_time = 1, version = "") {
    // this.version = version
    this.data = data || {};
    this.notif = notif;
    this.danger_notif = true;
    this.notif_time = notif_time;
    this.config_data()
    this.base_url = "https://api.vibrallet.com/" + url
    this.time_out = Platform.OS === "android" ? 10000 : 12000
    this.maxRedirects = 2
    this.headers = {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json; charset=UTF8'
    }

    if (axios.defaults.token && !this.data.token) {
      this.data.token = axios.defaults.token
    }
    // this.data.locale = axios.defaults.Locale || "fa"
    // console.log(this.base_url)
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
        onDownloadProgress: prgDownload ? (progressEvent) => {
          let progress = Math.floor((progressEvent.loaded * 100) / progressEvent.total)
          // console.log("downloading .... "  + this.url  + "  " ,progress)
          prgDownload(progress)
        } : null,
        onUploadProgress: prgUpload ? (progressEvent) => {
          let progress = Math.floor((progressEvent.loaded * 100) / progressEvent.total)
          // console.log("uploading .... "  + this.url  + "  " ,progress)
          prgUpload(progress)
        } : null
      }).catch((error) => {
        this.check_status(error)
        if (err) {
          // console.error(error)
          err(error.response)
        }
      }).then((response) => {
        if (response) {
          let responseData = response?.data || { item: {}, items: [] };
          this.log("RESPONSE GET " + this.url + " :::  data response = ", responseData);
          if (this.notif && responseData?.note) {
            showMessage({
              message: 'Error handling!',
              description: null,
              type: 'danger',
              icon: null,
              duration: 1000,
              style: { backgroundColor: "#6BC0B1" },
              position: 'top'
            })
          }
          xhr_response(responseData)
        }
      })
    } catch (e) {
      if (err) { err(error) }
    }

  }


  config_data() {
    let data = this.data
    if (this.url !== "upload") {
      let newData = {};
      if (typeof data === 'object') {
        for (let [key, value] of Object.entries(data)) {
          if (value === null) {
            continue;
          }
          newData[key] = value

        }
      }
      //  else {
      //   newData = this.convertLetters(this.convertNumbers(data));
      //   // newData = newData.toLowerCase()
      //   newData = newData.en()

      // }
      this.data = newData;
    }
  }
}