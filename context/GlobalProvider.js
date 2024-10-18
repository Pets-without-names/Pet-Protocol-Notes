import React, { createContext, useContext, useEffect, useState } from 'react';

import { getAccount } from '../appwrite/connections';

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [noteStatusChanged, setStatusChanged] = useState(false);
  const [showEditButtons, setEditButtons] = useState(false);
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    getAccount()
      .then((res) => {
        if (res) {
          setIsLogged(true);
          setUser(res);
        } else {
          setIsLogged(false);
          setUser(null);
        }
      })
      .catch((error) => {
        console.log(`getting account error: ${error}`);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLogged,
        setIsLogged,
        user,
        setUser,
        loading,
        noteStatusChanged,
        setStatusChanged,
        showEditButtons,
        setEditButtons,
        avatar,
        setAvatar,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
