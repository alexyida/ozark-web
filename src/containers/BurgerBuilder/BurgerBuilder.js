import React, { useState } from "react";
import { connect } from "react-redux";

import { KIND as ButtonKind } from "baseui/button";
import { Modal, ModalBody, ModalFooter, ModalButton } from "baseui/modal";
import { Spinner } from "baseui/spinner";

import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Burger from "../../components/Burger/Burger";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-orders";
import * as actionTypes from "../../store/actions";

const BurgerBuilder = props => {
  const [purchasing, setPurchasing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const updatePurchaseState = igs => {
    const sum = Object.keys(igs)
      .map(igKey => {
        return igs[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  };

  const disabledInfo = {
    ...props.ings
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
    // const queryParams = [];
    // for (let i in props.ings) {
    //   queryParams.push(encodeURI(i) + "=" + encodeURIComponent(props.ings[i]));
    // }
    // queryParams.push("price=" + totalPrice);
    // const queryString = queryParams.join("&");
    props.history.push("/checkout");
  };

  let burger = error ? <p>Ingredients can't be loaded</p> : <Spinner />;

  if (props.ings) {
    burger = (
      <React.Fragment>
        <Burger ingredients={props.ings} />
        <BuildControls
          ingredientAdded={props.onIngredientAdded}
          ingredientRemoved={props.onIngredientRemoved}
          disabled={disabledInfo}
          purchaseable={updatePurchaseState(props.ings)}
          ordered={purchaseHandler}
          price={props.price}
        />
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Modal onClose={purchaseCancelHandler} closeable isOpen={purchasing}>
        <ModalBody>
          <OrderSummary
            ingredients={props.ings}
            price={props.price.toFixed(2)}
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

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingName =>
      dispatch({
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ingName
      }),
    onIngredientRemoved: ingName =>
      dispatch({
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingName
      })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
