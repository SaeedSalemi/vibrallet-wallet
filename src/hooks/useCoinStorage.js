
import AsyncStorage from '@react-native-async-storage/async-storage'

const useCoinStorage = (coinKey) => {
  if (coinKey === "")
    return {}
  AsyncStorage.getItem(coinKey).then(result => {
    if (result !== null)
      return JSON.parse(result)
    else return {}
  }).catch(error => console.error('useCoinStorage: could not reterive info', error))

}

export default useCoinStorage