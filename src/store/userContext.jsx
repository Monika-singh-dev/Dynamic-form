import { createContext, useState } from "react";

export const userContext = createContext(null);

const DataProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  return ( 
    <userContext.Provider value={{ users, setUsers }}>
      {children}
    </userContext.Provider>
  );
};

export default DataProvider;
