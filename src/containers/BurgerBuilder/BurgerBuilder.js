import React, { useState, useEffect } from "react";
import { KIND as ButtonKind } from "baseui/button";
import { Modal, ModalBody, ModalFooter, ModalButton } from "baseui/modal";
import { Spinner } from "baseui/spinner";

import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Burger from "../../components/Burger/Burger";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import WithErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";
import axios from "../../axios-orders";

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.4,
  cheese: 1.3,
  meat: 0.7
};

const BurgerBuilder = () => {
  const [ingredients, setIngredients] = useState(null);

  const [totalPrice, setTotalPrice] = useState(4);
  const [purchaseable, setPurchaseable] = useState(false);
  const [purchasing, setPurchasing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get("ingredients.json")
      .then(response => {
        setIngredients(response.data);
      })
      .catch(error => {
        setError(true);
      });
  }, []);

  const updatePurchaseState = igs => {
    const sum = Object.keys(igs)
      .map(igKey => {
        return igs[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    setPurchaseable(sum > 0);
  };

  const addIngredientHandler = type => {
    const oldCount = ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...ingredients
    };
    updatedIngredients[type] = updatedCount;
    setIngredients(updatedIngredients);
    const priceAddition = INGREDIENT_PRICES[type];
    const newPrice = totalPrice + priceAddition;
    setTotalPrice(newPrice);
    updatePurchaseState(updatedIngredients);
  };

  const removeIngredientHandler = type => {
    const oldCount = ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...ingredients
    };
    updatedIngredients[type] = updatedCount;
    setIngredients(updatedIngredients);
    const priceDeduction = INGREDIENT_PRICES[type];
    const newPrice = totalPrice - priceDeduction;
    setTotalPrice(newPrice);
    updatePurchaseState(updatedIngredients);
  };

  const disabledInfo = {
    ...ingredients
  };
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

  const purchaseHandler = () => {
    setPurchasing(true);
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    // alert("You continue!");
    setLoading(true);
    const order = {
      ingredients,
      price: totalPrice,
      customer: {
        name: "Yida Wang",
        address: {
          street: "105 CV",
          zipCode: "L3R 8A6",
          country: "Canada"
        },
        email: "yidaalex.wang@gmail.com"
      },
      deliveryMethod: "fastest"
    };
    axios
      .post("/orders.json", order)
      .then(response => {
        setLoading(false);
        setPurchasing(false);
      })
      .catch(error => {
        setLoading(false);
        setPurchasing(false);
      });
  };

  let burger = error ? <p>Ingredients can't be loaded</p> : <Spinner />;

  if (ingredients) {
    burger = (
      <React.Fragment>
        <Burger ingredients={ingredients} />
        <BuildControls
          ingredientAdded={addIngredientHandler}
          ingredientRemoved={removeIngredientHandler}
          disabled={disabledInfo}
          purchaseable={purchaseable}
          ordered={purchaseHandler}
          price={totalPrice}
        />
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Modal onClose={purchaseCancelHandler} closeable isOpen={purchasing}>
        <ModalBody>
          <OrderSummary
            ingredients={ingredients}
            price={totalPrice.toFixed(2)}
          />
        </ModalBody>
        <ModalFooter>
          <ModalButton
            kind={ButtonKind.tertiary}
            onClick={purchaseCancelHandler}
          >
            CANCEL
          </ModalButton>
          <ModalButton onClick={purchaseContinueHandler} isLoading={loading}>
            CONTINUE
          </ModalButton>
        </ModalFooter>
      </Modal>
      {burger}
    </React.Fragment>
  );
};

export default WithErrorHandler(BurgerBuilder, axios);
