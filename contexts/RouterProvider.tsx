import React, { ReactNode, createContext, useEffect, useState } from 'react';
import { usePathname } from 'expo-router';

export const RouteContext = createContext({ previousRoute: "" });

const RouteProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const [previousRoute, setPreviousRoute] = useState("");
  const [nextPrevRoute, setNextPrevRoute] = useState("");

  useEffect(() => {
    setPreviousRoute((prev) => {
      if (prev !== pathname) {
        return nextPrevRoute;
      }
      return prev;
    });
    setNextPrevRoute(pathname)
  }, [pathname]);

  return (
    <RouteContext.Provider value={{ previousRoute }}>
      {children}
    </RouteContext.Provider>
  );
};

export default RouteProvider
