import React, { createContext, useState } from 'react'
import useCoins from '../hooks/useCoins'
import useFCASRating from '../hooks/useFCASRating'
import useMarketListing from '../hooks/useMarketListing'
import { QueryClient, QueryClientProvider } from "react-query";

export const Context = createContext()

const QueryConfigs = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
})


const MainProvider = props => {

  const [state, setState] = useState({
    user: {},
    wallet: {}
  })
  const [render, setRender] = useState(false)
  const { coins, setCoin } = useCoins()
  const { FCASList } = useFCASRating()
  const { MarketListing } = useMarketListing()


  const dispatch = value => setState({ ...state, ...value })

  return (
    <QueryClientProvider client={QueryConfigs}>
      <Context.Provider value={{ ...state, coins, FCASList, MarketListing, setCoin, dispatch }}>
        {props.children}
      </Context.Provider>
    </QueryClientProvider>
  )
}

export default MainProvider