import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const Context = createContext();

function ContextProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    "isDarkMode",
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
  const [token, setToken] = useLocalStorageState("ACCESS_TOKEN", null);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.className = "dark-mode";
    } else {
      document.documentElement.className = "light-mode";
    }
  }, [isDarkMode]);

  return (
    <Context.Provider
      value={{
        isDarkMode,
        setIsDarkMode,
        token,
        setToken,
      }}
    >
      {children}
    </Context.Provider>
  );
}

function useContextProvider() {
  const context = useContext(Context);
  if (!context) throw new Error("Context was called in the wrong place");
  return context;
}

export { ContextProvider, useContextProvider };
