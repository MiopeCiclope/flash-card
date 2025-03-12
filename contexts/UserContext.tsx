import React, { createContext, useContext, useState } from 'react';
import { UserData } from "@/models/git-user";

type UserContextType = {
  userData: UserData | null;
  setUserData: (userData: UserData | null) => void;
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
};

const UserContext = createContext<UserContextType>({
  userData: null,
  setUserData: () => { },
  accessToken: null,
  setAccessToken: () => { },
});

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  return (
    <UserContext.Provider value={{ userData, setUserData, accessToken, setAccessToken }}>
      {children}
    </UserContext.Provider>
  );
};
