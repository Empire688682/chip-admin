import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

const AppContext = React.createContext();

export const AppProvider = ({children}) => {

  
  const apiUrl = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();

  const [userData, setUserData] = useState({});

  
  useEffect(() => {
  const storedUser = JSON.parse(localStorage.getItem("userData"));
  const now = new Date().getTime();

  if (!storedUser) {
    navigate("/signup");
    return;
  }

  // If expired, clear it and redirect
  if (storedUser.timestamp < now) {
    localStorage.removeItem("userData");
    navigate("/signup");
    return;
  }
  setUserData(storedUser);
}, []);


  return <AppContext.Provider value={{
    apiUrl,
    userData
  }}>
    {children}
  </AppContext.Provider>
}

export const useGlobalContext = () =>{
    return useContext(AppContext);
}

