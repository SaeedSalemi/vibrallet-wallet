import React, { createContext, useState, useEffect } from 'react'
import useCoins from '../hooks/useCoins'
import useFCASRating from '../hooks/useFCASRating'
// import { } from './'

export const Context = createContext()

const MainProvider = props => {
  const [state, setState] = useState({
    user: {},
    wallet: {}
  })
  const [render, setRender] = useState(false)


  const { coins, setCoin } = useCoins()
  const { list: FCASList } = useFCASRating()

  const dispatch = value => setState({ ...state, ...value })





  useEffect(() => {

  }, [])





  return (
    <Context.Provider value={{ ...state, coins, FCASList, setCoin, dispatch }}>
      {props.children}
    </Context.Provider>
  )
}

export default MainProvider