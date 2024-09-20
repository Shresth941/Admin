import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const Storecontext = createContext(null);

const StorecontextProvider = (props) => {
  const [token, setToken] = useState("");
  const url = "http://localhost:4000";

  const loadToken = async () => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  };

  useEffect(() => {
    loadToken();
  }, []);

  const contextValue = {
    url,
    token,
    setToken,
  };

  return (
    <Storecontext.Provider value={contextValue}>
      {props.children}
    </Storecontext.Provider>
  );
};

export default StorecontextProvider;
