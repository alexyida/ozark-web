import React from "react";

import burgerLogo from "../../assets/images/burger-logo.png";
import classes from "./Logo.module.css";

const Logo = () => (
  <div className={classes.Logo}>
    <img src={burgerLogo} alt="MyBurger" />
    零食加油站
  </div>
);

export default Logo;
