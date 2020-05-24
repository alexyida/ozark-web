import React from "react";
import { Button } from "baseui/button";

import Burger from "../../Burger/Burger";

import classes from "./CheckoutSummary.module.css";

const CheckoutSummary = props => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it tastes well!</h1>
      <div style={{ width: "100%", margin: "auto" }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button onClick={props.checkoutCancelled}>CANCEL</Button>
      <Button onClick={props.checkoutContinued}>CONTINUE</Button>
    </div>
  );
};

export default CheckoutSummary;
