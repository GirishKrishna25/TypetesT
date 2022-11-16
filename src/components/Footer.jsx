import React from "react";
import Select from "react-select";
import { useTheme } from "../context/ThemeContext";
import { themeOptions } from "../styles/theme";

const Footer = () => {
  const { setTheme } = useTheme();
  const changeHandler = (e) => {
    // console.log(e);
    setTheme(e.value);
  };

  return (
    <div className="footer">
      <div className="footer-links">Links</div>
      <div className="theme-options">
        <Select options={themeOptions} onChange={changeHandler} />
      </div>
    </div>
  );
};

export default Footer;
