import { combineReducers } from 'redux'

import appSettings from './modules/appSettings'
import wallets from './modules/wallets'

export const rootReducer = combineReducers({ appSettings, wallets })
