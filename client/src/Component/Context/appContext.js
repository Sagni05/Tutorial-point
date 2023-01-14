import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AppContext = createContext(null);

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error("Appcontext must be within appContextProvider");
  }

  return context;
};

const AppContexProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8080/api/v1/users").then((res) => {
      console.log(res.data);
      setData(res.data.data);
    });
  }, []);

  // search functionalty
  let searchData = data.filter((user) =>
    user.postTitle.toLowerCase().includes(query)
  );

  return (
    <AppContext.Provider
      value={{
        searchData,
        data,
        setQuery,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContexProvider;
