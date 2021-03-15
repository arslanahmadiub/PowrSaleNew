import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import UnifiedContextProvider from "./contexts/unifiedContext";
import { BrowserRouter } from "react-router-dom";
import store from "./store";
import { Provider } from "react-redux";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <UnifiedContextProvider>
        <App />
      </UnifiedContextProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
