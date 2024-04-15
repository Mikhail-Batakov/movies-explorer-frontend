import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo-titul.svg";
import "./LogoLink.css";

const LogoLink = () => (
  <Link to="/">
    <img className="logo-titul" src={logo} alt="Логотип сайта" />
  </Link>
);

export default LogoLink;
