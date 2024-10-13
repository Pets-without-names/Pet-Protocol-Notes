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
  const [creatorAvatar, setCreatorAvatar] = useState(null);

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
        console.log(error);
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
        creatorAvatar,
        setCreatorAvatar,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
