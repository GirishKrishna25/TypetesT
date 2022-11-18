import React from "react";
import Select from "react-select";
import { useTheme } from "../context/ThemeContext";
import { themeOptions } from "../styles/theme";

const Footer = () => {
  const { theme, setTheme, defaultTheme } = useTheme();
  const changeHandler = (e) => {
    // console.log(e);
    setTheme(e.value);
    localStorage.setItem("theme", JSON.stringify(e.value));
  };

  return (
    <div className="footer">
      <div className="footer-links">Links</div>
      <div className="theme-options">
        <Select
          options={themeOptions}
          onChange={changeHandler}
          menuPlacement="top"
          defaultValue={{ value: defaultTheme, label: defaultTheme.label }}
          // normal css won't work for dependencies
          styles={{
            control: (styles) => ({
              ...styles,
              backgroundColor: theme.background,
            }),
            menu: (styles) => ({
              ...styles,
              backgroundColor: theme.background,
            }),
          }}
        />
      </div>
    </div>
  );
};

export default Footer;
