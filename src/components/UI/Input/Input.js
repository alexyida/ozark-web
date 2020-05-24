import React from "react";

import { Alert } from "baseui/icon";
import { FormControl } from "baseui/form-control";
import { Input as BaseInput } from "baseui/input";
import { Select } from "baseui/select";
import { Textarea } from "baseui/textarea";
import { useStyletron } from "baseui";

function Negative() {
  const [css, theme] = useStyletron();
  return (
    <div
      className={css({
        display: "flex",
        alignItems: "center",
        paddingRight: theme.sizing.scale500,
        color: theme.colors.negative400
      })}
    >
      <Alert size="18px" />
    </div>
  );
}

const Input = props => {
  let inputElement = null;

  const invalid = props.touched && props.invalid;

  switch (props.elementType) {
    case "input":
      inputElement = (
        <BaseInput
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
          error={invalid}
          overrides={invalid ? { After: Negative } : {}}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <Textarea
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      inputElement = (
        <Select
          {...props.elementConfig}
          value={props.value}
          options={props.elementConfig.options}
          onChange={props.changed}
          error={invalid}
        />
      );
      break;
    default:
      inputElement = <BaseInput {...props.elementConfig} value={props.value} />;
  }

  return (
    <FormControl error={invalid ? "invalid" : null}>{inputElement}</FormControl>
  );
};

export default Input;
