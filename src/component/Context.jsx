import React from 'react'
import { useContext } from 'react';

const AppContext = React.createContext();

export const AppProvider = ({children}) => {
  const apiUrl = "http://localhost:1999/api"
  return <AppContext.Provider value={{
    apiUrl
  }}>
    {children}
  </AppContext.Provider>
}

export const useGlobalContext = () =>{
    return useContext(AppContext);
}

