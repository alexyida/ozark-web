import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

const Checkout = props => {
  const [ingredients, setIngredients] = useState({
    salad: 1,
    meat: 1,
    cheese: 1,
    bacon: 1
  });
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const query = new URLSearchParams(props.location.search);
    const ingredients = {};
    for (let param of query.entries()) {
      if (param[0] === "price") {
        setPrice(+param[1]);
        continue;
      }
      ingredients[param[0]] = +param[1];
    }
    setIngredients(ingredients);
  }, []);

  const checkoutCancelledHandler = () => {
    props.history.goBack();
  };

  const checkoutContinuedHandler = () => {
    props.history.replace("/checkout/contact-data");
  };

  return (
    <div>
      <CheckoutSummary
        ingredients={ingredients}
        checkoutCancelled={checkoutCancelledHandler}
        checkoutContinued={checkoutContinuedHandler}
      />
      <Route
        path={props.match.path + "/contact-data"}
        render={props => (
          <ContactData ingredients={ingredients} price={price} {...props} />
        )}
      />
    </div>
  );
};

export default Checkout;
