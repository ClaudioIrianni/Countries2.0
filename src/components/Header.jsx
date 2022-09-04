import React from "react";
import DarkMode from "@mui/icons-material/DarkMode";

const Header = () => {
  return (
    <div className="header">
      <div className="header_container">
      <h2 className="logo">Where in the world?</h2>
      <div className="switch_mode">
      <DarkMode />
      <h3>Dark Mode</h3>
      </div>
      </div>
    </div>
  );
};

export default Header;
