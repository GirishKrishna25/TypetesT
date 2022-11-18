import { createContext, useContext, useState } from "react";
import { themeOptions } from "../styles/theme";

const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
  // if there is any theme present in our local storage we get that as default otherwise default will be the mentioned one.
  const defaultTheme =
    JSON.parse(localStorage.getItem("theme")) || themeOptions[0].value;
  const [theme, setTheme] = useState(defaultTheme);

  const values = {
    theme,
    setTheme,
    defaultTheme,
  };
  return (
    <ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
