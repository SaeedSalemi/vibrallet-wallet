import { createStore, applyMiddleware } from 'redux'
import { rootReducer } from './reducer'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './saga'
import { createLogger } from 'redux-logger'

const sagaMiddleware = createSagaMiddleware()

const persistConfig = {
	key: 'root',
	storage: AsyncStorage,
	whitelist: ['appSettings'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {
	const logger = createLogger()
	let store = createStore(persistedReducer, applyMiddleware(sagaMiddleware))
	sagaMiddleware.run(rootSaga)

	let persistor = persistStore(store)
	return { store, persistor }
}
