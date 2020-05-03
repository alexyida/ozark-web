import React from "react";

import { Button } from "baseui/button";

import classes from "./BuildControl.module.css";

const BuildControl = props => (
  <div className={classes.BuildControl}>
    <div>{props.label}</div>
    <Button onClick={props.removed} disabled={props.disabled}>
      Less
    </Button>
    <Button onClick={props.added}>More</Button>
  </div>
);

export default BuildControl;
