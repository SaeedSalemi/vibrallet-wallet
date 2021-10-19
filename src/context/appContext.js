import React from 'react'

export const AppContext = React.createContext({ isLoggedIn: false })

export const useAppContext = () => {
	return React.useContext(AppContext)
}
