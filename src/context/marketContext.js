import React, { createContext, useState } from 'react'
import useCoins from '../hooks/useCoins'

export const Context = createContext()

const MarketProvider = props => {
  const [state, setState] = useState({
    coins: useCoins()
  })


  const dispatch = value => setState({ ...state, ...value })


  return (
    <Context.Provider value={{ ...state, dispatch }}>
      {props.children}
    </Context.Provider>
  )
}

export default MarketProvider