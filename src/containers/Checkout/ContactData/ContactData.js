import React, { useState } from "react";
import { Button } from "baseui/button";
import Input from "../../../components/UI/Input/Input";
import { Spinner } from "baseui/spinner";

import axios from "../../../axios-orders";

import classes from "./ContactData.module.css";

const ContactData = props => {
  const [loading, setLoading] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);
  const [orderForm, setOrderForm] = useState({
    name: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your Name"
      },
      value: "",
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    street: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Street"
      },
      value: "",
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    zipCode: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "ZIP Code"
      },
      value: "",
      validation: {
        required: true,
        minLength: 5,
        maxLength: 5
      },
      valid: false,
      touched: false
    },
    country: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Country"
      },
      value: "",
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Your E-Mail"
      },
      value: "",
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    deliveryMethod: {
      elementType: "select",
      elementConfig: {
        options: [
          { id: "fastest", label: "Fastest" },
          { id: "cheapest", label: "Cheapest" }
        ]
      },
      value: "",
      validation: {
        requiredSelect: true
      },
      valid: false,
      touched: false
    }
  });

  const orderHandler = event => {
    event.preventDefault();

    setLoading(true);

    const formData = {};
    for (let formElementIdentifer in orderForm) {
      formData[formElementIdentifer] = orderForm[formElementIdentifer].value;
    }
    const order = {
      ingredients: props.ingredients,
      price: props.price,
      orderData: formData
    };
    axios
      .post("/orders.json", order)
      .then(response => {
        setLoading(false);
        // setPurchasing(false);
        props.history.push("/");
      })
      .catch(error => {
        setLoading(false);
        // setPurchasing(false);
      });
  };

  const checkValiditity = (value, rules) => {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.requiredSelect) {
      isValid = value.length !== 0 && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  };

  const inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...orderForm
    };
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier]
    };
    if (orderForm[inputIdentifier].elementType === "select") {
      updatedFormElement.value = event.value;
    } else {
      updatedFormElement.value = event.target.value;
    }

    updatedFormElement.valid = checkValiditity(
      updatedFormElement.value,
      updatedFormElement.validation
    );

    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }

    setOrderForm(updatedOrderForm);
    setFormIsValid(formIsValid);
  };

  const formElementsArray = [];
  for (let key in orderForm) {
    formElementsArray.push({
      id: key,
      config: orderForm[key]
    });
  }
  let form = (
    <form onSubmit={orderHandler}>
      {formElementsArray.map(formElement => (
        <Input
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          invalid={!formElement.config.valid}
          touched={formElement.config.touched}
          changed={event => inputChangedHandler(event, formElement.id)}
        />
      ))}
      <Button disabled={!formIsValid}>ORDER</Button>
    </form>
  );
  if (loading) {
    form = <Spinner />;
  }

  return (
    <div className={classes.ContactData}>
      <h4>Enter your Contact Data</h4>
      {form}
    </div>
  );
};

export default ContactData;
