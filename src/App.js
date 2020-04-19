import React from "react";

import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Layout from "./components/Layout/Layout";

export default function App() {
  return (
    <div>
      <Layout>
        <BurgerBuilder />
      </Layout>
    </div>
  );
}
