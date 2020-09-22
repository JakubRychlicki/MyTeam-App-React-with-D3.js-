import React from "react";
import { title } from "../assets";
import "./Layout.css";

const Layout = ({ children }) => (
  <>
    <header>
      <img src={title} alt="MyTeam" />
    </header>
    <main>{children}</main>
  </>
);

export default Layout;
