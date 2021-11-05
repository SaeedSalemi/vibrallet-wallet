import React, { createContext, useState } from 'react'
import useCoins from '../hooks/useCoins'

export const Context = createContext()

const MainProvider = props => {
  const [state, setState] = useState({
  })


  const coins = useCoins()

  const dispatch = value => setState({ ...state, ...value })


  return (
    <Context.Provider value={{ ...state, coins, dispatch }}>
      {props.children}
    </Context.Provider>
  )
}

export default MainProvider