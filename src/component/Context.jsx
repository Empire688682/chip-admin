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

const [allUsers, setAllUsers] = useState([]);

  const fetchAllUsers = async () => {
    try {
      const response = await fetch(`${apiUrl}/all-users`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          },

        },
      );
      if (!response.ok) {
        console.log("Error:", response);
        return
      }
      const data = await response.json();
      setAllUsers(data)

    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);


  return <AppContext.Provider value={{
    apiUrl,
    userData,
    allUsers
  }}>
    {children}
  </AppContext.Provider>
}

export const useGlobalContext = () =>{
    return useContext(AppContext);
}

