import React, { useState } from "react";

import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";

const BurgerBuilder = () => {
  return (
    <Aux>
      <Burger />
      <div>Build Controls</div>
    </Aux>
  );
};

export default BurgerBuilder;
