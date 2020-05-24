import React from "react";
import ReactDOM from "react-dom";
import { BaseProvider, LightTheme } from "baseui";
import { BrowserRouter } from "react-router-dom";
import { Provider as StyletronProvider } from "styletron-react";
import { Client as Styletron } from "styletron-engine-atomic";

import App from "./App";

import "./index.css";

const engine = new Styletron();

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </BaseProvider>
    </StyletronProvider>
  </React.StrictMode>,
  rootElement
);
